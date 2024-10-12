import { Injectable } from '@nestjs/common';
import { get, pick, tryit } from 'radash';
import { ApiResponse, createApiResponse } from '../../core/interceptors/api-response';
import { PrismaErrorSchema } from '../shared/prisma-schemas';
import { StrIdDto, StrIdSchema } from '../../common/dto/id.dto';
import { ExtendedPrismaClient, InjectPrismaClient } from '../shared/prisma.extension';
import { CreateScienceDto, ScienceItemDto, ScienceListWithPagiDto, ScienceQueryDto, createScienceSchema, scienceItemBaseDefaultData, sciencetWithPagiDefaultData } from './science-schemas';

@Injectable()
export class ScienceService {
	constructor(
    @InjectPrismaClient()
    private readonly prisma: ExtendedPrismaClient,
	) {}

	async getScienceList({
		keyword,
    postCategoryId,
    postCategoryNanoId,
    page = 1,
    pageSize = 9,
	}: ScienceQueryDto): Promise<ApiResponse<ScienceListWithPagiDto>> {
		const [err, res] = await tryit(this.prisma.science.paginate({
			where: {
				published: true,
				OR: (keyword || postCategoryId || postCategoryNanoId)
					? [
							{ title: keyword ? { contains: keyword, mode: 'insensitive' } : undefined },
							{ content: keyword ? { contains: keyword, mode: 'insensitive' } : undefined },
							{
								quoteCat: {
									postCategoryName: keyword ? { contains: keyword, mode: 'insensitive' } : undefined,
									postCategoryId,
								},
							},
							{ postCategoryNanoId },
						]
					: undefined,
			},
			orderBy: { orderId: 'asc' },
			include: {
				quoteCat: {
					select: {
						postCategoryName: true,
						postCategoryId: true,
					},
				},
			},
		}).withPages)({
			limit: pageSize,
			page,
			includePageCount: true,
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, sciencetWithPagiDefaultData, 'Database error');
		if (err)
			return createApiResponse(false, sciencetWithPagiDefaultData, 'Unexpected error occurred');
		if (res && !res.length)
			return createApiResponse(false, sciencetWithPagiDefaultData, 'list is empty');

		const [resData, pagiMeta] = res;
		const scienceData = resData.map(({ title, content, image, updateTime, quoteCat }) => ({
			title,
			updateTime: updateTime ? new Date(updateTime).toLocaleDateString('fr-CA') : '',
			content,
			image,
			postCategoryName: get(quoteCat, 'postCategoryName', ''),
			postCategoryId: get(quoteCat, 'postCategoryId', ''),
		}));

		return createApiResponse(true, {
			list: scienceData,
			meta: pagiMeta,
		});
	}

	async getScienceDetail(id: string): Promise<ApiResponse<ScienceItemDto>> {
		const { success: zodSuccess, error: zodErr, data: safeId } = StrIdSchema.safeParse(id);

		if (!zodSuccess)
			return createApiResponse(false, scienceItemBaseDefaultData, `Validation error: ${zodErr.errors[0].message}`);

		const [err, res] = await tryit(this.prisma.science.findFirst)({
			where: {
				postNanoId: safeId,
				published: true,
			},
			include: {
				quoteCat: {
					select: {
						postCategoryName: true,
						postCategoryId: true,
					},
				},
			},
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, scienceItemBaseDefaultData, 'Database error');
		if (err)
			return createApiResponse(false, scienceItemBaseDefaultData, 'Unexpected error occurred');
		if (!res)
			return createApiResponse(false, scienceItemBaseDefaultData, 'observatoryId not found or no changes made');

		const { title, content, image, updateTime, quoteCat } = res;
		return createApiResponse(true, {
			title,
			content,
			image,
			updateTime: updateTime ? new Date(updateTime).toLocaleDateString('fr-CA') : '',
			postCategoryId: get(quoteCat, 'postCategoryId', ''),
			postCategoryName: get(quoteCat, 'postCategoryName', ''),
		});
	}

	async createScienceItem(
		data: CreateScienceDto,
	): Promise<ApiResponse<null>> {
		const { success: zodSuccess, error: zodErr, data: safeData } = createScienceSchema.safeParse(data);
		// 需要先確認 id 是存在的
		if (!zodSuccess)
			return createApiResponse(false, null, `Validation error: ${zodErr.errors[0].message}`);

		const [err] = await tryit(this.prisma.science.create)({
			data: { ...safeData, published: true },
		});

		if (err && PrismaErrorSchema.safeParse(err).success) {
			// console.table(safeData);
			// console.table(err);
			return createApiResponse(false, null, 'Database error');
		}

		if (err)
			return createApiResponse(false, null, 'Unexpected error occurred');

		return createApiResponse(true, null, 'Create success');
	}
}
