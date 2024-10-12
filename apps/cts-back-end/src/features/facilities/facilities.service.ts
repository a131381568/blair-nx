import { Injectable } from '@nestjs/common';
import { omit, tryit } from 'radash';
import { PrismaService } from 'nestjs-prisma';
import { ApiResponse, createApiResponse } from '../../core/interceptors/api-response';
import { IntIdDto, IntIdSchema } from '../../common/dto/id.dto';
import { PrismaErrorSchema } from '../shared/prisma-schemas';
import type { CreateFacilityItemDto, CreateFacilityItemFinishDto, FacilityItemBaseDto, GetFacilitiesListBaseDto, GetFacilitiesListDto, UpdateFacilityItemDto } from './facilities-schemas';
import { createFacilityItemSchema, defaultFacilityItemBase, updateFacilityItemSchema } from './facilities-schemas';

@Injectable()
export class FacilitiesService {
	constructor(private prisma: PrismaService) {}

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

	async getFacilityItem(id: IntIdDto): Promise<ApiResponse<FacilityItemBaseDto>> {
		const { success: zodSuccess, error: zodErr, data: safeId } = IntIdSchema.safeParse(id);

		if (!zodSuccess)
			return createApiResponse(false, defaultFacilityItemBase, `Validation error: ${zodErr.errors[0].message}`);

		const [err, res] = await tryit(this.prisma.facilitiesList.findFirst)({
			where: {
				facilitiesOrderId: Number(safeId),
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
		id: IntIdDto,
		data: UpdateFacilityItemDto,
	): Promise<ApiResponse<UpdateFacilityItemDto>> {
		const { success: idZodSuccess, error: idZodErr, data: safeId } = IntIdSchema.safeParse(id);
		const { success: dataZodSuccess, error: dataZodErr, data: safeData } = updateFacilityItemSchema.safeParse(data);

		if (!dataZodSuccess || !idZodSuccess)
			return createApiResponse(false, data, `Validation error: ${[dataZodErr?.errors[0].message, idZodErr?.errors[0].message].join('. ')}`);

		const [err, res] = await tryit(this.prisma.facilitiesList.updateMany)({
			where: { facilitiesOrderId: Number(safeId) },
			data: safeData,
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, data, 'Database error');
		if (err)
			return createApiResponse(false, data, 'Unexpected error occurred');
		if (res && !res.count)
			return createApiResponse(false, data, 'FacilityId not found or no changes made');

		return createApiResponse(true, data, 'Update success');
	}

	async createFacilityItem(
		data: CreateFacilityItemDto,
	): Promise<ApiResponse<CreateFacilityItemFinishDto>> {
		const { success: zodSuccess, error: zodErr, data: safeData } = createFacilityItemSchema.safeParse(data);

		if (!zodSuccess)
			return createApiResponse(false, { ...data, facilitiesOrderId: 0 }, `Validation error: ${zodErr.errors[0].message}`);

		return this.prisma.$transaction(async (prisma) => {
			const lastFacility = await prisma.facilitiesList.findFirst({
				orderBy: { facilitiesOrderId: 'desc' },
				select: { facilitiesOrderId: true },
			});

			const nextFacilitiesOrderId = (lastFacility?.facilitiesOrderId ?? 0) + 1;

			const [err, res] = await tryit(prisma.facilitiesList.create)({
				data: {
					...safeData,
					published: true,
					facilitiesOrderId: nextFacilitiesOrderId,
				},
			});

			if (err && PrismaErrorSchema.safeParse(err).success)
				return createApiResponse(false, { ...safeData, facilitiesOrderId: 0 }, 'Database error');
			if (err)
				return createApiResponse(false, { ...safeData, facilitiesOrderId: 0 }, 'Unexpected error occurred');

			return createApiResponse(true, omit(res, ['published']), 'Create success');
		});
	}

	async deleteFacilityItem(id: IntIdDto): Promise<ApiResponse<{ id: IntIdDto }>> {
		const { success: zodSuccess, error: zodErr, data: safeId } = IntIdSchema.safeParse(id);

		if (!zodSuccess)
			return createApiResponse(false, { id }, `Validation error: ${zodErr.errors[0].message}`);

		return this.prisma.$transaction(async (prisma) => {
			const [err, res] = await tryit(prisma.facilitiesList.updateMany)({
				where: { facilitiesOrderId: Number(safeId) },
				data: { published: false },
			});

			if (err && PrismaErrorSchema.safeParse(err).success)
				return createApiResponse(false, { id }, 'Database error');
			if (err)
				return createApiResponse(false, { id }, 'Unexpected error occurred');
			if (res && !res.count)
				return createApiResponse(false, { id }, 'FacilityId not found or no changes made');

			return createApiResponse(true, { id }, 'Delete success');
		});
	}

	async getCustomFacilitiesList(): Promise<ApiResponse<GetFacilitiesListDto>> {
		const res = await this.prisma.facilitiesList.findMany({
			orderBy: { facilitiesOrderId: 'desc' },
		});
		return createApiResponse(true, res);
	}
}
