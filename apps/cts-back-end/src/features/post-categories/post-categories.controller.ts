import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse } from '../../core/interceptors/api-response';
import { StrIdDto } from '../../common/dto/id.dto';
import { PostCategoriesService } from './post-categories.service';
import { PostCategoriesDto, PostCategoryFitDto } from './post-categories-schemas';

@Controller('post-categories')
export class PostCategoriesController {
	constructor(private readonly postCategoriesService: PostCategoriesService) {}

	@Get()
	getPostCategories(): Promise<ApiResponse<PostCategoriesDto>> {
		return this.postCategoriesService.getPostCategories();
	}

	@Get(':id')
	getPostCategory(@Param('id') id: StrIdDto): Promise<ApiResponse<PostCategoryFitDto>> {
		return this.postCategoriesService.getPostCategory(id);
	}

	@Put(':id')
	async updatePostCategory(@Param('id') id: StrIdDto, @Body() data: PostCategoryFitDto): Promise<ApiResponse<null>> {
		return this.postCategoriesService.updatePostCategory(id, data);
	}

	@Post('create')
	async createPostCategory(@Body() data: PostCategoryFitDto): Promise<ApiResponse<null>> {
		return this.postCategoriesService.createPostCategory(data);
	}

	@Delete(':id')
	async deletePostCategory(@Param('id') id: StrIdDto): Promise<ApiResponse<null>> {
		return this.postCategoriesService.deletePostCategory(id);
	}
}
