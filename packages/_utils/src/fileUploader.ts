// 文件上传,包含大文件分片上传 todo:秒传，断点续传
import { IFileOptions, IChunkItem } from '../types/fileUploader';
// @ts-ignore
import sparkMD5 from '../lib/spark-md5.js';

export default class FileUploader {
	chunksize: number;
	fileLimit: number;
	smallRequestUrl: string;
	bigRequestUrl?: string;
	mergeFileUrl?: string;
	fileParamName: string;
	requestCount: number;

	constructor(options: IFileOptions) {
		const { fileLimit, chunksize, smallRequestUrl, bigRequestUrl, mergeFileUrl, fileParamName } =
			options;

		this.chunksize = chunksize || 10 * 1024 * 1024;
		this.fileLimit = fileLimit || 10 * 1024 * 1024;
		this.smallRequestUrl = smallRequestUrl;
		this.bigRequestUrl = bigRequestUrl;
		this.mergeFileUrl = mergeFileUrl;
		this.fileParamName = fileParamName || 'file';
		this.requestCount = 0;
	}
	// 上传文件
	uploadFile(file: File): Promise<unknown> {
		const { size } = file;
		// 小于标准，不需要分片，直接传
		if (size <= this.fileLimit) {
			return this.uploadSmallFile(file);
		}
		return this.uploadBigFile(file);
	}
	// 上传小文件
	async uploadSmallFile(file: File): Promise<unknown> {
		const formData = new FormData();
		formData.append(this.fileParamName, file);

		try {
			return await fetch(this.smallRequestUrl, { method: 'POST', body: formData });
		} catch (error) {
			console.error(error);
		}
	}
	// 大文件上传
	async uploadBigFile(file: File) {
		if (!this.bigRequestUrl || !this.mergeFileUrl) return '请提供大文件上传相关参数';

		const { name, size } = file;
		const chunkList = await this.handleFileSlice(file);
		// 分片上传
		const fileItem = {
			fileName: name,
			fileType: name.substring(name.lastIndexOf('.') + 1),
			totalSize: size,
			chunkList,
			chunkNum: Math.ceil(size / this.chunksize),
			fileHash: (chunkList as Array<IChunkItem>)[0].chunkHash,
			url: null
		};
		// 开始分片上传
		await this.handleSliceUpload(fileItem);

		return Promise.resolve(fileItem);
	}
	// 文件切片
	handleFileSlice(file: File) {
		return new Promise(resolve => {
			const { size } = file;
			// 初始化文件阅读器
			const fileReader = new FileReader();
			// 初始化spark-MD5
			const spark = new sparkMD5.ArrayBuffer();
			// 装切片文件的容器
			const chunkList: Array<IChunkItem> = [];
			// 一共几片
			const chunkNum = Math.ceil(size / this.chunksize);
			// 当前切到第几片
			let curChunk = 0;
			// 切片递归函数
			const sliceFile = () => {
				const chunkFile = file.slice(curChunk * this.chunksize, (curChunk + 1) * this.chunksize);
				fileReader.readAsArrayBuffer(chunkFile);
				chunkList.push({
					chunkName: `${file.name}-${curChunk + 1}`, // 分片文件名
					chunksize: chunkFile.size, // 分片大小
					sort: curChunk + 1, // 分片序号
					status: false,
					file: chunkFile
				});
				curChunk++;
			};
			// fileReader.readAsArrayBuffer触发的回调
			fileReader.onload = e => {
				// 加入到spark的计算源数据上
				spark.append(e.target?.result);
				// 判断是否需要继续切
				if (curChunk === chunkNum) {
					// 切完了
					const hash = spark.end();

					chunkList.forEach(chunk => {
						chunk.chunkHash = hash;
					});

					resolve(chunkList);
				} else {
					// 继续切
					sliceFile();
				}
			};
			// 开始切
			sliceFile();
		});
	}
	// 分片文件上传
	async handleSliceUpload(fileItem: any) {
		const { chunkList } = fileItem;
		//开始传分片
		for (let i = 0; i < chunkList.length; i++) {
			const chunkItem = chunkList[i];
			const { chunkHash, file, sort } = chunkItem!;

			//控制并发
			if (this.requestCount >= 5) return;

			const formData = new FormData();
			formData.append('file', file);
			formData.append('fileHash', chunkHash);
			formData.append('sort', sort);
			//并发数+1
			this.requestCount++;
			return fetch(this.bigRequestUrl || this.smallRequestUrl, { method: 'POST', body: formData })
				.then(res => {
					res.json();
				})
				.then(res => {
					if (res as any) {
						chunkItem.status = true;
						return this.judgeMerge(chunkList, chunkHash);
					}
				})
				.catch(error => {
					console.error(error);
				})
				.finally(() => {
					this.requestCount--;
					if (chunkList.some((item: { status: boolean }) => !item.status)) {
						//响应回来如果还没传完，就继续传
						this.handleSliceUpload(fileItem);
					}
				});
		}
	}
	judgeMerge(chunkList: Array<IChunkItem>, chunkHash: string) {
		if (chunkList.every(item => item.status)) {
			return fetch(`${this.mergeFileUrl || this.smallRequestUrl}?fileHash=${chunkHash}`)
				.then(res => {
					return res.json();
				})
				.then(res => {
					return res.data;
				});
		}
	}
}
