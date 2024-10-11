import { z } from 'zod';

const observatoryItemBase = z.object({
	observatoryCategoryName: z.string().nullable(),
	observatoryCategoryId: z.string().nullable(),
	observatoryPostContent: z.string().nullable(),
});

// const observatoryItemWithOrderId = observatoryItemBase.extend({
// 	observatoryOrderId: z.number().nullable(),
// });

const observatoryItemDefaultSchema = z.object({
	// observatoryOrderId: z.number().nullable().default(null),
	observatoryCategoryName: z.string().nullable().default(''),
	observatoryCategoryId: z.string().nullable().default(''),
	observatoryPostContent: z.string().nullable().default(''),
});

export const updateObservatoryItemSchema = observatoryItemBase.strict();
export const getObservatoriesListBaseSchema = z.array(observatoryItemBase);
export const defaultObservatoryItemData: ObservatoryItemDefaultDto = observatoryItemDefaultSchema.parse({});

export type ObservatoryItemDto = z.infer<typeof observatoryItemBase>;
export type ObservatoriesListDto = z.infer<typeof getObservatoriesListBaseSchema>;
export type ObservatoryItemDefaultDto = z.infer<typeof observatoryItemDefaultSchema>;
export type UpdateObservatoryItemDto = z.infer<typeof updateObservatoryItemSchema>;
