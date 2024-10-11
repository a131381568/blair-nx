import { Injectable } from '@nestjs/common';
import { pick, tryit } from 'radash';
import { PrismaService } from '../shared/prisma.service';
import { ApiResponse, createApiResponse } from '../../core/interceptors/api-response';
import { PrismaErrorSchema } from '../shared/prisma-schemas';
import { StrIdDto, StrIdSchema } from '../../common/dto/id.dto';
import { PostCategoriesDto, PostCategoryFitDto, defaultPostCategoryData, updatePostCategorySchema } from './post-categories-schemas';

@Injectable()
export class PostCategoriesService {
	constructor(private prisma: PrismaService) {}

	async getPostCategories(): Promise<ApiResponse<PostCategoriesDto>> {
		const [err, res] = await tryit(this.prisma.postCategories.findMany)({
			orderBy: { postCategoryOrderId: 'asc' },
			where: {	published: true },
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, [], 'Database error');
		if (err)
			return createApiResponse(false, [], 'Unexpected error occurred');
		if (res && !res.length)
			return createApiResponse(false, [], 'list is empty');

		return createApiResponse(true, res.map(item => pick(item, ['postCategoryId', 'postCategoryName', 'postCategoryNanoId'])));
	}

	async getPostCategory(id: StrIdDto): Promise<ApiResponse<PostCategoryFitDto>> {
		const { success: zodSuccess, error: zodErr, data: safeId } = StrIdSchema.safeParse(id);

		if (!zodSuccess)
			return createApiResponse(false, defaultPostCategoryData, `Validation error: ${zodErr.errors[0].message}`);

		const [err, res] = await tryit(this.prisma.postCategories.findFirst)({
			where: { postCategoryNanoId: safeId, published: true },
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, defaultPostCategoryData, 'Database error');
		if (err)
			return createApiResponse(false, defaultPostCategoryData, 'Unexpected error occurred');
		if (!res)
			return createApiResponse(false, defaultPostCategoryData, 'postCategoryId not found or no changes made');

		return createApiResponse(true, pick(res, ['postCategoryId', 'postCategoryName']));
	}

	async updatePostCategory(
		id: StrIdDto,
		data: PostCategoryFitDto,
	): Promise<ApiResponse<null>> {
		const { success: idZodSuccess, error: idZodErr, data: safeId } = StrIdSchema.safeParse(id);
		const { success: dataZodSuccess, error: dataZodErr, data: safeData } = updatePostCategorySchema.safeParse(data);

		if (!dataZodSuccess || !idZodSuccess)
			return createApiResponse(false, null, `Validation error: ${[dataZodErr?.errors[0].message, idZodErr?.errors[0].message].join('. ')}`);

		const [err, res] = await tryit(this.prisma.postCategories.updateMany)({
			where: { postCategoryNanoId: safeId, published: true },
			data: safeData,
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, null, 'Database error');
		if (err)
			return createApiResponse(false, null, 'Unexpected error occurred');
		if (res && !res.count)
			return createApiResponse(false, null, 'postCategoryId not found or no changes made');

		return createApiResponse(true, null, 'Update success');
	}

	async createPostCategory(
		data: PostCategoryFitDto,
	): Promise<ApiResponse<null>> {
		const { success: zodSuccess, error: zodErr, data: safeData } = updatePostCategorySchema.safeParse(data);

		if (!zodSuccess)
			return createApiResponse(false, null, `Validation error: ${zodErr.errors[0].message}`);

		const [err] = await tryit(this.prisma.postCategories.create)({
			data: { ...safeData, published: true },
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, null, 'Database error');
		if (err)
			return createApiResponse(false, null, 'Unexpected error occurred');

		return createApiResponse(true, null, 'Create success');
	}

	async deletePostCategory(id: StrIdDto): Promise<ApiResponse<null>> {
		const { success: zodSuccess, error: zodErr, data: safeId } = StrIdSchema.safeParse(id);

		if (!zodSuccess)
			return createApiResponse(false, null, `Validation error: ${zodErr.errors[0].message}`);

		const [err, res] = await tryit(this.prisma.postCategories.updateMany)({
			where: { postCategoryNanoId: safeId, published: true },
			data: { published: false },
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, null, 'Database error');
		if (err)
			return createApiResponse(false, null, 'Unexpected error occurred');
		if (res && !res.count)
			return createApiResponse(false, null, 'postCategoryId not found or no changes made');

		return createApiResponse(true, null, 'Delete success');
	}
}
