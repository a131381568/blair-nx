import { z } from 'zod';
import { initContract } from '@ts-rest/core';
import { aboutInfoBaseSchema, updateAboutInfoSchema } from '../schemas/about-info.schemas';
import { apiResponseSchema } from '../dto/api-response.dto';

const c = initContract();

export const fileContract = c.router({
	uploadFile: {
		method: 'POST',
		path: '/file/upload',
		responses: {
			200: z.string(),
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		body: c.type<undefined>(),
		summary: 'upload file to aws s3',
	},
});
