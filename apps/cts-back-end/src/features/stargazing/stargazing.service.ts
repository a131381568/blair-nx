import { Injectable } from '@nestjs/common';
import { get, pick } from 'radash';
import { ApiResponse, NanoIdDto, StargazingItemDetailDto, StargazingListWithPagiDto, StargazingQueryDto, UpdateStargazingDetailDto, createApiResponse, defaultStargazingItemDetail, defaultStargazingQueryData, stargazingQuerySchema, stargazingWithPagiDefaultData, updateStargazingDetailSchema } from '@cts-shared';
import { ExtendedPrismaClient, InjectPrismaClient } from '../shared/prisma.extension';
import { ErrorAdditional, ValidationAdditional } from '../shared/response-handler';

@Injectable()
export class StargazingService {
	constructor(
		@InjectPrismaClient()
		private readonly prisma: ExtendedPrismaClient,
	) {}

	@ValidationAdditional(stargazingQuerySchema)
	@ErrorAdditional(stargazingWithPagiDefaultData)
	async getStargazingQuery({ data }: { data: StargazingQueryDto }): Promise<ApiResponse<StargazingListWithPagiDto>> {
		const res = await this.prisma.stargazingList.paginate({
			where: {
				published: true,
				OR: data.nid ? [{ stargazingNanoId: data.nid }] : undefined,
			},
			orderBy: { stargazingOrderId: 'asc' },
		}).withPages({
			limit: Number(get(data, 'limit', defaultStargazingQueryData.limit)),
			page: Number(get(data, 'page', defaultStargazingQueryData.page)),
			includePageCount: true,
		});

		const dataMode = get(data, 'mode', defaultStargazingQueryData.mode);
		return createApiResponse(true, {
			list: res[0].map((item) => {
				if (dataMode === 'map') {
					return {
						...pick(item, ['stargazingTitle', 'stargazingAddress', 'stargazingNanoId', 'stargazingImage', 'stargazingDescription']),
						stargazingLatitude: String(item.stargazingLatitude),
						stargazingLongitude: String(item.stargazingLongitude),
					};
				}
				return pick(item, ['stargazingTitle', 'stargazingAddress', 'stargazingNanoId']);
			}),
			meta: res[1],
		});
	}

	@ValidationAdditional()
	@ErrorAdditional(defaultStargazingItemDetail)
	async getStargazingDetail({ id }: { id: NanoIdDto }): Promise<ApiResponse<StargazingItemDetailDto>> {
		const res = await this.prisma.stargazingList.findFirst({
			where: { stargazingNanoId: id, published: true },
		});
		return createApiResponse(
			Boolean(res),
			res
				? {
						...pick(res, ['stargazingTitle', 'stargazingImage', 'stargazingDescription', 'stargazingAddress', 'stargazingNanoId']),
						stargazingLatitude: String(res.stargazingLatitude),
						stargazingLongitude: String(res.stargazingLatitude),
					}
				: defaultStargazingItemDetail,
		);
	}

	@ValidationAdditional(updateStargazingDetailSchema)
	@ErrorAdditional()
	async updateStargazingDetail({ id, data }: {
		id: NanoIdDto;
		data: UpdateStargazingDetailDto;
	}): Promise<ApiResponse<null>> {
		await this.prisma.stargazingList.update({
			where: { stargazingNanoId: id, published: true },
			data: {
				...data,
				stargazingLatitude: String(data.stargazingLatitude),
				stargazingLongitude: String(data.stargazingLongitude),
			},
		});
		return createApiResponse(true, null, 'Update success');
	}

	@ValidationAdditional(updateStargazingDetailSchema)
	@ErrorAdditional()
	async createStargazingDetail({ data }: { data: UpdateStargazingDetailDto }): Promise<ApiResponse<null>> {
		await this.prisma.stargazingList.create({
			data: {
				...data,
				stargazingLatitude: String(data.stargazingLatitude),
				stargazingLongitude: String(data.stargazingLongitude),
				published: true,
			},
		});
		return createApiResponse(true, null, 'Create success');
	}

	@ValidationAdditional()
	@ErrorAdditional()
	async deleteStargazingDetail({ id }: { id: NanoIdDto }): Promise<ApiResponse<null>> {
		await this.prisma.stargazingList.update({
			where: { stargazingNanoId: id, published: true },
			data: { published: false },
		});
		return createApiResponse(true, null, 'Delete success');
	}
}
