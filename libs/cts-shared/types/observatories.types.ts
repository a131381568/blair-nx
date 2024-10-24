import { z } from 'zod';
import { getObservatoriesListBaseSchema, observatoryItemBase, observatoryItemDefaultSchema, updateObservatoryItemSchema } from '../schemas/observatories.schemas';

export type ObservatoryItemDto = z.infer<typeof observatoryItemBase>;
export type ObservatoriesListDto = z.infer<typeof getObservatoriesListBaseSchema>;
export type ObservatoryItemDefaultDto = z.infer<typeof observatoryItemDefaultSchema>;
export type UpdateObservatoryItemDto = z.infer<typeof updateObservatoryItemSchema>;
