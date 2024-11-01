import { z } from 'zod';

import { strArticleSchema } from '../dto/string.dto';

export const aboutInfoBaseSchema = z.object({
	visual: strArticleSchema.nullable(),
	slogan: strArticleSchema.nullable(),
	philosophy: strArticleSchema.nullable(),
	quote: strArticleSchema.nullable(),
	epilogue: strArticleSchema.nullable(),
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

export const defaultAboutInfoData = getAboutInfoDefaultSchema.parse({});
