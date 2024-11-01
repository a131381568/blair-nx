import { z } from 'zod';
import { baseStringSchema, strIdSchema } from '../dto/string.dto';
import { nanoIdSchema } from '../dto/id.dto';

const postCategoryBase = z.object({
	postCategoryName: baseStringSchema.nullable(),
	postCategoryId: strIdSchema.nullable(),
});

export const postCategoryWithNanoId = postCategoryBase.extend({
	postCategoryNanoId: nanoIdSchema.nullable(),
});

export const postCategoryDefaultSchema = z.object({
	postCategoryName: z.string().nullable().default(''),
	postCategoryId: z.string().nullable().default(''),
});

export const getPostCategoriesBaseSchema = z.array(postCategoryWithNanoId);
export const defaultPostCategoryData = postCategoryDefaultSchema.parse({});
export const updatePostCategorySchema = postCategoryBase.strict();

export const createCategorySchema = z.object({
	postCategoryName: baseStringSchema,
	postCategoryId: strIdSchema,
}).strict();

export const mutationCategorySchema = createCategorySchema.extend({
	postCategoryNanoId: nanoIdSchema,
}).strict();
