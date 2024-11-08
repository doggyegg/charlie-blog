// 自己实现的promise
type status = 'pending' | 'fulfilled' | 'rejected';
export default class myPromise {
	value: unknown;
	errorValue: unknown;
	status: status;
	finallyCb?: Function;
	thenCb?: Function;
	catchCb?: Function;

	constructor(cb: Function) {
		this.value = undefined;
		this.status = 'pending';
		this.errorValue = undefined;
		this.finallyCb = undefined;
		this.thenCb = undefined;
		this.catchCb = undefined;

		cb(this.resolve.bind(this), this.reject.bind(this));
	}
	resolve(val: any) {
		this.value = val;
		this.changeStatus('fulfilled');
		if (typeof this.thenCb === 'function') {
			this.thenCb();
		}
	}
	reject(val: unknown) {
		this.errorValue = val;
		this.changeStatus('rejected');
		if (typeof this.catchCb === 'function') {
			this.catchCb();
		}
	}
	catch(cb: Function) {
		if (this.status === 'rejected') {
			cb(this.errorValue);
			return this;
		}
		this.catchCb = () => {
			cb(this.errorValue);
		};
		return this;
	}
	finally(cb: Function) {
		this.finallyCb = cb;
		return this;
	}
	then(cb: Function) {
		if (this.status === 'fulfilled') {
			cb(this.value);
			return this;
		}
		this.thenCb = () => {
			cb(this.value);
		};
		return this;
	}
	changeStatus(status: status) {
		if (this.status !== 'pending') return;
		this.status = status;
		if (typeof this.finallyCb === 'function') {
			this.finallyCb();
		}
	}
}
