import { z } from 'zod';
import { initContract } from '@ts-rest/core';
import { apiResponseSchema } from '../dto/api-response.dto';

const c = initContract();

export const fileContract = c.router({
	uploadFile: {
		method: 'POST',
		path: '/file/upload',
		contentType: 'multipart/form-data',
		responses: {
			200: z.string(),
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		body: c.type<FormData>(),
		summary: 'upload file to aws s3',
	},
});
