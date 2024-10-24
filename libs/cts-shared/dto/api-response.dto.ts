import { z } from 'zod';

export const apiResponseSchema = z.object({
	success: z.boolean(),
	data: z.unknown(),
	message: z.string().optional(),
});

export type ApiResponse<T> = z.infer<typeof apiResponseSchema> & { data: T };

export const createApiResponse = <T>(
	success: boolean,
	data: T,
	message?: string,
): ApiResponse<T> => ({
	success,
	data,
	message,
});
