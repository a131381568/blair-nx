import axios from 'axios';
import { url } from '@ctsf-src/services/utils/config';

export const apiFetchRefreshAuth = (refreshToken: string) => {
	return axios.post(`${url}/auth/refresh`, { refreshToken });
};
