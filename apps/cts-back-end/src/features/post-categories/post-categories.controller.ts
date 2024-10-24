import { Body, Controller, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NanoIdDto, PostCategoryFitDto, postCategoriesContract } from '@cts-shared';
import { NestResponseShapes, TsRestHandler, nestControllerContract, tsRestHandler } from '@ts-rest/nest';
import { PostCategoriesService } from './post-categories.service';

const GET_QUERY = 'getPostCategories';
const GET_SINGLE = 'getPostCategory';
const PUT = 'updatePostCategory';
const CREATE = 'createPostCategory';
const DELETE = 'deletePostCategory';
const c = nestControllerContract(postCategoriesContract);
type ResponseShapes = NestResponseShapes<typeof c>;

@Controller()
export class PostCategoriesController {
	constructor(private readonly postCategoriesService: PostCategoriesService) {}

	@TsRestHandler(c[GET_QUERY])
	async getPostCategories() {
		return tsRestHandler(c[GET_QUERY], async (_reqInfo): Promise<ResponseShapes[typeof GET_QUERY]> => {
			const listData = await this.postCategoriesService[GET_QUERY]();
			return { status: 200, body: listData };
		});
	}

	@TsRestHandler(c[GET_SINGLE])
	async getPostCategory(@Param('id') id: NanoIdDto) {
		return tsRestHandler(c[GET_SINGLE], async (_reqInfo): Promise<ResponseShapes[typeof GET_SINGLE]> => {
			const resData = await this.postCategoriesService[GET_SINGLE]({ id });
			if (!resData)
				throw new NotFoundException('ID does not exist');
			return { status: 200, body: resData };
		});
	}

	@UseGuards(AuthGuard('jwt'))
	@TsRestHandler(c[CREATE])
	async createPostCategory(@Body() data: PostCategoryFitDto) {
		return tsRestHandler(c[CREATE], async (_reqInfo): Promise<ResponseShapes[typeof CREATE]> => {
			await this.postCategoriesService[CREATE]({ data });
			return { status: 200, body: 'Create success' };
		});
	}

	@UseGuards(AuthGuard('jwt'))
	@TsRestHandler(c[PUT])
	async updatePostCategory(@Param('id') id: NanoIdDto, @Body() data: PostCategoryFitDto) {
		return tsRestHandler(c[PUT], async (_reqInfo): Promise<ResponseShapes[typeof PUT]> => {
			const success = await this.postCategoriesService[PUT]({ id, data });
			if (!success)
				throw new NotFoundException('ID does not exist');
			return { status: 200, body: 'Update success' };
		});
	}

	@UseGuards(AuthGuard('jwt'))
	@TsRestHandler(c[DELETE])
	async deletePostCategory(@Param('id') id: NanoIdDto) {
		return tsRestHandler(c[DELETE], async (_reqInfo): Promise<ResponseShapes[typeof DELETE]> => {
			const success = await this.postCategoriesService[DELETE]({ id });
			if (!success)
				throw new NotFoundException('ID does not exist');
			return { status: 200, body: 'Delete success' };
		});
	}
}
