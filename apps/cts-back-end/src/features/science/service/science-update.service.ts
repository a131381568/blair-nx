import { Injectable } from '@nestjs/common';
import { tryit } from 'radash';
import { ExtendedPrismaClient, InjectPrismaClient } from '../../shared/prisma.extension';
import { createApiResponse } from '../../../core/interceptors/api-response';
import { PrismaErrorSchema } from '../../shared/prisma-schemas';

@Injectable()
export class ScienceUpdateService {
	constructor(
		@InjectPrismaClient()
		private readonly prisma: ExtendedPrismaClient,
	) {}

	async putScienceData({
		title,
    content,
    image,
    postCategoryNanoId,
		safeId,
	}: {
		title: string;
		content: string;
		image: string;
		postCategoryNanoId: string;
		safeId: string;
	}) {
		return this.prisma.$transaction(async (prisma) => {
			if (postCategoryNanoId) {
				// 驗證 NanoId 存在於 PostCategories 表中
				const [findError, existInfo] = await tryit(prisma.postCategories.findUnique)({
					where: { postCategoryNanoId },
				});
				if (findError || !existInfo)
					return createApiResponse(false, null, 'Id not found or no changes made');
			}

			const [err, res] = await tryit(prisma.science.updateMany)({
				where: {
					postNanoId: safeId,
					published: true,
				},
				data: {
					postCategoryNanoId,
					title,
					content,
					image,
					updateTime: new Date(),
				},
			});

			if (err && PrismaErrorSchema.safeParse(err).success)
				return createApiResponse(false, null, 'Database error');
			if (err)
				return createApiResponse(false, null, 'Unexpected error occurred');
			if (res && !res.count)
				return createApiResponse(false, null, 'Id not found or no changes made');

			return createApiResponse(true, null, 'Update success');
		});
	}
}
