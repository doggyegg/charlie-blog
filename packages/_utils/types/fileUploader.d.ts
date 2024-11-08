export interface IFileOptions {
	file: File; // 文件流
	smallRequestUrl: string; // 小文件上传地址
	chunksize?: number; // 每片大小
	fileLimit?: number; // NG文件大小限制，用于区分是否走分片
	bigRequestUrl?: string; // 大文件分片上传地址
	mergeFileUrl?: string; // 合并文件碎片地址
	fileParamName?: string; // 发送给后端的file的字段名
}

export interface IChunkItem {
	chunkName: string; // 分片文件名
	chunksize: number; // 分片大小
	sort: number; // 分片序号
	status: boolean;
	file: Blob;
	chunkHash?: string;
}
