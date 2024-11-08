export default {
	// 模拟new操作符
	new(constructor: Function, ...rest: any) {
		const obj = {};
		// eslint-disable-next-line
		(obj as any).__proto__ = constructor.prototype;
		const result = constructor.call(obj, ...rest);

		return typeof result === 'object' ? result : obj;
	},
	// 模拟call,apply,bind
	call() {},
	apply() {},
	bind() {}
};
