import { z } from 'zod';

// del & put res
export const updateFacilityResponseSchema = z.object({
	success: z.boolean(),
	payload: z.any(),
	message: z.string(),
});

export type UpdateResponsetDto = z.infer<typeof updateFacilityResponseSchema>;
