// Uniapp自动化分Node-Modules依赖到子包中的预编译脚本
// 解决uniapp编译Bug - Issue-link:https://github.com/dcloudio/uni-app/issues/5218

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 根目录
const rootDir = path.resolve(__dirname);
// 需要处理的子包文件夹集合
const targetFolders = ['approval', 'center', 'product', 'repayment', 'task'];
// 可以拷出的资源包集合
const sourceFolders = ['mp-b', 'mp-c'];
// 在路径解析的时候，用来储存子包引用node-modules中的包关系map
const relateMap = new Map();
// 创建一个复制node-modules到子包的函数，这里用闭包，保证后面异步调用的时候，函数只执行1次
const copyNodeModules = createCopyNodeModules();

// 执行查找和替换任务
processTargetFolders();
// 处理文件入口
function processTargetFolders() {
	targetFolders.forEach(folderName => {
		const folderPath = path.join(rootDir, folderName, 'pages');
		fs.stat(folderPath, (err, stats) => {
			if (err || !stats.isDirectory()) {
				console.error(`找不到目录：${folderPath}`);
				return;
			}

			// 在目标文件夹中递归查找文件
			findFiles(folderPath, processFile, folderName);
		});
	});
}

// 递归查找文件夹中的文件
function findFiles(dir, callback, folderName) {
	fs.readdir(dir, (err, files) => {
		if (err) {
			console.error(`无法读取文件夹：${dir}`, err);
			return;
		}
		files.forEach(file => {
			const filePath = path.join(dir, file);
			fs.stat(filePath, (err, stats) => {
				if (err) {
					console.error(`无法获取文件信息：${filePath}`, err);
					return;
				}
				if (stats.isDirectory()) {
					findFiles(filePath, callback, folderName); // 递归查找子目录
				} else if (stats.isFile()) {
					callback(filePath, folderName); // 找到文件，执行回调
				}
			});
		});
	});
}

// 处理文件内容，生成子包对应node-modules中的依赖关系，加上编译参数，并且生成相对路径
function processFile(filePath, folderName) {
	// 读取文件内容
	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			console.error('读取文件失败:', err);
			return;
		}

		// 使用readline逐行读取和处理文件
		const rl = readline.createInterface({
			input: fs.createReadStream(filePath),
			output: process.stdout,
			terminal: false
		});
		// 处理完后最终写回文件的每一行
		const outputLines = [];
		rl.on('line', line => {
			// 查找是否包含sourceFolders中的文件夹
			if (sourceFolders.some(srcFolderName => line.includes(srcFolderName))) {
				// 解析到有mp_b或者mp_c等关键词时，收集相关路径依赖到map中
				// 如 {center:['center','task']}，后续复制依赖时用
				sourceFolders.forEach(sourceFolderName => {
					const subpackFolderName = line.split(`${sourceFolderName}/`)[1]?.split('/')[0];
					if (!subpackFolderName) return;
					const subRelatives = relateMap.get(folderName);
					if (subRelatives) {
						subRelatives.add(subpackFolderName);
					} else {
						relateMap.set(folderName, new Set([subpackFolderName]));
					}
				});

				// 判断文件中是否包含BUILDCOMPILE，如果有表示已经处理过，不再处理了
				if (data.includes('BUILDCOMPILE')) {
					outputLines.push(line);
					return;
				}
				// 插入//#ifdef DEVCOMPILE 和当前行
				outputLines.push('//#ifdef DEVCOMPILE');
				outputLines.push(line);
				outputLines.push('//#endif');
				// 插入//#ifdef BUILDCOMPILE
				outputLines.push('//#ifdef BUILDCOMPILE');
				// 获取当前文件的相对路径，并且替换后插入
				const relativePath = getRelativePath(filePath, folderName);
				const modifiedLine = sourceFolders.reduce((result, cur) => {
					const Reg = new RegExp('@walnut/' + cur + '/', 'g');
					return result.replace(Reg, relativePath.replace(/\\/g, '/'));
				}, line);
				outputLines.push(modifiedLine);
				// 插入#endif
				outputLines.push('//#endif');
			} else {
				// 将原始行加入输出
				outputLines.push(line);
			}
		});

		rl.on('close', () => {
			// 将修改后的内容写回文件
			fs.writeFile(filePath, outputLines.join('\n'), err => {
				// 复制依赖到各个子包的根目录
				copyNodeModules();
				if (err) {
					console.error('写入文件失败:', err);
					return;
				}
			});
		});
	});
}

// 获取相对路径
function getRelativePath(filePath, folderName) {
	const folderPath = path.resolve(rootDir, folderName);
	const relativePath = path.relative(filePath, folderPath);
	return relativePath.substring(0, relativePath.length - 2);
}

// 将node-modules目录下的包，复制到子包目录下
function createCopyNodeModules() {
	let isCarryed = false;
	const func = () => {
		if (isCarryed) return;

		targetFolders.forEach(folderName => {
			let isExist = false;
			// 该子包需要依赖的node-modules下的包
			const targetRelatives = relateMap.get(folderName);
			targetRelatives.forEach(relativeName => {
				sourceFolders.forEach(sourceFolderName => {
					const nodeModulesPath = path.resolve(
						__dirname,
						'node_modules',
						'@walnut',
						sourceFolderName,
						relativeName
					);
					const subPackagePath = path.join(rootDir, folderName, relativeName);
					// 检查文件夹是否存在
					if (fs.existsSync(nodeModulesPath)) {
						isExist = true;
						copyDirectory(nodeModulesPath, subPackagePath);
					}
				});
			});

			if (!isExist) {
				console.error(`node_modules/@walnut/ 中不存在文件夹`);
			}
		});
		isCarryed = true;
	};
	return func;
}

// 递归复制文件夹及其内容
function copyDirectory(src, target) {
	// 确保目标目录存在
	if (!fs.existsSync(target)) {
		fs.mkdirSync(target, { recursive: true });
	}
	fs.readdirSync(src).forEach(file => {
		const srcPath = path.resolve(src, file);
		const targetPath = path.resolve(target, file);
		// 源文件状态
		const stat = fs.statSync(srcPath);
		if (stat.isDirectory()) {
			// 是文件夹的话,递归复制子目录
			copyDirectory(srcPath, targetPath);
		} else {
			// 复制文件
			if (fs.existsSync(targetPath)) {
				console.error('文件已存在！');
				return;
			}
			fs.copyFileSync(srcPath, targetPath);
			console.info(`复制文件: ${srcPath} -> ${targetPath}`);
		}
	});
}
