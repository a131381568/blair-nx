import qs from 'qs';
import { apiWithoutToken } from '@ctsf-src/services/utils/instances';
import type { AdListParams, BaseAdItem } from '@ctsf-src/types';

export const apiFetchScienceList = <T>(params: T) => {
	return apiWithoutToken({
		url: '/science',
		method: 'get',
		headers: { 'Content-Type': 'text/plain' },
		params,
	});
};

export const apiFetchScienceListByIds = (query: AdListParams) => {
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

export const apiFetchScienceListByPathId = (id: string) => apiWithoutToken.get(`/objects/${id}`);

export const apiAddScienceItem = (payload: BaseAdItem) => apiWithoutToken.post('/objects', payload);

export const apiPutScienceItem = (id: string, payload: BaseAdItem) => apiWithoutToken.put(`/objects/${id}`, payload);

export const apiPatchScienceItem = (id: string, payload: BaseAdItem) => apiWithoutToken.patch(`/objects/${id}`, payload);

export const apiDelScienceItem = <T>(id: string, params: T) => {
	return apiWithoutToken({
		url: `/objects/${id}`,
		method: 'delete',
		headers: { 'Content-Type': 'text/plain' },
		params,
	});
};
