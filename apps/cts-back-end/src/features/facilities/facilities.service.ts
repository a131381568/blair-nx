import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { omit, tryit } from 'radash';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../shared/prisma.service';
import { ApiResponse, createApiResponse } from '../../core/interceptors/api-response';
import type { CreateFacilityItemDto, FacilityItemBaseDto, GetFacilitiesListBaseDto, UpdateFacilityItemDto } from './facilities-schemas';
import { createFacilityItemSchema, defaultFacilityItemBase, updateFacilityItemSchema } from './facilities-schemas';

@Injectable()
export class FacilitiesService {
	constructor(private prisma: PrismaService) {}

	async getFacilitiesList(): Promise<ApiResponse<GetFacilitiesListBaseDto>> {
		const [err, res] = await tryit(this.prisma.facilitiesList.findMany)({
			where: { published: true },
			take: 3,
		});

		if (err instanceof Prisma.PrismaClientKnownRequestError
			|| err instanceof Prisma.PrismaClientUnknownRequestError
			|| err instanceof Prisma.PrismaClientRustPanicError
			|| err instanceof Prisma.PrismaClientInitializationError
			|| err instanceof Prisma.PrismaClientValidationError
		) {
			return createApiResponse(false, [], err.message);
		}
		if (err)
			return createApiResponse(false, [], 'Unexpected error occurred');

		if (res && !res.length)
			return createApiResponse(false, [], 'FacilityList is empty');

		return createApiResponse(
			true,
			res.map(item => omit(item, ['published', 'facilitiesOrderId'])),
		);
	}

	async getFacilityItem(id: number): Promise<ApiResponse<FacilityItemBaseDto>> {
		const [err, res] = await tryit(this.prisma.facilitiesList.findFirst)({
			where: { facilitiesOrderId: id },
		});

		if (err instanceof Prisma.PrismaClientKnownRequestError
			|| err instanceof Prisma.PrismaClientUnknownRequestError
			|| err instanceof Prisma.PrismaClientRustPanicError
			|| err instanceof Prisma.PrismaClientInitializationError
			|| err instanceof Prisma.PrismaClientValidationError
		) {
			return createApiResponse(false, defaultFacilityItemBase, err.message);
		}

		if (err) {
			return createApiResponse(false, defaultFacilityItemBase, 'Unexpected error occurred');
		}

		if (!res)
			return createApiResponse(false, defaultFacilityItemBase, 'FacilityId not found or no changes made');

		return createApiResponse(true, omit(res, ['published', 'facilitiesOrderId']));
	}

	async updateFacilityItem(
		id: number,
		data: UpdateFacilityItemDto,
	): Promise<ApiResponse<UpdateFacilityItemDto>> {
		const { success, error: zodError, data: safeData } = updateFacilityItemSchema.safeParse(data);
		if (!success)
			return createApiResponse(false, data, `Validation error: ${zodError.errors[0].message}`);

		const [err, res] = await tryit(this.prisma.facilitiesList.updateMany)({
			where: { facilitiesOrderId: id },
			data: safeData,
		});

		if (err instanceof Prisma.PrismaClientKnownRequestError
			|| err instanceof Prisma.PrismaClientUnknownRequestError
			|| err instanceof Prisma.PrismaClientRustPanicError
			|| err instanceof Prisma.PrismaClientInitializationError
			|| err instanceof Prisma.PrismaClientValidationError
		) {
			return createApiResponse(false, data, err.message);
		}

		if (err)
			return createApiResponse(false, data, 'Unexpected error occurred');
		if (res && !res.count) {
			return createApiResponse(false, data, 'FacilityId not found or no changes made');
		}

		return createApiResponse(true, data, 'Update success');
	}

	async createFacilityItem(
		data: CreateFacilityItemDto,
	): Promise<ApiResponse<CreateFacilityItemDto>> {
		try {
			const validatedData = createFacilityItemSchema.parse(data);

			const [error] = await tryit(this.prisma.$transaction)(async (prisma) => {
				const lastFacility = await prisma.facilitiesList.findFirst({
					orderBy: { facilitiesOrderId: 'desc' },
					select: { facilitiesOrderId: true },
				});

				const nextFacilitiesOrderId = (lastFacility?.facilitiesOrderId ?? 0) + 1;

				const newItem = await prisma.facilitiesList.create({
					data: {
						...validatedData,
						published: true,
						facilitiesOrderId: nextFacilitiesOrderId,
					},
				});

				return omit(newItem, ['published', 'facilitiesOrderId']);
			});

			if (error)
				return createApiResponse(false, data, 'Create failure');
			return createApiResponse(true, data, 'Create success');
		}
		catch (error) {
			if (error instanceof z.ZodError) {
				return createApiResponse(false, data, 'Validation failed');
			}

			if (error instanceof Prisma.PrismaClientKnownRequestError
				|| error instanceof Prisma.PrismaClientUnknownRequestError
				|| error instanceof Prisma.PrismaClientRustPanicError
				|| error instanceof Prisma.PrismaClientInitializationError
				|| error instanceof Prisma.PrismaClientValidationError
			) {
				return createApiResponse(false, data, error.message);
			}

			return createApiResponse(false, data, 'Unexpected error occurred');
		}
	}

	async deleteFacilityItem(id: number): Promise<ApiResponse<{ id: number }>> {
		const indexVal = { facilitiesOrderId: id };
		const [error] = await tryit(this.prisma.facilitiesList.update)({
			where: indexVal,
			data: { published: false },
		});
		if (error)
			return createApiResponse(false, { id }, 'Delete failed');
		return createApiResponse(true, { id }, 'Delete success');
	}
}
