import { z } from 'zod';

const aboutInfoBaseSchema = z.object({
	visual: z.string().nullable(),
	slogan: z.string().nullable(),
	philosophy: z.string().nullable(),
	quote: z.string().nullable(),
	epilogue: z.string().nullable(),
});

export const getAboutInfoSchema = aboutInfoBaseSchema.extend({
	aboutId: z.number().nullable(),
});

export const updateAboutInfoSchema = aboutInfoBaseSchema.partial().strict();

export type GetAboutInfoDto = z.infer<typeof getAboutInfoSchema>;
export type UpdateAboutInfoDto = z.infer<typeof updateAboutInfoSchema>;
