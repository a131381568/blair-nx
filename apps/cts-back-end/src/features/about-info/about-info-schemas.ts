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

export const getAboutInfoDefaultSchema = z.object({
	visual: z.string().default(''),
	slogan: z.string().default(''),
	philosophy: z.string().default(''),
	quote: z.string().default(''),
	epilogue: z.string().default(''),
});

export const defaultAboutInfoData: GetAboutInfoDefaultDto = getAboutInfoDefaultSchema.parse({});

export type GetAboutInfoBaseDto = z.infer<typeof aboutInfoBaseSchema>;
export type GetAboutInfoDto = z.infer<typeof getAboutInfoSchema>;
export type UpdateAboutInfoDto = z.infer<typeof updateAboutInfoSchema>;
export type GetAboutInfoDefaultDto = z.infer<typeof getAboutInfoDefaultSchema>;
