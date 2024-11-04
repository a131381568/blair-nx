import { z } from 'zod';
import { createFacilityItemFinishSchema, createFacilityItemSchema, facilityItemBase, facilityItemWithNanoId, getFacilitiesListBaseSchema, getFacilitiesListBaseWithNanoIdSchema, getFacilitiesListSchema, getFacilityItemFullSchema, updateFacilityItemSchema } from '../schemas/facilities.schemas';

export type FacilityItemBaseDto = z.infer<typeof facilityItemBase>;
export type UpdateFacilityItemDto = z.infer<typeof updateFacilityItemSchema>;
export type GetFacilitiesListBaseDto = z.infer<typeof getFacilitiesListBaseSchema>;
export type CreateFacilityItemDto = z.infer<typeof createFacilityItemSchema>;
export type CreateFacilityItemFinishDto = z.infer<typeof createFacilityItemFinishSchema>;
export type FacilityItemWithNanoIdDto = z.infer<typeof facilityItemWithNanoId>;

export type GetFacilityItemFullDto = z.infer<typeof getFacilityItemFullSchema>;
export type GetFacilitiesListDto = z.infer<typeof getFacilitiesListSchema>;
export type GetFacilitiesListBaseWithNanoIdDto = z.infer<typeof getFacilitiesListBaseWithNanoIdSchema>;
