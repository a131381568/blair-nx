import type { AxiosError } from 'axios';
import { isString } from 'radash';
import { getToken, setCookie } from '@blair-nx-composables';
import { AUTH_CONFIG } from '@ctsf-src/services/utils/config';
import { apiFetchRefreshAuth } from '@ctsf-src/services/apis/authApi';
import { hrefLoginPage } from '../../helper/customCtsRoute';
import { axiosInstance, isRefreshing, onRefreshed, refreshSubscribers, resetRefreshState } from './instances';

// 請求攔截器：添加 token
axiosInstance.interceptors.request.use((config) => {
	const token = getToken(AUTH_CONFIG.ACCESS_TOKEN_KEY);
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// 響應攔截器：處理 token 刷新
axiosInstance.interceptors.response.use(
	response => response,
	async (error: AxiosError) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
			if (isRefreshing) {
				// 等待新 token 後重試
				return new Promise((resolve) => {
					refreshSubscribers.push((token: string) => {
						if (originalRequest.headers) {
							originalRequest.headers.Authorization = `Bearer ${token}`;
						}
						resolve(axiosInstance(originalRequest));
					});
				});
			}

			originalRequest._retry = true;

			try {
				const refreshToken = getToken(AUTH_CONFIG.REFRESH_TOKEN_KEY);
				if (isString(refreshToken)) {
					const response = await apiFetchRefreshAuth(refreshToken);
					const { accessToken } = response.data.data;
					setCookie(AUTH_CONFIG.ACCESS_TOKEN_KEY, accessToken, AUTH_CONFIG.TOKEN_EXPIRY_DAYS);
					onRefreshed(accessToken);
				}
				return axiosInstance(originalRequest);
			}
			catch (refreshError) {
				hrefLoginPage();
				return Promise.reject(refreshError);
			}
			finally {
				resetRefreshState();
			}
		}
		return Promise.reject(error);
	},
);

// 擴展 AxiosRequestConfig 類型來包含 _retry
declare module 'axios' {
	interface AxiosRequestConfig {
		_retry?: boolean;
	}
}

export { axiosInstance };
