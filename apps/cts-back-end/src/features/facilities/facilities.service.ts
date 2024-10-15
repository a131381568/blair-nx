import { Injectable } from '@nestjs/common';
import { omit, tryit } from 'radash';
import { ApiResponse, createApiResponse } from '../../core/interceptors/api-response';
import { StrIdDto, StrIdSchema } from '../../common/dto/id.dto';
import { PrismaErrorSchema } from '../shared/prisma-schemas';
import { ExtendedPrismaClient, InjectPrismaClient } from '../shared/prisma.extension';
import type { CreateFacilityItemDto, FacilityItemBaseDto, GetFacilitiesListBaseDto, UpdateFacilityItemDto } from './facilities-schemas';
import { createFacilityItemSchema, defaultFacilityItemBase, updateFacilityItemSchema } from './facilities-schemas';

@Injectable()
export class FacilitiesService {
	constructor(
		@InjectPrismaClient()
		private readonly prisma: ExtendedPrismaClient,
	) {}

	async getFacilitiesList(): Promise<ApiResponse<GetFacilitiesListBaseDto>> {
		const [err, res] = await tryit(this.prisma.facilitiesList.findMany)({
			where: { published: true },
			take: 3,
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, [], 'Database error');
		if (err)
			return createApiResponse(false, [], 'Unexpected error occurred');
		if (res && !res.length)
			return createApiResponse(false, [], 'FacilityList is empty');

		return createApiResponse(
			true,
			res.map(item => omit(item, ['published', 'facilitiesOrderId'])),
		);
	}

	async getFacilityItem(id: StrIdDto): Promise<ApiResponse<FacilityItemBaseDto>> {
		const { success: zodSuccess, error: zodErr, data: safeId } = StrIdSchema.safeParse(id);

		if (!zodSuccess)
			return createApiResponse(false, defaultFacilityItemBase, `Validation error: ${zodErr.errors[0].message}`);

		const [err, res] = await tryit(this.prisma.facilitiesList.findFirst)({
			where: {
				facilitiesNanoId: safeId,
				published: true,
			},
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, defaultFacilityItemBase, 'Database error');
		if (err)
			return createApiResponse(false, defaultFacilityItemBase, 'Unexpected error occurred');
		if (!res)
			return createApiResponse(false, defaultFacilityItemBase, 'FacilityId not found or no changes made');

		return createApiResponse(true, omit(res, ['published', 'facilitiesOrderId']));
	}

	async updateFacilityItem(
		id: StrIdDto,
		data: UpdateFacilityItemDto,
	): Promise<ApiResponse<null>> {
		const { success: idZodSuccess, error: idZodErr, data: safeId } = StrIdSchema.safeParse(id);
		const { success: dataZodSuccess, error: dataZodErr, data: safeData } = updateFacilityItemSchema.safeParse(data);

		if (!dataZodSuccess || !idZodSuccess)
			return createApiResponse(false, null, `Validation error: ${[dataZodErr?.errors[0].message, idZodErr?.errors[0].message].join('. ')}`);

		const [err, res] = await tryit(this.prisma.facilitiesList.updateMany)({
			where: { facilitiesNanoId: safeId },
			data: safeData,
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, null, 'Database error');
		if (err)
			return createApiResponse(false, null, 'Unexpected error occurred');
		if (res && !res.count)
			return createApiResponse(false, null, 'FacilityId not found or no changes made');

		return createApiResponse(true, null, 'Update success');
	}

	async createFacilityItem(
		data: CreateFacilityItemDto,
	): Promise<ApiResponse<null>> {
		const { success: zodSuccess, error: zodErr, data: safeData } = createFacilityItemSchema.safeParse(data);

		if (!zodSuccess)
			return createApiResponse(false, null, `Validation error: ${zodErr.errors[0].message}`);

		return this.prisma.$transaction(async (prisma) => {
			const [err] = await tryit(prisma.facilitiesList.create)({
				data: { ...safeData, published: true },
			});

			if (err && PrismaErrorSchema.safeParse(err).success)
				return createApiResponse(false, null, 'Database error');
			if (err)
				return createApiResponse(false, null, 'Unexpected error occurred');

			return createApiResponse(true, null, 'Create success');
		});
	}

	async deleteFacilityItem(id: StrIdDto): Promise<ApiResponse<null>> {
		const { success: zodSuccess, error: zodErr, data: safeId } = StrIdSchema.safeParse(id);

		if (!zodSuccess)
			return createApiResponse(false, null, `Validation error: ${zodErr.errors[0].message}`);

		return this.prisma.$transaction(async (prisma) => {
			const [err, res] = await tryit(prisma.facilitiesList.updateMany)({
				where: { facilitiesNanoId: safeId },
				data: { published: false },
			});

			if (err && PrismaErrorSchema.safeParse(err).success)
				return createApiResponse(false, null, 'Database error');
			if (err)
				return createApiResponse(false, null, 'Unexpected error occurred');
			if (res && !res.count)
				return createApiResponse(false, null, 'FacilityId not found or no changes made');

			return createApiResponse(true, null, 'Delete success');
		});
	}
}
