import { Injectable } from '@nestjs/common';
import { get, tryit } from 'radash';
import { ApiResponse, createApiResponse } from '../../core/interceptors/api-response';
import { PrismaErrorSchema } from '../shared/prisma-schemas';
import { ExtendedPrismaClient, InjectPrismaClient } from '../shared/prisma.extension';
import { ScienceListWithPagiDto, ScienceQueryDto, sciencetWithPagiDefaultData } from './science-schemas';

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
}
