import { z } from 'zod';
import type { PaginationDto } from '../../common/dto/pagi.dto';
import { paginationDefaultData } from '../../common/dto/pagi.dto';

const scienceItemBase = z.object({
	title: z.string().nullable(),
	updateTime: z.string().date().nullable(),
	content: z.string().nullable(),
	image: z.string().nullable(),
	postCategoryId: z.string().nullable(),
});

const scienceQuery = z.object({
	keyword: z.string(),
	postCategoryId: z.string(),
	postCategoryNanoId: z.string(),
	page: z.number().int().positive().finite(),
	pageSize: z.number().int().positive().finite(),
}).partial();

export const scienceListBaseSchema = z.array(scienceItemBase);
export const sciencetWithPagiDefaultData = {
	list: [],
	meta: paginationDefaultData,
};

export type ScienceItemDto = z.infer<typeof scienceItemBase>;
export type ScienceListDto = z.infer<typeof scienceListBaseSchema>;
export type ScienceQueryDto = z.infer<typeof scienceQuery>;

export interface ScienceListWithPagiDto {
	list: ScienceListDto;
	meta: PaginationDto;
};
