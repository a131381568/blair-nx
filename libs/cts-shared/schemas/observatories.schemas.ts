import { z } from 'zod';

export const observatoryItemBase = z.object({
	observatoryCategoryName: z.string().nullable(),
	observatoryCategoryId: z.string().nullable(),
	observatoryPostContent: z.string().nullable(),
});

const observatoryItemWithNanoId = observatoryItemBase.extend({
	observatoryNanoId: z.string(),
});

export const observatoryItemDefaultSchema = z.object({
	observatoryCategoryName: z.string().nullable().default(''),
	observatoryCategoryId: z.string().nullable().default(''),
	observatoryPostContent: z.string().nullable().default(''),
});

export const updateObservatoryItemSchema = observatoryItemBase.strict();
export const getObservatoriesListBaseSchema = z.array(observatoryItemWithNanoId);
export const defaultObservatoryItemData = observatoryItemDefaultSchema.parse({});
