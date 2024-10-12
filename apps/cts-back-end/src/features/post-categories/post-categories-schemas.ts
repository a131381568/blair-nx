import { z } from 'zod';

const postCategoryBase = z.object({
	postCategoryName: z.string().nullable(),
	postCategoryId: z.string().nullable(),
});

const postCategoryWithNanoId = postCategoryBase.extend({
	postCategoryNanoId: z.string().nullable(),
});

const postCategoryDefaultSchema = z.object({
	postCategoryName: z.string().nullable().default(''),
	postCategoryId: z.string().nullable().default(''),
});

export const getPostCategoriesBaseSchema = z.array(postCategoryWithNanoId);
export const defaultPostCategoryData = postCategoryDefaultSchema.parse({});
export const updatePostCategorySchema = postCategoryBase.strict();

export type PostCategoryFitDto = z.infer<typeof postCategoryDefaultSchema>;
export type PostCategoryDto = z.infer<typeof postCategoryWithNanoId>;
export type PostCategoriesDto = z.infer<typeof getPostCategoriesBaseSchema>;
