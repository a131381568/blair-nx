import { z } from 'zod';
import { createFacilityItemFinishSchema, createFacilityItemSchema, facilityItemBase, getFacilitiesListBaseSchema, getFacilitiesListSchema, getFacilityItemFullSchema, updateFacilityItemSchema } from '../schemas/facilities.schemas';

export type FacilityItemBaseDto = z.infer<typeof facilityItemBase>;
export type UpdateFacilityItemDto = z.infer<typeof updateFacilityItemSchema>;
export type GetFacilitiesListBaseDto = z.infer<typeof getFacilitiesListBaseSchema>;
export type CreateFacilityItemDto = z.infer<typeof createFacilityItemSchema>;
export type CreateFacilityItemFinishDto = z.infer<typeof createFacilityItemFinishSchema>;

export type GetFacilityItemFullDto = z.infer<typeof getFacilityItemFullSchema>;
export type GetFacilitiesListDto = z.infer<typeof getFacilitiesListSchema>;
