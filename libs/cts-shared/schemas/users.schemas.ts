import { z } from 'zod';
import { nanoIdSchema } from '../dto/id.dto';
import { COMMON_ID_MAX_LENGTH, strIdSchema } from '../dto/string.dto';

const LOGIN_MIN_INPUT_LENGTH = 6;
const JWT_LENGTH = 191;

const emailBase = z.string().email({ message: '請提供有效的 email' })
	.min(LOGIN_MIN_INPUT_LENGTH, { message: `至少需要 ${LOGIN_MIN_INPUT_LENGTH} 個字元` })
	.max(COMMON_ID_MAX_LENGTH, { message: `email 不能超過 ${COMMON_ID_MAX_LENGTH} 個字元` });
const passBase = z.string()
	.min(LOGIN_MIN_INPUT_LENGTH, { message: `至少需要 ${LOGIN_MIN_INPUT_LENGTH} 個字元` })
	.max(COMMON_ID_MAX_LENGTH, { message: `不能超過 ${COMMON_ID_MAX_LENGTH} 個字元` });
const namesBase = strIdSchema;

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
	accessToken: z.string().length(JWT_LENGTH, `Access Token 必須為 ${JWT_LENGTH} 個字元`),
	refreshToken: z.string().length(JWT_LENGTH, `Refresh Token 必須為 ${JWT_LENGTH} 個字元`),
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
