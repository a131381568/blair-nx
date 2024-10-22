import qs from 'qs';
import { apiWithoutToken } from '@ctsf-src/services/utils/instances';
import type { ScienceQueryPartialDto } from '@cts-shared';

export const apiFetchScienceList = (query: ScienceQueryPartialDto) => {
	return apiWithoutToken.get('/science', {
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
