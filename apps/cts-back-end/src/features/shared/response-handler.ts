import type { ZodSchema } from 'zod';
import { get, isArray } from 'radash';
import { Prisma } from '@prisma/client';
import type { NanoIdDto } from '@cts-shared';
import { createApiResponse, nanoIdSchema } from '@cts-shared';
import { PrismaErrorSchema } from '../shared/prisma-schemas';

export const ErrorAdditional = (defaultRes: unknown = null) => {
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		const originalMethod = descriptor.value;

		descriptor.value = async function (...args: any[]) {
			try {
				const response = await originalMethod.apply(this, args);
				return response;
			}
			catch (error) {
				if (process.env.IS_DEBUG)
					throw error;

				if (PrismaErrorSchema.safeParse(error).success) {
					let errorMsg = 'Database error';
					if (error instanceof Prisma.PrismaClientKnownRequestError)
						errorMsg = get(error.meta, 'cause', 'ClientKnownRequestError');
					return createApiResponse(false, defaultRes, errorMsg);
				}

				return createApiResponse(false, defaultRes, 'Unexpected error occurred');
			}
		};

		return descriptor;
	};
};

export const ValidationAdditional = (dataSchema: ZodSchema | null = null): MethodDecorator => {
	return (target, propertyKey, descriptor: PropertyDescriptor) => {
		const originalMethod = descriptor.value;

		descriptor.value = async function (...args: any[]) {
			let idZodSuccess = false;
			let idZodMsg = '';
			let dataZodSuccess = false;
			let dataZodMsg = '';
			const { id, data }: { id: NanoIdDto; data: any } = args[0];

			if (id) {
				const ParsedId = nanoIdSchema.safeParse(id);
				idZodSuccess = ParsedId.success;
				if (ParsedId.error?.errors && isArray(ParsedId.error.errors))
					idZodMsg = String(ParsedId.error?.errors[0].message);
			}

			if (dataSchema && data) {
				const ParsedData = dataSchema.safeParse(data);
				dataZodSuccess = ParsedData.success;
				if (ParsedData.error?.errors && isArray(ParsedData.error.errors))
					dataZodMsg = ParsedData.error.errors.map(e => e.message).join(', ');
			}

			if ((!dataZodSuccess && data) || (!idZodSuccess && id))
				return createApiResponse(false, null, `Validation error: ${[idZodMsg, dataZodMsg].join('; ')}`);

			return await originalMethod.apply(this, args);
		};

		return descriptor as TypedPropertyDescriptor<any>;
	};
};
