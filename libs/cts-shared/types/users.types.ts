import { z } from 'zod';
import { accessTokenSchema, emailSchema, getTokenSchema, loginInputSchema, refreshTokenSchema, registerPayloadSchema, tokenGroupSchema, userBaseFitSchema, userBaseSchema } from '../schemas/users.schemas';

export type EmailDto = z.infer<typeof emailSchema>;
export type UserBaseDto = z.infer<typeof userBaseSchema>;
export type LoginInputDto = z.infer<typeof loginInputSchema>;
export type GetTokenDto = z.infer<typeof getTokenSchema>;
export type TokenGroupDto = z.infer<typeof tokenGroupSchema>;
export type RefreshTokenDto = z.infer<typeof refreshTokenSchema>;
export type AccessTokenDto = z.infer<typeof accessTokenSchema>;
export type userBaseFitDto = z.infer<typeof userBaseFitSchema>;
export type RegisterPayloadDto = z.infer<typeof registerPayloadSchema>;
