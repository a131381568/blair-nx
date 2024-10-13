import { Injectable } from '@nestjs/common';
import Big from 'big.js';
import { get, pick, tryit } from 'radash';
import { PrismaErrorSchema } from '../shared/prisma-schemas';
import { ExtendedPrismaClient, InjectPrismaClient } from '../shared/prisma.extension';
import { ApiResponse, createApiResponse } from '../../core/interceptors/api-response';
import { NanoIdDto, NanoIdSchema } from '../../common/dto/id.dto';
import { StargazingItemDetailDto, StargazingListWithPagiDto, StargazingQueryDto, defaultStargazingItemDetail, defaultStargazingQueryData, stargazingQuerySchema, stargazingWithPagiDefaultData } from './stargazing-schemas';

@Injectable()
export class StargazingService {
	constructor(
		@InjectPrismaClient()
		private readonly prisma: ExtendedPrismaClient,
	) {}

	async getStargazingQuery(payload: StargazingQueryDto): Promise<ApiResponse<StargazingListWithPagiDto>> {
		const { success: zodSuccess, error: zodErr, data: safeQuery } = stargazingQuerySchema.safeParse(payload);
		if (!zodSuccess)
			return createApiResponse(false, stargazingWithPagiDefaultData, `Validation error: ${zodErr.errors[0].message}`);

		const [err, res] = await tryit(this.prisma.stargazingList.paginate({
			where: {
				published: true,
				OR: safeQuery.nid ? [{ stargazingNanoId: safeQuery.nid }] : undefined,
			},
			orderBy: { stargazingOrderId: 'asc' },
		}).withPages)({
			limit: Number(get(safeQuery, 'limit', defaultStargazingQueryData.limit)),
			page: Number(get(safeQuery, 'page', defaultStargazingQueryData.page)),
			includePageCount: true,
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, stargazingWithPagiDefaultData, 'Database error');
		if (err)
			return createApiResponse(false, stargazingWithPagiDefaultData, 'Unexpected error occurred');
		if (res && !res.length)
			return createApiResponse(false, stargazingWithPagiDefaultData, 'list is empty');

		const dataMode = get(safeQuery, 'mode', defaultStargazingQueryData.mode);
		return createApiResponse(true, {
			list: res[0].map((item) => {
				if (dataMode === 'map') {
					return {
						...pick(item, ['stargazingTitle', 'stargazingImage', 'stargazingDescription', 'stargazingAddress', 'stargazingNanoId']),
						stargazingLatitude: item.stargazingLatitude ? new Big(item.stargazingLatitude.toString()) : null,
						stargazingLongitude: item.stargazingLongitude ? new Big(item.stargazingLongitude.toString()) : null,
					};
				}
				return pick(item, ['stargazingTitle', 'stargazingAddress', 'stargazingNanoId']);
			}),
			meta: res[1],
		});
	}

	async getStargazingDetail(id: NanoIdDto): Promise<ApiResponse<StargazingItemDetailDto>> {
		const { success: zodSuccess, error: zodErr, data: safeId } = NanoIdSchema.safeParse(id);

		if (!zodSuccess)
			return createApiResponse(false, defaultStargazingItemDetail, `Validation error: ${zodErr.errors[0].message}`);

		const [err, res] = await tryit(this.prisma.stargazingList.findFirst)({
			where: { stargazingNanoId: safeId, published: true },
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, defaultStargazingItemDetail, 'Database error');
		if (err)
			return createApiResponse(false, defaultStargazingItemDetail, 'Unexpected error occurred');
		if (!res)
			return createApiResponse(false, defaultStargazingItemDetail, 'Id not found or no changes made');

		const stargazingLatitude = res.stargazingLatitude ? res.stargazingLatitude.toString() : null;
		const stargazingLongitude = res.stargazingLongitude ? res.stargazingLongitude.toString() : null;

		return createApiResponse(true, {
			...pick(res, ['stargazingTitle', 'stargazingImage', 'stargazingDescription', 'stargazingAddress', 'stargazingNanoId']),
			stargazingLatitude: stargazingLatitude ? new Big(stargazingLatitude) : null,
			stargazingLongitude: stargazingLongitude ? new Big(stargazingLongitude) : null,
		});
	}
}
