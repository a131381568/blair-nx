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

export type IntIdDto = z.infer<typeof IntIdSchema>;
