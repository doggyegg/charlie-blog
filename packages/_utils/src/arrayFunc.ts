// 数组原生函数实现
interface Array<T> {
	_forEach(): void;
	_map: Function;
	_some: Function;
	_every: Function;
	_find: Function;
	_includes: Function;
	_reduce: Function;
	_pop(): T;
}

Array.prototype._forEach = function (cb) {
	for (let i = 0; i < this.length; i++) {
		cb(this[i]);
	}
};

Array.prototype._map = function (cb: Function) {
	const result: Array<unknown> = [];

	for (let i = 0; i < this.length; i++) {
		const res = cb(this[i]);
		result.push(res);
	}
	return result;
};

Array.prototype._some = function (cb) {
	let result = false;

	for (let i = 0; i < this.length; i++) {
		const res = cb(this[i]);
		if (res === true) result = true;
	}
	return result;
};

Array.prototype._every = function (cb) {
	let result = true;

	for (let i = 0; i < this.length; i++) {
		const res = cb(this[i]);
		if (res === false) result = false;
	}
	return result;
};

Array.prototype._find = function (cb) {
	let result = undefined;

	for (let i = 0; i < this.length; i++) {
		const res = cb(this[i]);
		if (res === true) result = this[i];
	}
	return result;
};

Array.prototype._includes = function (target) {
	let result = false;

	for (let i = 0; i < this.length; i++) {
		if (this[i] === target) result = true;
	}
	return result;
};

Array.prototype._reduce = function (cb, init) {
	let result = init;

	for (let i = 0; i < this.length; i++) {
		result = cb(result, this[i]);
	}
	return result;
};

Array.prototype._pop = function () {
	const result = this[length - 1];

	this.length - 1;
	return result;
};
