import axios from 'axios';
import { getToken } from '@blair-nx-composables';
import { url } from '@ctsf-src/services/utils/config';

export const axiosInstance = axios.create({
	baseURL: url,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
});

export type RefreshSubscriber = (token: string) => void;

// 刷新狀態管理
/* eslint-disable import/no-mutable-exports */
export let isRefreshing = false;
export let refreshSubscribers: RefreshSubscriber[] = [];

export const resetRefreshState = () => {
	isRefreshing = false;
	refreshSubscribers = [];
};

export const onRefreshed = (token: string) => {
	refreshSubscribers.forEach(cb => cb(token));
	refreshSubscribers = [];
};

export const apiWithFormData = axios.create({
	baseURL: url,
	headers: {
		'Content-Type': 'multipart/form-data',
		'Accept': 'multipart/form-data',
		'Authorization': `Bearer ${getToken('accessToken')}`,
	},
});
