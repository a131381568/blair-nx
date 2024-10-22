import { Injectable } from '@nestjs/common';
import { pick } from 'radash';
import { PostCategoriesDto, PostCategoryFitDto, StrIdDto, defaultPostCategoryData, updatePostCategorySchema } from '@cts-shared';
import { ExtendedPrismaClient, InjectPrismaClient } from '../shared/prisma.extension';
import { ApiResponse, createApiResponse } from '../../core/interceptors/api-response';
import { ErrorAdditional, ValidationAdditional } from '../shared/response-handler';

@Injectable()
export class PostCategoriesService {
	constructor(
		@InjectPrismaClient()
		private readonly prisma: ExtendedPrismaClient,
	) {}

	@ErrorAdditional([])
	async getPostCategories(): Promise<ApiResponse<PostCategoriesDto>> {
		const res = await this.prisma.postCategories.findMany({
			orderBy: { postCategoryOrderId: 'asc' },
			where: { published: true },
		});
		return createApiResponse(true, res.map(item => pick(item, ['postCategoryId', 'postCategoryName', 'postCategoryNanoId'])));
	}

	@ValidationAdditional()
	@ErrorAdditional(defaultPostCategoryData)
	async getPostCategory({ id }: { id: StrIdDto }): Promise<ApiResponse<PostCategoryFitDto>> {
		const res = await this.prisma.postCategories.findFirst({
			where: { postCategoryNanoId: id, published: true },
		});
		return createApiResponse(
			Boolean(res),
			res ? pick(res, ['postCategoryId', 'postCategoryName']) : defaultPostCategoryData,
		);
	}

	@ValidationAdditional(updatePostCategorySchema)
	@ErrorAdditional()
	async updatePostCategory({ id, data }: {
		id: StrIdDto;
		data: PostCategoryFitDto;
	}): Promise<ApiResponse<null>> {
		await this.prisma.postCategories.update({
			where: { postCategoryNanoId: id, published: true },
			data,
		});
		return createApiResponse(true, null, 'Update success');
	}

	@ValidationAdditional(updatePostCategorySchema)
	@ErrorAdditional()
	async createPostCategory({ data }: {
		data: PostCategoryFitDto;
	}): Promise<ApiResponse<null>> {
		await this.prisma.postCategories.create({
			data: { ...data, published: true },
		});
		return createApiResponse(true, null, 'Create success');
	}

	@ValidationAdditional()
	@ErrorAdditional()
	async deletePostCategory({ id }: { id: StrIdDto }): Promise<ApiResponse<null>> {
		await this.prisma.postCategories.update({
			where: { postCategoryNanoId: id, published: true },
			data: { published: false },
		});
		return createApiResponse(true, null, 'Delete success');
	}
}
