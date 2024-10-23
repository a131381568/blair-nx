import { initContract } from '@ts-rest/core';
import { accessTokenSchema, loginInputSchema, refreshTokenSchema, tokenGroupSchema } from '../schemas/users.schemas';
import { apiResponseSchema } from '../dto/api-response.dto';

const c = initContract();

export const authContract = c.router({
	login: {
		method: 'POST',
		path: '/auth/login',
		responses: {
			201: tokenGroupSchema,
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		body: loginInputSchema,
		summary: 'login',
	},
	refreshToken: {
		method: 'POST',
		path: '/auth/refresh',
		responses: {
			201: accessTokenSchema,
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		body: refreshTokenSchema,
		summary: 'refreshToken',
	},
});
