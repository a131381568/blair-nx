import { Injectable } from '@nestjs/common';
import { pick } from 'radash';
import { NanoIdDto, ObservatoriesListDto, ObservatoryItemDto, UpdateObservatoryItemDto, defaultObservatoryItemData, updateObservatoryItemSchema } from '@cts-shared';
import { ExtendedPrismaClient, InjectPrismaClient } from '../shared/prisma.extension';
import { ApiResponse, createApiResponse } from '../../core/interceptors/api-response';
import { ErrorAdditional, ValidationAdditional } from '../shared/response-handler';

@Injectable()
export class ObservatoriesService {
	constructor(
		@InjectPrismaClient()
		private readonly prisma: ExtendedPrismaClient,
	) {}

	@ErrorAdditional([])
	async getObservatoriesList(): Promise<ApiResponse<ObservatoriesListDto>> {
		const res = await this.prisma.observatoriesList.findMany({
			orderBy: { observatoryOrderId: 'asc' },
			where: { published: true },
		});
		return createApiResponse(
			Boolean(res.length),
			res.map(item => pick(item, ['observatoryNanoId', 'observatoryCategoryName', 'observatoryCategoryId', 'observatoryPostContent'])),
		);
	}

	@ValidationAdditional()
	@ErrorAdditional(defaultObservatoryItemData)
	async getObservatoryItem({ id }: { id: NanoIdDto }): Promise<ApiResponse<ObservatoryItemDto>> {
		const res = await this.prisma.observatoriesList.findFirst({
			where: { observatoryNanoId: id, published: true },
		});
		return createApiResponse(
			Boolean(res),
			res ? pick(res, ['observatoryCategoryName', 'observatoryCategoryId', 'observatoryPostContent']) : defaultObservatoryItemData,
		);
	}

	@ValidationAdditional(updateObservatoryItemSchema)
	@ErrorAdditional()
	async updateObservatoryItem({ id, data }: {
		id: NanoIdDto;
		data: UpdateObservatoryItemDto;
	}): Promise<ApiResponse<null>> {
		await this.prisma.observatoriesList.update({
			where: { observatoryNanoId: id, published: true },
			data,
		});
		return createApiResponse(true, null, 'Update success');
	}

	@ValidationAdditional(updateObservatoryItemSchema)
	@ErrorAdditional()
	async createObservatoryItem({ data }: { data: UpdateObservatoryItemDto }): Promise<ApiResponse<null>> {
		await this.prisma.observatoriesList.create({
			data: { ...data, published: true },
		});
		return createApiResponse(true, null, 'Create success');
	}

	@ValidationAdditional()
	@ErrorAdditional()
	async deleteFacilityItem({ id }: { id: NanoIdDto }): Promise<ApiResponse<null>> {
		await this.prisma.observatoriesList.update({
			where: { observatoryNanoId: id, published: true },
			data: { published: false },
		});
		return createApiResponse(true, null, 'Delete success');
	}
}
