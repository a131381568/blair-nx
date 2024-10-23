import { z } from 'zod';
import { nanoIdSchema } from '../dto/id.dto';

const emailBase = z.string().email().min(6).max(20);
const passBase = z.string().min(6).max(20);
const namesBase = z.string().min(3).max(20);

const authBase = z.object({
	email: emailBase,
	password: passBase,
});

const userBase = z.object({
	email: emailBase.nullable(),
	password: passBase.nullable(),
	nanoId: nanoIdSchema,
	name: namesBase.nullable(),
});

export const userBaseFitSchema = userBase.omit({ password: true });

export const tokenGroupSchema = z.object({
	accessToken: z.string().min(20, 'Access Token must be at least 20 characters long'),
	refreshToken: z.string().min(20, 'Refresh Token must be at least 20 characters long'),
});

export const refreshTokenSchema = tokenGroupSchema.pick({ refreshToken: true }).strict();
export const accessTokenSchema = tokenGroupSchema.pick({ accessToken: true }).strict();

export const loginInputSchema = authBase.strict();

export const getTokenSchema = userBase.pick({
	email: true,
	nanoId: true,
}).strict();

export const emailSchema = authBase.pick({ email: true }).strict();
export const passSchema = authBase.pick({ password: true }).strict();
export const userBaseSchema = userBase.nullable();

export const validateUserResSchema = z.object({
	userInfo: userBaseSchema,
	msg: z.string(),
});

export const registerPayloadSchema = authBase.extend({
	name: namesBase,
}).strict();
