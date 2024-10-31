import { z } from 'zod';
import { getPageListBaseSchema, mutationPageItemSchema, pageItemBase, updatePageItemSchema } from '../schemas/page-info.schemas';

export type PageItemDto = z.infer<typeof pageItemBase>;
export type PageListDto = z.infer<typeof getPageListBaseSchema>;
export type UpdatePageItemDto = z.infer<typeof updatePageItemSchema>;
export type MutationPageItemDto = z.infer<typeof mutationPageItemSchema>;
