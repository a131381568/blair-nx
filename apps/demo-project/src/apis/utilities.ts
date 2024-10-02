import type { AxiosResponse } from 'axios';

export const interceptorSuccessHandler = async (response: AxiosResponse) => {
	return response;
};

export const interceptorErrorHandler = (error: AxiosResponse) => {
	return Promise.reject(error);
};

const apiPort = `${import.meta.env.VITE_APP_DATA_PORT}` ? `:${import.meta.env.VITE_APP_DATA_PORT}` : '';
// api domain + port
export const url = `${import.meta.env.VITE_APP_API}${apiPort}/`;
// mock url
export const mockUrl = `${import.meta.env.VITE_APP_MOCK_API}${apiPort}/`;
