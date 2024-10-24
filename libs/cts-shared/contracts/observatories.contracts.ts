import { z } from 'zod';
import { initContract } from '@ts-rest/core';
import { getObservatoriesListBaseSchema, observatoryItemBase, updateObservatoryItemSchema } from '../schemas/observatories.schemas';
import { nanoIdSchema } from '../dto/id.dto';
import { apiResponseSchema } from '../dto/api-response.dto';

const c = initContract();

export const observatoriesContract = c.router({
	getObservatoriesList: {
		method: 'GET',
		path: '/observatories',
		responses: {
			200: getObservatoriesListBaseSchema,
			400: apiResponseSchema,
		},
		summary: 'observatories all list',
	},
	getObservatoryItem: {
		method: 'GET',
		path: '/observatories/:id',
		responses: {
			200: observatoryItemBase,
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		pathParams: z.object({
			id: nanoIdSchema,
		}),
		summary: 'single observatory item',
	},
	createObservatoryItem: {
		method: 'POST',
		path: '/observatories/create',
		responses: {
			200: z.string(),
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		body: updateObservatoryItemSchema,
		summary: 'create single observatory item',
	},
	updateObservatoryItem: {
		method: 'PUT',
		path: '/observatories/:id',
		responses: {
			200: z.string(),
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		body: updateObservatoryItemSchema,
		pathParams: z.object({
			id: nanoIdSchema,
		}),
		summary: 'update single observatory item',
	},
	deleteObservatoryItem: {
		method: 'DELETE',
		path: '/observatories/:id',
		responses: {
			200: z.string(),
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		body: c.type<undefined>(),
		pathParams: z.object({
			id: nanoIdSchema,
		}),
		summary: 'delete single observatory item',
	},
});
