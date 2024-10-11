import { z } from 'zod';

const postCategoryBase = z.object({
	postCategoryName: z.string().nullable(),
	postCategoryId: z.string().nullable(),
	postCategoryNanoId: z.string().nullable(),
});

export const getPostCategoriesBaseSchema = z.array(postCategoryBase);

export type postCategoryBaseDto = z.infer<typeof postCategoryBase>;
export type PostCategoriesBaseDto = z.infer<typeof getPostCategoriesBaseSchema>;
