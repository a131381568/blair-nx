import { z } from 'zod';

const pageItemBase = z.object({
	pageTitle: z.string().nullable(),
	subPageTitle: z.string().nullable(),
	pageRoute: z.string().nullable(),
});

export const getPageListBaseSchema = z.array(pageItemBase);

export type PageItemDto = z.infer<typeof pageItemBase>;
export type PageListDto = z.infer<typeof getPageListBaseSchema>;
