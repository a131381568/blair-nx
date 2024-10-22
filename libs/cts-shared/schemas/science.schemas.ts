import { z } from 'zod';
import { paginationDefaultData, paginationSchema } from '../dto/pagi.dto';

const scienceItemFit = z.object({
	title: z.string(),
	content: z.string(),
	image: z.string(),
	postCategoryNanoId: z.string(),
});

export const scienceItemBase = z.object({
	title: z.string().nullable(),
	updateTime: z.string().date().nullable(),
	content: z.string().nullable(),
	image: z.string().nullable(),
	postCategoryId: z.string().nullable(),
	postCategoryName: z.string().nullable(),
	postNanoId: z.string().nullable(),
});

export const scienceQuerySchema = z.object({
	keyword: z.string().optional(),
	category: z.string().optional(),
	cnid: z.string().optional(),
	page: z.string().default('1'),
	limit: z.string().default('9'),
	// page: z.number().int().positive().finite(),
	// pageSize: z.number().int().positive().finite(),
}).strict();

export const scienceListBaseSchema = z.array(scienceItemBase);
export const sciencetWithPagiDefaultData = {
	list: [],
	meta: paginationDefaultData,
};
export const scienceItemBaseDefaultData = {
	title: '',
	updateTime: '',
	content: '',
	image: '',
	postCategoryId: '',
	postCategoryName: '',
	postNanoId: '',
};
export const createScienceSchema = scienceItemFit.strict();
export const defaultScienceQueryData = scienceQuerySchema.parse({});
export const scienceQueryPartialSchema = scienceQuerySchema.partial();

export const sciencetWithPagiSchema = z.object({
	list: scienceListBaseSchema,
	meta: paginationSchema,
});
