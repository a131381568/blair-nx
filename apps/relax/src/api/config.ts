import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';

export const API_HOST = 'http://localhost:3333/api';

export const createAxiosInstance = (config?: AxiosRequestConfig) => {
	const instance = axios.create({
		baseURL: API_HOST,
		timeout: 5000,
		...config,
	});

	instance.interceptors.response.use(
		response => response,
		(error: AxiosError) => {
			if (axios.isCancel(error)) {
				return Promise.reject(error);
			}
			return Promise.reject(error);
		},
	);

	return instance;
};
