import { z } from 'zod';
import { StargazingListWithPagiSchema, createSinleStargazingSchema, mutationSinleStargazingSchema, singleStargazingDetail, stargazingItemBase, stargazingItemDetail, stargazingQuerySchema, switchStargazingQueryMode, updateStargazingDetailSchema } from '../schemas/stargazing.schemas';

export type StargazingItemBaseDto = z.infer<typeof stargazingItemBase>;
export type StargazingListWithPagiDto = z.infer<typeof StargazingListWithPagiSchema>;
export type StargazingQueryDto = z.infer<typeof stargazingQuerySchema>;
export type StargazingItemDetailDto = z.infer<typeof stargazingItemDetail>;
export type UpdateStargazingDetailDto = z.infer<typeof updateStargazingDetailSchema>;
export type SingleStargazingDetailDto = z.infer<typeof singleStargazingDetail>;
export type SwitchStargazingQueryModeDto = z.infer<typeof switchStargazingQueryMode>;
export type CreateSinleStargazingDto = z.infer<typeof createSinleStargazingSchema>;
export type MutationSinleStargazingDto = z.infer<typeof mutationSinleStargazingSchema>;
