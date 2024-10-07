import { z } from 'zod';

export const getAboutInfoSchema = z.object({
	aboutId: z.number(),
	visual: z.string(),
	slogan: z.string(),
	philosophy: z.string(),
	quote: z.string(),
	epilogue: z.string(),
});

export const updateAboutInfoSchema = z.object({
	visual: z.string().optional(),
	slogan: z.string().optional(),
	philosophy: z.string().optional(),
	quote: z.string().optional(),
	epilogue: z.string().optional(),
}).strict();

export type GetAboutInfoDto = z.infer<typeof getAboutInfoSchema>;
export type UpdateAboutInfoDto = z.infer<typeof updateAboutInfoSchema>;
