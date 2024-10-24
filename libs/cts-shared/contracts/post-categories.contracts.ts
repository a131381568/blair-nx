import { z } from 'zod';
import { initContract } from '@ts-rest/core';
import { getPostCategoriesBaseSchema, postCategoryDefaultSchema, updatePostCategorySchema } from '../schemas/post-categories.schemas';
import { nanoIdSchema } from '../dto/id.dto';
import { apiResponseSchema } from '../dto/api-response.dto';

const c = initContract();

export const postCategoriesContract = c.router({
	getPostCategories: {
		method: 'GET',
		path: '/post-categories',
		responses: {
			200: getPostCategoriesBaseSchema,
			400: apiResponseSchema,
		},
		summary: 'post-categories query list',
	},
	getPostCategory: {
		method: 'GET',
		path: '/post-categories/:id',
		responses: {
			200: postCategoryDefaultSchema,
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		pathParams: z.object({
			id: nanoIdSchema,
		}),
		summary: 'single post-categories item',
	},
	createPostCategory: {
		method: 'POST',
		path: '/post-categories/create',
		responses: {
			200: z.string(),
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		body: updatePostCategorySchema,
		summary: 'create single post-categories item',
	},
	updatePostCategory: {
		method: 'PUT',
		path: '/post-categories/:id',
		responses: {
			200: z.string(),
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		body: updatePostCategorySchema,
		pathParams: z.object({
			id: nanoIdSchema,
		}),
		summary: 'update single post-categories item',
	},
	deletePostCategory: {
		method: 'DELETE',
		path: '/post-categories/:id',
		responses: {
			200: z.string(),
			400: apiResponseSchema,
			404: apiResponseSchema,
		},
		body: c.type<undefined>(),
		pathParams: z.object({
			id: nanoIdSchema,
		}),
		summary: 'delete single post-categories item',
	},
});
