import { z } from 'zod';
import { getPageListBaseSchema, pageItemBase } from '../schemas/page-info.schemas';

export type PageItemDto = z.infer<typeof pageItemBase>;
export type PageListDto = z.infer<typeof getPageListBaseSchema>;
