import axios from 'axios';
import { IResInter, IRequestConfig } from '../types/request';

function defaultResInter(res: IResInter) {
	return res.data;
}

function defaultReqInter(req: unknown) {
	return req;
}

function requestCreator(config: IRequestConfig) {
	const { baseURL, timeout, headers, reqInter, resInter } = config || {};
	const ins = axios.create({
		baseURL: baseURL || 'http://localhost:1994/api',
		timeout: timeout || 1000 * 60,
		headers: { Authorization: window.localStorage.TOKEN, ...headers },
		withCredentials: true
	});

	ins.interceptors.request.use((req: unknown) =>
		typeof reqInter === 'function' ? reqInter(req) : defaultReqInter(req)
	);
	ins.interceptors.response.use((res: unknown) =>
		typeof resInter === 'function' ? resInter(res) : defaultResInter(res as any)
	);

	return ins;
}

export default requestCreator;
