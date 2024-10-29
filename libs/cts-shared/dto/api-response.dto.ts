import { z } from 'zod';

export const systemErrorSchema = z.object({
	code: z.number().int().min(100).max(600),
	name: z.string(),
	timestamp: z.string().refine(val => !Number.isNaN(Date.parse(val)), {
		message: '須為時間戳記格式', // Invalid timestamp format
	}),
});

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

export type SystemErrorDto = z.infer<typeof systemErrorSchema>;
