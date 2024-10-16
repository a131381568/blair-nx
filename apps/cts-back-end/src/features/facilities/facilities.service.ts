import { Injectable } from '@nestjs/common';
import { omit, pick } from 'radash';
import { ApiResponse, createApiResponse } from '../../core/interceptors/api-response';
import { NanoIdDto } from '../../common/dto/id.dto';
import { ExtendedPrismaClient, InjectPrismaClient } from '../shared/prisma.extension';
import { ErrorAdditional, ValidationAdditional } from '../shared/response-handler';
import type { CreateFacilityItemDto, FacilityItemBaseDto, GetFacilitiesListBaseDto, UpdateFacilityItemDto } from './facilities-schemas';
import { createFacilityItemSchema, defaultFacilityItemBase, updateFacilityItemSchema } from './facilities-schemas';

@Injectable()
export class FacilitiesService {
	constructor(
		@InjectPrismaClient()
		private readonly prisma: ExtendedPrismaClient,
	) {}

	@ErrorAdditional([])
	async getFacilitiesList(): Promise<ApiResponse<GetFacilitiesListBaseDto>> {
		const res = await this.prisma.facilitiesList.findMany({
			orderBy: { facilitiesOrderId: 'asc' },
			where: { published: true },
			take: 3,
		});

		return createApiResponse(
			true,
			res.map(item => pick(item, ['facilitiesTitle', 'facilitiesDescription', 'facilitiesImage', 'facilitiesLink', 'facilitiesNanoId'])),
		);
	}

	@ValidationAdditional()
	@ErrorAdditional(defaultFacilityItemBase)
	async getFacilityItem({ id }: { id: NanoIdDto }): Promise<ApiResponse<FacilityItemBaseDto>> {
		const res = await this.prisma.facilitiesList.findFirst({
			where: { facilitiesNanoId: id, published: true },
		});
		return createApiResponse(
			Boolean(res),
			res ? pick(res, ['facilitiesTitle', 'facilitiesDescription', 'facilitiesImage', 'facilitiesLink']) : defaultFacilityItemBase,
		);
	}

	@ValidationAdditional(updateFacilityItemSchema)
	@ErrorAdditional()
	async updateFacilityItem({ id, data }: {
		id: NanoIdDto;
		data: UpdateFacilityItemDto;
	}): Promise<ApiResponse<null>> {
		await this.prisma.facilitiesList.updateMany({
			where: { facilitiesNanoId: id },
			data,
		});
		return createApiResponse(true, null, 'Update success');
	}

	@ValidationAdditional(createFacilityItemSchema)
	@ErrorAdditional()
	async createFacilityItem({ data }: {
		data: CreateFacilityItemDto;
	}): Promise<ApiResponse<null>> {
		return this.prisma.$transaction(async (prisma) => {
			await prisma.facilitiesList.create({
				data: { ...data, published: true },
			});
			return createApiResponse(true, null, 'Create success');
		});
	}

	@ValidationAdditional()
	@ErrorAdditional()
	async deleteFacilityItem({ id }: { id: NanoIdDto }): Promise<ApiResponse<null>> {
		return this.prisma.$transaction(async (prisma) => {
			await prisma.facilitiesList.updateMany({
				where: { facilitiesNanoId: id },
				data: { published: false },
			});
			return createApiResponse(true, null, 'Delete success');
		});
	}
}
