import { z } from 'zod';

export const createUserSchema = z.object({
	name: z.string(),
	email: z.string().email(),
});

export const updateUserSchema = z.object({
	name: z.string().optional(),
}).strict();

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
