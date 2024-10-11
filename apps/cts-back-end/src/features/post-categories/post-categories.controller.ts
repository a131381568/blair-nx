import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '../../core/interceptors/api-response';
import { PostCategoriesService } from './post-categories.service';
import { PostCategoriesBaseDto } from './post-categories-schemas';

@Controller('post-categories')
export class PostCategoriesController {
	constructor(private readonly postCategoriesService: PostCategoriesService) {}

	@Get()
	getPostCategories(): Promise<ApiResponse<PostCategoriesBaseDto>> {
		return this.postCategoriesService.getPostCategories();
	}
}
