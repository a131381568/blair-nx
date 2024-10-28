import { Injectable } from '@nestjs/common';
import { ScienceQueryDto, defaultScienceQueryData } from '@cts-shared';
import { ExtendedPrismaClient, InjectPrismaClient } from '../../shared/prisma.extension';

@Injectable()
export class ScienceSearchService {
	constructor(
		@InjectPrismaClient()
		private readonly prisma: ExtendedPrismaClient,
	) {}

	async getScienceQuery({
		keyword,
    category,
    cnid,
    page = defaultScienceQueryData.page,
    limit = defaultScienceQueryData.limit,
	}: ScienceQueryDto) {
		const searchResult = await this.prisma.science.paginate({
			where: {
				published: true,
				OR: (keyword || (category !== 'all') || cnid)
					? [
							{ title: keyword ? { contains: keyword, mode: 'insensitive' } : undefined },
							{ content: keyword ? { contains: keyword, mode: 'insensitive' } : undefined },
							{
								quoteCat: {
									postCategoryName: keyword ? { contains: keyword, mode: 'insensitive' } : undefined,
									postCategoryId: category,
								},
							},
							{ postCategoryNanoId: cnid },
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
		}).withPages({
			limit: Number(limit),
			page: Number(page),
			includePageCount: true,
		});

		return searchResult;
	}
}
