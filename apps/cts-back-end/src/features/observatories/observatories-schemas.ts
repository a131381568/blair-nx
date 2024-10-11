import { z } from 'zod';

const observatoryItemBase = z.object({
	observatoryCategoryName: z.string().nullable(),
	observatoryCategoryId: z.string().nullable(),
	observatoryPostContent: z.string().nullable(),
});

const observatoryItemWithNanoId = observatoryItemBase.extend({
	observatoryNanoId: z.string(),
});

const observatoryItemDefaultSchema = z.object({
	observatoryCategoryName: z.string().nullable().default(''),
	observatoryCategoryId: z.string().nullable().default(''),
	observatoryPostContent: z.string().nullable().default(''),
});

export const updateObservatoryItemSchema = observatoryItemBase.strict();
export const getObservatoriesListBaseSchema = z.array(observatoryItemWithNanoId);
export const defaultObservatoryItemData: ObservatoryItemDefaultDto = observatoryItemDefaultSchema.parse({});

export type ObservatoryItemDto = z.infer<typeof observatoryItemBase>;
export type ObservatoriesListDto = z.infer<typeof getObservatoriesListBaseSchema>;
export type ObservatoryItemDefaultDto = z.infer<typeof observatoryItemDefaultSchema>;
export type UpdateObservatoryItemDto = z.infer<typeof updateObservatoryItemSchema>;
