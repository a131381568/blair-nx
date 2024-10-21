import { z } from 'zod';

const postCategoryBase = z.object({
	postCategoryName: z.string().nullable(),
	postCategoryId: z.string().nullable(),
});

export const postCategoryWithNanoId = postCategoryBase.extend({
	postCategoryNanoId: z.string().nullable(),
});

export const postCategoryDefaultSchema = z.object({
	postCategoryName: z.string().nullable().default(''),
	postCategoryId: z.string().nullable().default(''),
});

export const getPostCategoriesBaseSchema = z.array(postCategoryWithNanoId);
export const defaultPostCategoryData = postCategoryDefaultSchema.parse({});
export const updatePostCategorySchema = postCategoryBase.strict();
