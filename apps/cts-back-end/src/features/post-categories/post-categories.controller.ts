import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, PostCategoriesDto, PostCategoryFitDto, StrIdDto } from '@cts-shared';
import { PostCategoriesService } from './post-categories.service';

@Controller('post-categories')
export class PostCategoriesController {
	constructor(private readonly postCategoriesService: PostCategoriesService) {}

	@Get()
	getPostCategories(): Promise<ApiResponse<PostCategoriesDto>> {
		return this.postCategoriesService.getPostCategories();
	}

	@Get(':id')
	getPostCategory(@Param('id') id: StrIdDto): Promise<ApiResponse<PostCategoryFitDto>> {
		return this.postCategoriesService.getPostCategory({ id });
	}

	@UseGuards(AuthGuard('jwt'))
	@Put(':id')
	async updatePostCategory(@Param('id') id: StrIdDto, @Body() data: PostCategoryFitDto): Promise<ApiResponse<null>> {
		return this.postCategoriesService.updatePostCategory({ id, data });
	}

	@UseGuards(AuthGuard('jwt'))
	@Post('create')
	async createPostCategory(@Body() data: PostCategoryFitDto): Promise<ApiResponse<null>> {
		return this.postCategoriesService.createPostCategory({ data });
	}

	@UseGuards(AuthGuard('jwt'))
	@Delete(':id')
	async deletePostCategory(@Param('id') id: StrIdDto): Promise<ApiResponse<null>> {
		return this.postCategoriesService.deletePostCategory({ id });
	}
}
