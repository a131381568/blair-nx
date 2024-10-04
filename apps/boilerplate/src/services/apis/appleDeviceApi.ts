import qs from 'qs';
import { apiWithoutToken } from '@demo-src/services/utils/instances';
import type { AdListParams, BaseAdItem } from '@demo-src/types';

export const apiFetchAdList = <T>(params: T) => {
	return apiWithoutToken({
		url: '/objects',
		method: 'get',
		headers: { 'Content-Type': 'text/plain' },
		params,
	});
};

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

export const apiDelItem = <T>(id: string, params: T) => {
	return apiWithoutToken({
		url: `/objects/${id}`,
		method: 'delete',
		headers: { 'Content-Type': 'text/plain' },
		params,
	});
};
