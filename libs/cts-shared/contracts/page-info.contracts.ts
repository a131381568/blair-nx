import { initContract } from '@ts-rest/core';
import { getPageListBaseSchema } from '../schemas/page-info.schemas';
import { apiResponseSchema } from '../dto/api-response.dto';

const c = initContract();

export const pageInfoContract = c.router({
	getPageInfoList: {
		method: 'GET',
		path: '/page-info',
		responses: {
			200: getPageListBaseSchema,
			400: apiResponseSchema,
		},
		summary: 'get page info',
	},
});
