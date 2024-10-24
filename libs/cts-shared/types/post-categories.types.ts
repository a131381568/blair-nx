import { z } from 'zod';
import { getPostCategoriesBaseSchema, postCategoryDefaultSchema, postCategoryWithNanoId } from '../schemas/post-categories.schemas';

export type PostCategoryFitDto = z.infer<typeof postCategoryDefaultSchema>;
export type PostCategoryDto = z.infer<typeof postCategoryWithNanoId>;
export type PostCategoriesDto = z.infer<typeof getPostCategoriesBaseSchema>;
