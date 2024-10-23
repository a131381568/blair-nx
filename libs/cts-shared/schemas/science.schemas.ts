import { z } from 'zod';
import { paginationDefaultData, paginationSchema } from '../dto/pagi.dto';
import { nanoIdSchema, strIdSchema } from '../dto/id.dto';

const positiveIntegerString = z.string().max(5).refine((val) => {
	const number = Number.parseInt(val, 10);
	return number > 0 && number.toString() === val;
}, {
	message: 'Must be a positive integer string of length 5 or less',
});

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
	keyword: strIdSchema.optional(),
	category: strIdSchema.optional(),
	cnid: nanoIdSchema.optional(),
	page: positiveIntegerString.default('1'),
	limit: positiveIntegerString.default('9'),
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
