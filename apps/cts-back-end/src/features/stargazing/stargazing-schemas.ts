import { z } from 'zod';
import Big from 'big.js';
import type { PaginationDto } from '../../common/dto/pagi.dto';
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
	stargazingLatitude: bigSchema.nullable(),
	stargazingLongitude: bigSchema.nullable(),
	stargazingImage: z.string().nullable(),
	stargazingDescription: z.string().nullable(),
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

export type StargazingItemBaseDto = z.infer<typeof stargazingItemBase>;
export type StargazingListWithPagiDto = z.infer<typeof StargazingListWithPagiSchema>;
export type StargazingQueryDto = z.infer<typeof stargazingQuerySchema>;
export type StargazingItemDetailDto = z.infer<typeof stargazingItemDetail>;
