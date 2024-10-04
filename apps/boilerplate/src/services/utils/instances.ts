import axios from 'axios';
import { getToken } from '@blair-nx-composables';
import { interceptorErrorHandler, interceptorSuccessHandler } from '@demo-src/services/utils/interceptors';
import { mockUrl, url } from '@demo-src/services/utils/config';

const token = getToken('token');

const apiWithoutToken = axios.create({
	baseURL: url,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
});

const apiWithToken = axios.create({
	baseURL: url,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Authorization': `Bearer ${token}`,
	},
});

const apiWithFormData = axios.create({
	baseURL: url,
	headers: {
		'Content-Type': 'multipart/form-data',
		'Authorization': `Bearer ${token}`,
	},
});

const apiTest = axios.create({
	baseURL: mockUrl,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
});

apiWithToken.interceptors.response.use(interceptorSuccessHandler, interceptorErrorHandler);
apiWithoutToken.interceptors.response.use(interceptorSuccessHandler, interceptorErrorHandler);
apiTest.interceptors.response.use(interceptorSuccessHandler, interceptorErrorHandler);

export { apiTest, apiWithFormData, apiWithToken, apiWithoutToken };
