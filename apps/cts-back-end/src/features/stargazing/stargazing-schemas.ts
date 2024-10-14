import { z } from 'zod';
import Big from 'big.js';
import { paginationDefaultData, paginationSchema } from '../../common/dto/pagi.dto';
import { NanoIdSchema } from '../../common/dto/id.dto';

const bigSchema = z
	.string()
	.refine(val => !Number.isNaN(Number(val)), {
		message: 'Invalid decimal value',
	})
	.transform(val => new Big(val));

const stargazingItemBase = z.object({
	stargazingTitle: z.string().nullable(),
	stargazingAddress: z.string().nullable(),
	stargazingNanoId: z.string().nullable(),
});

const stargazingItemDetail = stargazingItemBase.extend({
	stargazingLatitude: z.union([z.string(), bigSchema]).default(''),
	stargazingLongitude: z.union([z.string(), bigSchema]).default(''),
	stargazingImage: z.string().nullable(),
	stargazingDescription: z.string().nullable(),
});

export const defaultStargazingItemDetail = stargazingItemDetail.parse({
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

export const stargazingQuerySchema = z.object({
	nid: NanoIdSchema.optional(),
	page: z.string().default('1'),
	limit: z.string().default('10'),
	mode: z.union([z.literal('map'), z.literal('list')]).default('map'),
}).strict();

export const defaultStargazingQueryData = stargazingQuerySchema.parse({});

export const StargazingListWithPagiSchema = z.object({
	list: z.union([z.array(stargazingItemDetail), z.array(stargazingItemBase)]),
	meta: paginationSchema,
});

export const updateStargazingDetailSchema = stargazingItemDetail.omit({
	stargazingNanoId: true,
}).strict();

export type StargazingItemBaseDto = z.infer<typeof stargazingItemBase>;
export type StargazingListWithPagiDto = z.infer<typeof StargazingListWithPagiSchema>;
export type StargazingQueryDto = z.infer<typeof stargazingQuerySchema>;
export type StargazingItemDetailDto = z.infer<typeof stargazingItemDetail>;
export type UpdateStargazingDetailDto = z.infer<typeof updateStargazingDetailSchema>;
