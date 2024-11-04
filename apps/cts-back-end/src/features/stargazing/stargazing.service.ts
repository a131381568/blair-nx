import { Injectable } from '@nestjs/common';
import { get, pick } from 'radash';
import { NanoIdDto, SingleStargazingDetailDto, StargazingListWithPagiDto, StargazingQueryDto, UpdateStargazingDetailDto, defaultStargazingItemDetail, defaultStargazingQueryData } from '@cts-shared';
import { ExtendedPrismaClient, InjectPrismaClient } from '../shared/prisma.extension';

@Injectable()
export class StargazingService {
	constructor(
		@InjectPrismaClient()
		private readonly prisma: ExtendedPrismaClient,
	) {}

	async getStargazingQuery({ data }: { data: StargazingQueryDto }): Promise<StargazingListWithPagiDto> {
		const res = await this.prisma.stargazingList.paginate({
			where: {
				published: true,
				OR: data.nid ? [{ stargazingNanoId: data.nid }] : undefined,
			},
			orderBy: { stargazingOrderId: 'desc' },
		}).withPages({
			limit: Number(get(data, 'limit', defaultStargazingQueryData.limit)),
			page: Number(get(data, 'page', defaultStargazingQueryData.page)),
			includePageCount: true,
		});

		const dataMode = get(data, 'mode', defaultStargazingQueryData.mode);
		return {
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
		};
	}

	async getStargazingDetail({ id }: { id: NanoIdDto }): Promise<SingleStargazingDetailDto> {
		const res = await this.prisma.stargazingList.findFirst({
			where: { stargazingNanoId: id, published: true },
		});
		return res
			? {
					...pick(res, ['stargazingTitle', 'stargazingImage', 'stargazingDescription', 'stargazingAddress', 'stargazingNanoId']),
					stargazingLatitude: String(res.stargazingLatitude),
					stargazingLongitude: String(res.stargazingLongitude),
				}
			: defaultStargazingItemDetail;
	}

	async createStargazingDetail({ data }: { data: UpdateStargazingDetailDto }): Promise<boolean> {
		const res = await this.prisma.stargazingList.create({
			data: {
				...data,
				stargazingLatitude: String(data.stargazingLatitude),
				stargazingLongitude: String(data.stargazingLongitude),
				published: true,
			},
		});
		return Boolean(res);
	}

	async updateStargazingDetail({ id, data }: { id: NanoIdDto;data: UpdateStargazingDetailDto }): Promise<boolean> {
		const { count } = await this.prisma.stargazingList.updateMany({
			where: { stargazingNanoId: id, published: true },
			data: {
				...data,
				stargazingLatitude: String(data.stargazingLatitude),
				stargazingLongitude: String(data.stargazingLongitude),
			},
		});
		return Boolean(count);
	}

	async deleteStargazingDetail({ id }: { id: NanoIdDto }): Promise<boolean> {
		const { count } = await this.prisma.stargazingList.updateMany({
			where: { stargazingNanoId: id, published: true },
			data: { published: false },
		});
		return Boolean(count);
	}
}
