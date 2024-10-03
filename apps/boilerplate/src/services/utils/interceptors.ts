import type { AxiosResponse } from 'axios';

export const interceptorSuccessHandler = async (response: AxiosResponse) => {
	return response;
};

export const interceptorErrorHandler = (error: AxiosResponse) => {
	return Promise.reject(error);
};
