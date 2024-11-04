import { z } from 'zod';
import { nanoIdSchema } from '../dto/id.dto';
import { baseStringSchema, strArticleSchema } from '../dto/string.dto';

export const facilityItemWithNanoId = z.object({
	facilitiesTitle: baseStringSchema.nullable().default(''),
	facilitiesDescription: strArticleSchema.nullable().default(''),
	facilitiesImage: strArticleSchema.nullable().default(''),
	facilitiesLink: strArticleSchema.nullable().default(''),
	facilitiesNanoId: nanoIdSchema.default(''),
});

export const facilityItemBase = z.object({
	facilitiesTitle: z.string().nullable().default(''),
	facilitiesDescription: z.string().nullable().default(''),
	facilitiesImage: z.string().nullable().default(''),
	facilitiesLink: z.string().nullable().default(''),
});

export const getFacilityItemFullSchema = facilityItemBase.extend({
	facilitiesOrderId: z.number(),
	published: z.boolean().nullable(),
});

export const defaultFacilityItemBase = facilityItemBase.parse({});

export const getFacilitiesListSchema = z.array(getFacilityItemFullSchema);
export const getFacilitiesListBaseSchema = z.array(facilityItemBase);
export const getFacilitiesListBaseWithNanoIdSchema = z.array(facilityItemWithNanoId);

export const updateFacilityItemSchema = facilityItemBase.partial().extend({
	facilitiesOrderId: z.number().optional(),
}).strict();

export const createFacilityItemSchema = z.object({
	facilitiesTitle: z.string().nullable(),
	facilitiesDescription: z.string().nullable(),
	facilitiesImage: z.string().nullable(),
	facilitiesLink: z.string().nullable(),
}).strict();

export const createFacilityItemFinishSchema = createFacilityItemSchema.extend({
	facilitiesOrderId: z.number(),
});
