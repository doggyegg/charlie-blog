export interface IResInter {
	data: object;
	code: string | number;
	[key: string]: any;
}

export interface IRequestConfig {
	baseURL: string;
	timeout: number;
	headers: object;
	reqInter: Function;
	resInter: Function;
}
