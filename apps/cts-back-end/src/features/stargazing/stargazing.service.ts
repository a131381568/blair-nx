import { Injectable } from '@nestjs/common';
import { get, omit, pick, tryit } from 'radash';
import { PrismaErrorSchema } from '../shared/prisma-schemas';
import { ExtendedPrismaClient, InjectPrismaClient } from '../shared/prisma.extension';
import { ApiResponse, createApiResponse } from '../../core/interceptors/api-response';
import { NanoIdDto, NanoIdSchema } from '../../common/dto/id.dto';
import { StargazingItemDetailDto, StargazingListWithPagiDto, StargazingQueryDto, UpdateStargazingDetailDto, defaultStargazingItemDetail, defaultStargazingQueryData, stargazingQuerySchema, stargazingWithPagiDefaultData, updateStargazingDetailSchema } from './stargazing-schemas';

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
						stargazingLatitude: String(item.stargazingLatitude),
						stargazingLongitude: String(item.stargazingLongitude),
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

		return createApiResponse(true, {
			...pick(res, ['stargazingTitle', 'stargazingImage', 'stargazingDescription', 'stargazingAddress', 'stargazingNanoId']),
			stargazingLatitude: String(res.stargazingLatitude),
			stargazingLongitude: String(res.stargazingLatitude),
		});
	}

	async updateStargazingDetail(id: NanoIdDto, data: UpdateStargazingDetailDto): Promise<ApiResponse<null>> {
		const { success: idZodSuccess, error: idZodErr, data: safeId } = NanoIdSchema.safeParse(id);
		const { success: dataZodSuccess, error: dataZodErr, data: safeData } = updateStargazingDetailSchema.safeParse(data);
		if (!dataZodSuccess || !idZodSuccess)
			return createApiResponse(false, null, `Validation error: ${[dataZodErr?.errors[0].message, idZodErr?.errors[0].message].join('. ')}`);

		const [err, res] = await tryit(this.prisma.stargazingList.updateMany)({
			where: { stargazingNanoId: safeId, published: true },
			data: {
				...safeData,
				stargazingLatitude: String(safeData.stargazingLatitude),
				stargazingLongitude: String(safeData.stargazingLongitude),
			},
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, null, 'Database error');
		if (err)
			return createApiResponse(false, null, 'Unexpected error occurred');
		if (res && !res.count)
			return createApiResponse(false, null, 'Id not found or no changes made');

		return createApiResponse(true, null, 'Update success');
	}

	async createStargazingDetail(data: UpdateStargazingDetailDto): Promise<ApiResponse<null>> {
		const { success: zodSuccess, error: zodErr, data: safeData } = updateStargazingDetailSchema.safeParse(data);
		if (!zodSuccess)
			return createApiResponse(false, null, `Validation error: ${zodErr.errors[0].message}`);

		const [err] = await tryit(this.prisma.stargazingList.create)({
			data: {
				...safeData,
				// ...omit(safeData, ['stargazingLatitude', 'stargazingLongitude']),
				stargazingLatitude: String(safeData.stargazingLatitude),
				stargazingLongitude: String(safeData.stargazingLongitude),
				published: true,
			},
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, null, 'Database error');
		if (err)
			return createApiResponse(false, null, 'Unexpected error occurred');

		return createApiResponse(true, null, 'Create success');
	}

	async deleteStargazingDetail(id: NanoIdDto): Promise<ApiResponse<null>> {
		const { success: zodSuccess, error: zodErr, data: safeId } = NanoIdSchema.safeParse(id);

		if (!zodSuccess)
			return createApiResponse(false, null, `Validation error: ${zodErr.errors[0].message}`);

		const [err, res] = await tryit(this.prisma.stargazingList.updateMany)({
			where: { stargazingNanoId: safeId, published: true },
			data: { published: false },
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, null, 'Database error');
		if (err)
			return createApiResponse(false, null, 'Unexpected error occurred');
		if (res && !res.count)
			return createApiResponse(false, null, 'Id not found or no changes made');

		return createApiResponse(true, null, 'Delete success');
	}
}
