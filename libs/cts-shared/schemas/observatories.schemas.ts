import { z } from 'zod';
import { nanoIdSchema } from '../dto/id.dto';
import { baseStringSchema, strArticleSchema, strIdSchema } from '../dto/string.dto';

export const observatoryItemBase = z.object({
	observatoryCategoryName: z.string().nullable(),
	observatoryCategoryId: z.string().nullable(),
	observatoryPostContent: z.string().nullable(),
});

export const observatoryItemWithNanoId = observatoryItemBase.extend({
	observatoryNanoId: nanoIdSchema,
});

export const observatoryItemDefaultSchema = z.object({
	observatoryCategoryName: z.string().nullable().default(''),
	observatoryCategoryId: z.string().nullable().default(''),
	observatoryPostContent: z.string().nullable().default(''),
});

export const updateObservatoryItemSchema = z.object({
	observatoryCategoryName: baseStringSchema,
	observatoryCategoryId: strIdSchema,
	observatoryPostContent: strArticleSchema,
}).strict();

export const mutationObservatoryItemSchema = updateObservatoryItemSchema.extend({
	observatoryNanoId: nanoIdSchema,
}).strict();

export const getObservatoriesListBaseSchema = z.array(observatoryItemWithNanoId);
export const defaultObservatoryItemData = observatoryItemDefaultSchema.parse({});
