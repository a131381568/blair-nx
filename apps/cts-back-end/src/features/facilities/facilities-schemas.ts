import { z } from 'zod';

const facilityItemBase = z.object({
	facilitiesTitle: z.string().nullable().default(''),
	facilitiesDescription: z.string().nullable().default(''),
	facilitiesImage: z.string().nullable().default(''),
	facilitiesLink: z.string().nullable().default(''),
});

export const getFacilityItemFullSchema = facilityItemBase.extend({
	facilitiesOrderId: z.number(),
	published: z.boolean().nullable(),
});

export const defaultFacilityItemBase: FacilityItemBaseDto = facilityItemBase.parse({});

export const getFacilitiesListSchema = z.array(getFacilityItemFullSchema);
export const getFacilitiesListBaseSchema = z.array(facilityItemBase);

export const updateFacilityItemSchema = facilityItemBase.partial().extend({
	facilitiesOrderId: z.number().optional(),
}).strict();

export const createFacilityItemSchema = z.object({
	facilitiesTitle: z.string().nullable(),
	facilitiesDescription: z.string().nullable(),
	facilitiesImage: z.string().nullable(),
	facilitiesLink: z.string().nullable(),
}).strict();

export type FacilityItemBaseDto = z.infer<typeof facilityItemBase>;
export type UpdateFacilityItemDto = z.infer<typeof updateFacilityItemSchema>;
export type GetFacilitiesListBaseDto = z.infer<typeof getFacilitiesListBaseSchema>;
export type CreateFacilityItemDto = z.infer<typeof createFacilityItemSchema>;

export type GetFacilityItemFullDto = z.infer<typeof getFacilityItemFullSchema>;
export type GetFacilitiesListDto = z.infer<typeof getFacilitiesListSchema>;
