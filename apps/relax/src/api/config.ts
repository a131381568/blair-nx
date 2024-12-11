import type { AxiosError } from 'axios';
import axios from 'axios';

export const API_HOST = 'http://localhost:3333/api';
export const axiosInstance = axios.create({
	baseURL: API_HOST,
	timeout: 5000,
});

axiosInstance.interceptors.response.use(
	response => response,
	(error: AxiosError) => {
		if (axios.isCancel(error)) {
			return Promise.reject(error);
		}
		// 這裡可以統一處理其他錯誤
		return Promise.reject(error);
	},
);
