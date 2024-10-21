import { z } from 'zod';

export const IntIdSchema = z
	.union([
		z.string().regex(/^(?!00000)\d{1,5}$/, 'Id must be a number between 1 to 5 digits'),
		z.number().int().min(1).max(99999),
	])
	.transform((val) => {
		if (typeof val === 'string') {
			return Number.parseInt(val, 10);
		}
		return val;
	});

export const StrIdSchema = z.string().min(1).max(15);
export const NanoIdSchema = z.string().length(10);

export type IntIdDto = z.infer<typeof IntIdSchema>;
export type StrIdDto = z.infer<typeof StrIdSchema>;
export type NanoIdDto = z.infer<typeof NanoIdSchema>;
