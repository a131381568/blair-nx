import { z } from 'zod';
import { initContract } from '@ts-rest/core';
import { aboutInfoBaseSchema, updateAboutInfoSchema } from '../schemas/about-info.schemas';
import { apiResponseSchema } from '../dto/api-response.dto';

const c = initContract();

export const aboutInfoContract = c.router({
	getAboutInfo: {
		method: 'GET',
		path: '/about-info',
		responses: {
			200: aboutInfoBaseSchema,
			400: apiResponseSchema,
		},
		summary: 'get about page info',
	},
	updateAboutInfo: {
		method: 'POST',
		path: '/about-info',
		responses: {
			200: z.string(),
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		body: updateAboutInfoSchema,
		summary: 'update about',
	},
});
