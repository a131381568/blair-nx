import { z } from 'zod';
import { initContract } from '@ts-rest/core';
import { registerPayloadSchema, userBaseFitSchema } from '../schemas/users.schemas';
import { apiResponseSchema } from '../dto/api-response.dto';

const c = initContract();

export const usersContract = c.router({
	getUserList: {
		method: 'GET',
		path: '/users',
		responses: {
			200: z.array(userBaseFitSchema),
			400: apiResponseSchema,
		},
		summary: 'get users list',
	},
	registerUser: {
		method: 'POST',
		path: '/users/register',
		responses: {
			200: z.string(),
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		body: registerPayloadSchema,
		summary: 'register member',
	},
});
