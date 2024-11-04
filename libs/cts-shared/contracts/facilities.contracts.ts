import { z } from 'zod';
import { initContract } from '@ts-rest/core';
import { createFacilityItemSchema, facilityItemBase, getFacilitiesListBaseWithNanoIdSchema, updateFacilityItemSchema } from '../schemas/facilities.schemas';
import { nanoIdSchema } from '../dto/id.dto';
import { apiResponseSchema } from '../dto/api-response.dto';

const c = initContract();

export const facilitiesContract = c.router({
	getFacilitiesList: {
		method: 'GET',
		path: '/facilities',
		responses: {
			200: getFacilitiesListBaseWithNanoIdSchema,
			400: apiResponseSchema,
		},
		summary: 'get facilities list (post*3)',
	},
	getFacilityItem: {
		method: 'GET',
		path: '/facilities/:id',
		responses: {
			200: facilityItemBase,
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		pathParams: z.object({
			id: nanoIdSchema,
		}),
		summary: 'single facility item',
	},
	createFacilityItem: {
		method: 'POST',
		path: '/facilities/create',
		responses: {
			200: z.string(),
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		body: createFacilityItemSchema,
		summary: 'create single facility item',
	},
	updateFacilityItem: {
		method: 'PUT',
		path: '/facilities/:id',
		responses: {
			200: z.string(),
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		body: updateFacilityItemSchema,
		pathParams: z.object({
			id: nanoIdSchema,
		}),
		summary: 'update single facility item',
	},
	deleteFacilityItem: {
		method: 'DELETE',
		path: '/facilities/:id',
		responses: {
			200: z.string(),
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		body: c.type<undefined>(),
		pathParams: z.object({
			id: nanoIdSchema,
		}),
		summary: 'delete single facility item',
	},
});
