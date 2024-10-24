import { z } from 'zod';
import { StargazingListWithPagiSchema, stargazingItemBase, stargazingItemDetail, stargazingQuerySchema, updateStargazingDetailSchema } from '../schemas/stargazing.schemas';

export type StargazingItemBaseDto = z.infer<typeof stargazingItemBase>;
export type StargazingListWithPagiDto = z.infer<typeof StargazingListWithPagiSchema>;
export type StargazingQueryDto = z.infer<typeof stargazingQuerySchema>;
export type StargazingItemDetailDto = z.infer<typeof stargazingItemDetail>;
export type UpdateStargazingDetailDto = z.infer<typeof updateStargazingDetailSchema>;
