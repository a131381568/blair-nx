import { z } from 'zod';
import { nanoIdSchema } from '../dto/id.dto';
import { baseStringSchema, strArticleSchema, strIdSchema } from '../dto/string.dto';

export const pageItemBaseObject = z.object({
	pageTitle: baseStringSchema.nullable(),
	subPageTitle: strArticleSchema.nullable(),
	pageRoute: strIdSchema.nullable(),
});

export const pageItemBase = pageItemBaseObject.extend({
	pageNanoId: nanoIdSchema,
});

export const updatePageItemSchema = z.object({
	pageTitle: baseStringSchema,
	subPageTitle: strArticleSchema,
	pageRoute: strIdSchema,
}).strict();

export const mutationPageItemSchema = updatePageItemSchema.extend({
	pageNanoId: nanoIdSchema,
});

export const getPageListBaseSchema = z.array(pageItemBase);
