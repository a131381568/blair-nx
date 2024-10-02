import qs from 'qs';
import { apiWithoutToken } from '@demo-src/apis/index';
import type { AdListParams, BaseAdItem } from '@demo-src/types/types';

export const apiFetchAdList = () => apiWithoutToken.get('/objects');

export const apiFetchAdListByIds = (query: AdListParams) => {
	return apiWithoutToken.get('/objects', {
		params: query,
		paramsSerializer: (params) => {
			return qs.stringify(params, {
				arrayFormat: 'comma',
				encodeValuesOnly: true,
				skipNulls: true,
			});
		},
	});
};

export const apiFetchAdListByPathId = (id: string) => apiWithoutToken.get(`/objects/${id}`);

export const apiAddItem = (payload: BaseAdItem) => apiWithoutToken.post('/objects', payload);

export const apiPutItem = (id: string, payload: BaseAdItem) => apiWithoutToken.put(`/objects/${id}`, payload);

export const apiPatchItem = (id: string, payload: BaseAdItem) => apiWithoutToken.patch(`/objects/${id}`, payload);

export const apiDelItem = (id: string) => apiWithoutToken.delete(`/objects/${id}`);