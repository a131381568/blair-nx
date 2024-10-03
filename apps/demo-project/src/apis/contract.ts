import { initContract } from '@ts-rest/core';
import type { AppRoute, ClientInferRequest } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

// 定義 req 和 res 的資料結構
const listResSchema = z.array(
	z.object({
		id: z.string(),
		name: z.string(),
		data: z.object({
			'cpu model': z.string().optional(),
			'hard disk size': z.string().optional(),
			'screen size': z.number().optional(),
			'description': z.string().optional(),
			'generation': z.string().optional(),
			'price': z.union([z.number(), z.string()]).optional(),
			'capacity': z.string().optional(),
			'color': z.string().optional(),
			'capacity gb': z.string().optional(),
			'year': z.number().optional(),
			'case size': z.string().optional(),
			'strap colour': z.string().optional(),
			// capitalize
			'CPU model': z.string().optional(),
			'Hard disk size': z.string().optional(),
			'Screen size': z.number().optional(),
			'Description': z.string().optional(),
			'Generation': z.string().optional(),
			'Price': z.union([z.number(), z.string()]).optional(),
			'Capacity': z.string().optional(),
			'Color': z.string().optional(),
			'Capacity GB': z.string().optional(),
			'Year': z.number().optional(),
			'Case Size': z.string().optional(),
			'Strap Colour': z.string().optional(),
		}).nullable(),
	}),
);

const delResErrorSchema = z.object({
	error: z.string(),
});

const delResSuccessSchema = z.object({
	message: z.number(),
});

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
