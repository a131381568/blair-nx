import { z } from 'zod';
import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';

export const PrismaErrorSchema = z.union([
	z.instanceof(PrismaClientKnownRequestError),
	z.instanceof(PrismaClientUnknownRequestError),
	z.instanceof(PrismaClientRustPanicError),
	z.instanceof(PrismaClientInitializationError),
	z.instanceof(PrismaClientValidationError),
]);

export type PrismaErrorDto = z.infer<typeof PrismaErrorSchema>;
