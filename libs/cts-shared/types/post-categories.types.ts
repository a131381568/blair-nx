import { z } from 'zod';
import { createCategorySchema, getPostCategoriesBaseSchema, mutationCategorySchema, postCategoryDefaultSchema, postCategoryWithNanoId } from '../schemas/post-categories.schemas';

export type PostCategoryFitDto = z.infer<typeof postCategoryDefaultSchema>;
export type PostCategoryDto = z.infer<typeof postCategoryWithNanoId>;
export type PostCategoriesDto = z.infer<typeof getPostCategoriesBaseSchema>;
export type CreateCategoryDto = z.infer<typeof createCategorySchema>;
export type MutationCategoryDto = z.infer<typeof mutationCategorySchema>;
