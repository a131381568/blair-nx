import { z } from 'zod';
import Big from 'big.js';
import type { PaginationDto } from '../../common/dto/pagi.dto';
// import type { NanoIdDto } from '../../common/dto/id.dto';
import { NanoIdSchema } from '../../common/dto/id.dto';
import { paginationDefaultData } from '../../common/dto/pagi.dto';

const bigSchema = z
	.string()
	.refine(val => !Number.isNaN(Number(val)), {
		message: 'Invalid decimal value',
	})
	.transform(val => new Big(val));

const stargazingItem = z.object({
	stargazingTitle: z.string().nullable(),
	stargazingLatitude: bigSchema.nullable(),
	stargazingLongitude: bigSchema.nullable(),
	stargazingImage: z.string().nullable(),
	stargazingDescription: z.string().nullable(),
	stargazingAddress: z.string().nullable(),
	stargazingNanoId: z.string().nullable(),
});

export const stargazingWithPagiDefaultData = {
	list: [],
	meta: paginationDefaultData,
};

export const stargazingQuerySchema = z.object({
	nid: NanoIdSchema.optional(),
	page: z.string().default('1'),
	limit: z.string().default('9'),
}).strict();

export const defaultStargazingQueryData = stargazingQuerySchema.parse({});

export type StargazingItemDto = z.infer<typeof stargazingItem>;
export interface StargazingListWithPagiDto {
	list: StargazingItemDto[];
	meta: PaginationDto;
};
export type StargazingQueryDto = z.infer<typeof stargazingQuerySchema>;
