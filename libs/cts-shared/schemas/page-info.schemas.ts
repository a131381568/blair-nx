import { z } from 'zod';

export const pageItemBase = z.object({
	pageTitle: z.string().nullable(),
	subPageTitle: z.string().nullable(),
	pageRoute: z.string().nullable(),
});

export const getPageListBaseSchema = z.array(pageItemBase);
