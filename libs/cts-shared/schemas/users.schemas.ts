import { z } from 'zod';
import { nanoIdSchema } from '../dto/id.dto';

export const LOGIN_INPUT_MAX_LENGTH = 20;

const emailBase = z.string().email({ message: '請提供有效的 email' }).min(6, { message: '至少需要 6 個字元' }).max(LOGIN_INPUT_MAX_LENGTH, { message: `email 不能超過 ${LOGIN_INPUT_MAX_LENGTH} 個字元` });
const passBase = z.string().min(6, { message: '至少需要 6 個字元' }).max(LOGIN_INPUT_MAX_LENGTH, { message: `不能超過 ${LOGIN_INPUT_MAX_LENGTH} 個字元` });
const namesBase = z.string().min(3, { message: '至少需要 3 個字元' }).max(LOGIN_INPUT_MAX_LENGTH, { message: `不能超過 ${LOGIN_INPUT_MAX_LENGTH} 個字元` });

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
	accessToken: z.string().min(20, 'Access Token 必須為 20 個字元'),
	refreshToken: z.string().min(20, 'Refresh Token 必須為 20 個字元'),
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
