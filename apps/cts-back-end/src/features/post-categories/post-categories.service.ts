import { Injectable } from '@nestjs/common';
import { pick } from 'radash';
import { PostCategoriesDto, PostCategoryFitDto, StrIdDto, defaultPostCategoryData } from '@cts-shared';
import { ExtendedPrismaClient, InjectPrismaClient } from '../shared/prisma.extension';

@Injectable()
export class PostCategoriesService {
	constructor(
		@InjectPrismaClient()
		private readonly prisma: ExtendedPrismaClient,
	) {}

	async getPostCategories(): Promise<PostCategoriesDto> {
		const res = await this.prisma.postCategories.findMany({
			orderBy: { postCategoryOrderId: 'asc' },
			where: { published: true },
		});
		return res.map(item => pick(item, ['postCategoryId', 'postCategoryName', 'postCategoryNanoId']));
	}

	async getPostCategory({ id }: { id: StrIdDto }): Promise<PostCategoryFitDto> {
		const res = await this.prisma.postCategories.findFirst({
			where: { postCategoryNanoId: id, published: true },
		});
		return res ? pick(res, ['postCategoryId', 'postCategoryName']) : defaultPostCategoryData;
	}

	async createPostCategory({ data }: { data: PostCategoryFitDto }): Promise<boolean> {
		const res = await this.prisma.postCategories.create({
			data: { ...data, published: true },
		});
		return Boolean(res);
	}

	async updatePostCategory({ id, data }: { id: StrIdDto; data: PostCategoryFitDto }): Promise<boolean> {
		const { count } = await this.prisma.postCategories.updateMany({
			where: { postCategoryNanoId: id, published: true },
			data,
		});
		return Boolean(count);
	}

	async deletePostCategory({ id }: { id: StrIdDto }): Promise<boolean> {
		const { count } = await this.prisma.postCategories.updateMany({
			where: { postCategoryNanoId: id, published: true },
			data: { published: false },
		});
		return Boolean(count);
	}
}
