import { Injectable } from '@nestjs/common';
import { pick, tryit } from 'radash';
import { PrismaService } from '../shared/prisma.service';
import { ApiResponse, createApiResponse } from '../../core/interceptors/api-response';
import { PrismaErrorSchema } from '../shared/prisma-schemas';
import { PostCategoriesBaseDto } from './post-categories-schemas';

@Injectable()
export class PostCategoriesService {
	constructor(private prisma: PrismaService) {}

	async getPostCategories(): Promise<ApiResponse<PostCategoriesBaseDto>> {
		const [err, res] = await tryit(this.prisma.postCategories.findMany)({
			orderBy: { postCategoryOrderId: 'asc' },
			where: {
				published: true,
			},
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, [], 'Database error');
		if (err)
			return createApiResponse(false, [], 'Unexpected error occurred');
		if (res && !res.length)
			return createApiResponse(false, [], 'list is empty');

		return createApiResponse(true, res.map(item => pick(item, ['postCategoryId', 'postCategoryName', 'postCategoryNanoId'])));
	}
}
