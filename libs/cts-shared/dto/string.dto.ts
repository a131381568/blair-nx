import { z } from 'zod';

export const LIMIT_MIN_LENGTH = 1;
export const COMMON_STR_MIN_LENGTH = 3;
export const COMMON_ID_MAX_LENGTH = 20;
export const ARTICLE_MAX_LENGTH = 2000;

export const keyWordSchema = z.string()
	.min(LIMIT_MIN_LENGTH, { message: `至少需要 ${LIMIT_MIN_LENGTH} 個字元` })
	.max(COMMON_ID_MAX_LENGTH, { message: `不能超過 ${COMMON_ID_MAX_LENGTH} 個字元` });

export const baseStringSchema = z.string()
	.min(COMMON_STR_MIN_LENGTH, { message: `至少需要 ${COMMON_STR_MIN_LENGTH} 個字元` })
	.max(COMMON_ID_MAX_LENGTH, { message: `不能超過 ${COMMON_ID_MAX_LENGTH} 個字元` });

export const strIdSchema = baseStringSchema.regex(/^[A-Z]+$/i, { message: '只能輸入英文' });

export const strArticleSchema = z.string()
	.min(COMMON_STR_MIN_LENGTH, { message: `至少需要 ${COMMON_STR_MIN_LENGTH} 個字元` })
	.max(ARTICLE_MAX_LENGTH, { message: `不能超過 ${ARTICLE_MAX_LENGTH} 個字元` });

export type StrIdDto = z.infer<typeof strIdSchema>;
export type StrArticleDto = z.infer<typeof strArticleSchema>;
