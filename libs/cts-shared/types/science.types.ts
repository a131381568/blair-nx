import { z } from 'zod';
import { createScienceSchema, mutationScienceSchema, scienceArrayListModeSchema, scienceItemBase, scienceListBaseSchema, scienceQueryPartialSchema, scienceQuerySchema, sciencetWithPagiSchema, switchQueryModeSchema } from '../schemas/science.schemas';

export type ScienceItemDto = z.infer<typeof scienceItemBase>;
export type ScienceListDto = z.infer<typeof scienceListBaseSchema>;
export type scienceArrayListModeDto = z.infer<typeof scienceArrayListModeSchema>;
export type ScienceQueryDto = z.infer<typeof scienceQuerySchema>;
export type CreateScienceDto = z.infer<typeof createScienceSchema>;
export type MutationScienceDto = z.infer<typeof mutationScienceSchema>;

export type switchQueryModeDto = z.infer<typeof switchQueryModeSchema>;

export type ScienceListWithPagiDto = z.infer<typeof sciencetWithPagiSchema>;

export type ScienceQueryPartialDto = z.infer<typeof scienceQueryPartialSchema>;
