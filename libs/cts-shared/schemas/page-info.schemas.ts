import { z } from 'zod';
import { nanoIdSchema } from '../dto/id.dto';

export const pageItemBaseObject = z.object({
	pageTitle: z.string().nullable(),
	subPageTitle: z.string().nullable(),
	pageRoute: z.string().nullable(),
});

export const pageItemBase = pageItemBaseObject.extend({
	pageNanoId: nanoIdSchema,
});

export const updatePageItemSchema = pageItemBaseObject.strict();

export const getPageListBaseSchema = z.array(pageItemBase);
