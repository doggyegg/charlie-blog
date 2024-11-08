import { ITreeItem } from '../types/util.ts';

export default {
	/**
	 * 树转平
	 * @param treeData:多棵树树结构
	 * @return flatData 展平的数据
	 */
	tree2Flat(treeData: Array<ITreeItem>): Array<ITreeItem> {
		if (!Array.isArray(treeData)) return treeData;

		const result: Array<ITreeItem> = [];
		const recurFunc = (tree: Array<ITreeItem>, total: Array<ITreeItem>) => {
			tree.forEach(item => {
				total.push(item);
				if ((item.children?.length as any) > 0) {
					recurFunc(item.children as any, total);
				}
			});
		};

		recurFunc(treeData, result);

		return result;
	},

	/**
	 * 平转树
	 * @param flatData 展平的数据
	 * @return treeData:多棵树树结构
	 */
	flat2Tree(flatData: Array<ITreeItem>): Array<ITreeItem> {
		const result: ITreeItem[] = [];
		const flatMap = new Map();

		flatData.forEach(item => {
			flatMap.set(item.id, item);
		});
		flatData.forEach(item => {
			const { pid } = item;
			const parent = flatMap.get(pid);

			if (parent) {
				parent.children = parent.children || [];
				parent.children.push(item);
			} else {
				result.push(item);
			}
		});
		return result;
	},

	/**
	 * 深度遍历树
	 * @param treeData:树数据  cb:每次执行的回调函数
	 * @return void
	 */
	traverseTreeDFC(treeData: Array<ITreeItem>, cb: Function, childrenFlag: string = 'children') {
		if (!treeData || typeof cb !== 'function') return treeData;
		if (!Array.isArray(treeData) && typeof treeData === 'object') {
			treeData = [treeData];
		}
		treeData.forEach(item => {
			cb(item);
			if ((item[childrenFlag] as Array<ITreeItem>).length > 0) {
				this.traverseTreeDFC(item[childrenFlag], cb, childrenFlag);
			}
		});
	},
	/**
	 * 广度遍历树
	 * @param treeData cb:每次执行的回调函数
	 * @return void
	 */
	traverseTreeBFC(treeData: Array<ITreeItem>, cb: Function, childrenFlag: string = 'children') {
		if (!treeData || typeof cb !== 'function') return treeData;
		if (!Array.isArray(treeData) && typeof treeData === 'object') {
			treeData = [treeData];
		}
		while (treeData.length > 0) {
			const node = treeData.shift();

			if (node) {
				cb(node);
			}
			if ((node[childrenFlag] as Array<ITreeItem>)?.length > 0) {
				(node[childrenFlag] as Array<ITreeItem>).forEach(node1 => {
					treeData.push(node1);
				});
			}
		}
	},
	/**
	 * 防抖函数
	 * @param cb:回调函数 ，time:等待的时长:毫秒
	 * @return 加了防抖后的函数
	 */
	debounce(cb: Function, time: number) {
		let timer = null;

		return function (...params) {
			if (timer) {
				clearTimeout(timer);
			}

			timer = setTimeout(() => {
				cb(...params);
			}, time);
		};
	},
	/**
	 * 节流函数
	 * @param cb:回调函数 ，time:等待的时长:毫秒
	 * @return 加了防抖后的函数
	 */
	throttle(cb: Function, time: number) {
		let lastCallTime = undefined;

		return function (...params) {
			if (lastCallTime && Date.now() - lastCallTime <= time) return;

			cb(...params);
			lastCallTime = Date.now();
		};
	},
	/**
	 * 深克隆
	 * @param source 初始对象
	 * @return result 克隆对象
	 */
	deepClone(source: Array<unknown> | Object, cacheMap = new WeakMap()) {
		// 排除非引用数据
		if (typeof source !== 'object') return source;
		// 解决循环引用
		if (cacheMap.has(source)) {
			return cacheMap.get(source);
		}
		const isArray = Array.isArray(source);
		const result = isArray ? [] : {};

		cacheMap.set(source, source);
		if (isArray) {
			source.forEach(i => {
				(result as Array<unknown>).push(this.deepClone(i, cacheMap));
			});
		} else {
			Object.keys(source).forEach(i => {
				result[i] = this.deepClone(source[i], cacheMap);
			});
		}
		return result;
	}
};
