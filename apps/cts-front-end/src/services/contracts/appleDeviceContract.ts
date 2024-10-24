import { initContract } from '@ts-rest/core';
import type { AppRoute, ClientInferRequest } from '@ts-rest/core';
import { delResErrorSchema, delResSuccessSchema, listResSchema } from '@ctsf-src/types/schemas/appleDeviceSchema';

const c = initContract();

// 整合需要驗證的 api router
const getListRes = {
	method: 'GET',
	path: '/objects',
	responses: {
		200: listResSchema,
	},
	summary: 'Get Apple devices list',
} satisfies AppRoute;

const delItemRes = {
	method: 'DELETE',
	path: '/objects/:id',
	responses: {
		200: delResSuccessSchema,
		404: delResErrorSchema,
	},
	body: c.type<undefined>(),
	summary: 'Delete Apple device',
} satisfies AppRoute;

const apiContract = c.router({
	getListRes,
	delItemRes,
});

export type ApiContract = ClientInferRequest<typeof apiContract>;
export { apiContract };
