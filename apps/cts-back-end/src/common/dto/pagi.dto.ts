import { z } from 'zod';

export const paginationSchema = z.object({
	isFirstPage: z.boolean().default(false),
	isLastPage: z.boolean().default(false),
	currentPage: z.number().default(0),
	previousPage: z.number().nullable().default(null),
	nextPage: z.number().nullable().default(null),
	pageCount: z.number().default(0),
	totalCount: z.number().default(0),
});

export const paginationDefaultData = paginationSchema.parse({});

export type PaginationDto = z.infer<typeof paginationSchema>;
