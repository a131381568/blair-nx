import { z } from 'zod';
import { initContract } from '@ts-rest/core';
import { StargazingListWithPagiSchema, stargazingItemDetail, stargazingQuerySchema, updateStargazingDetailSchema } from '../schemas/stargazing.schemas';
import { nanoIdSchema } from '../dto/id.dto';
import { apiResponseSchema } from '../dto/api-response.dto';

const c = initContract();

export const stargazingContract = c.router({
	getStargazingQuery: {
		method: 'GET',
		path: '/stargazing',
		responses: {
			200: StargazingListWithPagiSchema,
			400: apiResponseSchema,
		},
		query: stargazingQuerySchema,
		summary: 'stargazing query list',
	},
	getStargazingDetail: {
		method: 'GET',
		path: '/stargazing/:id',
		responses: {
			200: stargazingItemDetail,
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		pathParams: z.object({
			id: nanoIdSchema,
		}),
		summary: 'single stargazing item',
	},
	createStargazingDetail: {
		method: 'POST',
		path: '/stargazing/create',
		responses: {
			200: z.string(),
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		body: updateStargazingDetailSchema,
		summary: 'create single stargazing item',
	},
	updateStargazingDetail: {
		method: 'PUT',
		path: '/stargazing/:id',
		responses: {
			200: z.string(),
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		body: updateStargazingDetailSchema,
		pathParams: z.object({
			id: nanoIdSchema,
		}),
		summary: 'update single stargazing item',
	},
	deleteStargazingDetail: {
		method: 'DELETE',
		path: '/stargazing/:id',
		responses: {
			200: z.string(),
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		body: c.type<undefined>(),
		pathParams: z.object({
			id: nanoIdSchema,
		}),
		summary: 'delete single stargazing item',
	},
});
