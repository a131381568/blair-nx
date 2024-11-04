import { z } from 'zod';
import Big from 'big.js';
import { paginationDefaultData, paginationSchema } from '../dto/pagi.dto';
import { baseStringSchema, strArticleSchema } from '../dto/string.dto';
import { nanoIdSchema } from '../dto/id.dto';

const bigSchema = z
	.string()
	.refine(val => !Number.isNaN(Number(val)), {
		message: 'Invalid decimal value',
	})
	.transform(val => new Big(val));

export const stargazingItemBase = z.object({
	stargazingTitle: z.string().nullable(),
	stargazingAddress: z.string().nullable(),
	stargazingNanoId: z.string().nullable(),
});

export const stargazingItemDetail = stargazingItemBase.extend({
	stargazingLatitude: z.union([z.string(), bigSchema]).default(''),
	stargazingLongitude: z.union([z.string(), bigSchema]).default(''),
	stargazingImage: z.string().nullable(),
	stargazingDescription: z.string().nullable(),
});

export const singleStargazingDetail = stargazingItemDetail.merge(z.object({
	stargazingLatitude: z.string(),
	stargazingLongitude: z.string(),
}));

export const defaultStargazingItemDetail = singleStargazingDetail.parse({
	stargazingTitle: '',
	stargazingAddress: '',
	stargazingNanoId: '',
	stargazingLatitude: '',
	stargazingLongitude: '',
	stargazingImage: '',
	stargazingDescription: '',
});

export const stargazingWithPagiDefaultData = {
	list: [],
	meta: paginationDefaultData,
};

export const switchStargazingQueryMode = z.union([z.literal('map'), z.literal('list')]);

export const stargazingQuerySchema = z.object({
	nid: nanoIdSchema.optional(),
	page: z.string().default('1'),
	limit: z.string().default('10'),
	mode: switchStargazingQueryMode.default('map'),
}).strict();

export const defaultStargazingQueryData = stargazingQuerySchema.parse({});

export const StargazingListWithPagiSchema = z.object({
	list: z.union([z.array(stargazingItemDetail), z.array(stargazingItemBase)]),
	meta: paginationSchema,
});

export const updateStargazingDetailSchema = stargazingItemDetail.omit({
	stargazingNanoId: true,
}).strict();

export const createSinleStargazingSchema = z.object({
	stargazingTitle: baseStringSchema,
	stargazingAddress: strArticleSchema,
	stargazingLatitude: baseStringSchema,
	stargazingLongitude: baseStringSchema,
	stargazingImage: strArticleSchema,
	stargazingDescription: strArticleSchema,
}).strict();

export const mutationSinleStargazingSchema = createSinleStargazingSchema.extend({
	stargazingNanoId: nanoIdSchema,
}).strict();
