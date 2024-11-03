import { z } from 'zod';
import { paginationDefaultData, paginationSchema } from '../dto/pagi.dto';
import { baseStringSchema, keyWordSchema, strArticleSchema, strIdSchema } from '../dto/string.dto';
import { nanoIdSchema } from '../dto/id.dto';

const positiveIntegerString = z.string().max(5).refine((val) => {
	const number = Number.parseInt(val, 10);
	return number > 0 && number.toString() === val;
}, {
	message: 'Must be a positive integer string of length 5 or less',
});

const scienceItemFit = z.object({
	title: baseStringSchema,
	content: strArticleSchema,
	image: strArticleSchema,
	postCategoryNanoId: nanoIdSchema,
});

export const scienceItemListModeSchema = z.object({
	title: baseStringSchema.nullable(),
	updateTime: z.string().date().nullable(),
	postCategoryName: baseStringSchema.nullable(),
	postNanoId: nanoIdSchema.nullable(),
});

export const scienceItemBase = scienceItemListModeSchema.extend({
	content: z.string().nullable(),
	image: strArticleSchema.nullable(),
	postCategoryId: strIdSchema.nullable(),
});

export const switchQueryModeSchema = z.union([z.literal('list'), z.literal('grid')]);

export const scienceQuerySchema = z.object({
	keyword: keyWordSchema.optional(),
	category: strIdSchema.optional(),
	cnid: nanoIdSchema.optional(),
	page: positiveIntegerString.default('1'),
	limit: positiveIntegerString.default('9'),
	mode: switchQueryModeSchema.default('grid'),
}).strict();

export const scienceListBaseSchema = z.array(scienceItemBase);
export const scienceArrayListModeSchema = z.array(scienceItemListModeSchema);
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
export const mutationScienceSchema = scienceItemFit.extend({
	postNanoId: nanoIdSchema,
}).strict();
export const defaultScienceQueryData = scienceQuerySchema.parse({});
export const scienceQueryPartialSchema = scienceQuerySchema.partial();

export const sciencetWithPagiSchema = z.object({
	list: z.union([scienceListBaseSchema, scienceArrayListModeSchema]),
	meta: paginationSchema,
});
