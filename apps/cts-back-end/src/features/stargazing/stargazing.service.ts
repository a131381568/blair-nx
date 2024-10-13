import { Injectable } from '@nestjs/common';
import Big from 'big.js';
import { get, pick, tryit } from 'radash';
import { PrismaErrorSchema } from '../shared/prisma-schemas';
import { ExtendedPrismaClient, InjectPrismaClient } from '../shared/prisma.extension';
import { ApiResponse, createApiResponse } from '../../core/interceptors/api-response';
import { StargazingListWithPagiDto, StargazingQueryDto, defaultStargazingQueryData, stargazingQuerySchema, stargazingWithPagiDefaultData } from './stargazing-schemas';

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

		return createApiResponse(true, {
			list: res[0].map((item) => {
				return {
					...pick(item, ['stargazingTitle', 'stargazingImage', 'stargazingDescription', 'stargazingAddress', 'stargazingNanoId']),
					stargazingLatitude: item.stargazingLatitude ? new Big(item.stargazingLatitude.toString()) : null,
					stargazingLongitude: item.stargazingLongitude ? new Big(item.stargazingLongitude.toString()) : null,
				};
			}),
			meta: res[1],
		});
	}
}
