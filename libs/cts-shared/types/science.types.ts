import { z } from 'zod';
import type { PaginationDto } from '../dto/pagi.dto';
import { createScienceSchema, scienceItemBase, scienceListBaseSchema, scienceQuerySchema } from '../schemas/science.schemas';

export type ScienceItemDto = z.infer<typeof scienceItemBase>;
export type ScienceListDto = z.infer<typeof scienceListBaseSchema>;
export type ScienceQueryDto = z.infer<typeof scienceQuerySchema>;
export type CreateScienceDto = z.infer<typeof createScienceSchema>;

export interface ScienceListWithPagiDto {
	list: ScienceListDto;
	meta: PaginationDto;
};
