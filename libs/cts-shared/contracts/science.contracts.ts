import { z } from 'zod';
import { initContract } from '@ts-rest/core';
import type { ClientInferRequest } from '@ts-rest/core';
import { createScienceSchema, scienceItemBase, scienceQueryPartialSchema, sciencetWithPagiSchema } from '../schemas/science.schemas';
import { nanoIdSchema } from '../dto/id.dto';
import { apiResponseSchema } from '../dto/api-response.dto';

const c = initContract();

const scienceContract = c.router({
	getScienceList: {
		method: 'GET',
		path: '/science',
		responses: {
			200: sciencetWithPagiSchema,
			400: apiResponseSchema,
		},
		query: scienceQueryPartialSchema,
		summary: 'science query list',
	},
	getScienceDetail: {
		method: 'GET',
		path: '/science/:id',
		responses: {
			200: scienceItemBase,
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		pathParams: z.object({
			id: nanoIdSchema,
		}),
		summary: 'single science item',
	},
	createScienceDetail: {
		method: 'POST',
		path: '/science/create',
		responses: {
			200: z.string(),
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		body: createScienceSchema,
		summary: 'create single science item',
	},
	updateScienceDetail: {
		method: 'PUT',
		path: '/science/:id',
		responses: {
			200: z.string(),
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		body: createScienceSchema,
		pathParams: z.object({
			id: nanoIdSchema,
		}),
		summary: 'update single science item',
	},
	deleteScienceDetail: {
		method: 'DELETE',
		path: '/science/:id',
		responses: {
			200: z.string(),
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		body: c.type<undefined>(),
		pathParams: z.object({
			id: nanoIdSchema,
		}),
		summary: 'delete single science item',
	},
});

export type ScienceContract = ClientInferRequest<typeof scienceContract>;
export { scienceContract };
