import { z } from 'zod';
import { initContract } from '@ts-rest/core';
import { getPageListBaseSchema, updatePageItemSchema } from '../schemas/page-info.schemas';
import { nanoIdSchema } from '../dto/id.dto';
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
	updatePageItem: {
		method: 'PUT',
		path: '/page-info/:id',
		responses: {
			200: z.string(),
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		body: updatePageItemSchema,
		pathParams: z.object({
			id: nanoIdSchema,
		}),
		summary: 'update single page item',
	},
});
