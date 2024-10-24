import { Body, Controller, NotFoundException, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NanoIdDto, StargazingQueryDto, UpdateStargazingDetailDto, stargazingContract } from '@cts-shared';
import { NestResponseShapes, TsRestHandler, nestControllerContract, tsRestHandler } from '@ts-rest/nest';
import { StargazingService } from './stargazing.service';

const GET_QUERY = 'getStargazingQuery';
const GET_SINGLE = 'getStargazingDetail';
const PUT = 'updateStargazingDetail';
const CREATE = 'createStargazingDetail';
const DELETE = 'deleteStargazingDetail';
const c = nestControllerContract(stargazingContract);
type ResponseShapes = NestResponseShapes<typeof c>;

@Controller()
export class StargazingController {
	constructor(private readonly stargazingService: StargazingService) {}

	@TsRestHandler(c[GET_QUERY])
	getStargazingQuery(@Query() data: StargazingQueryDto) {
		return tsRestHandler(c[GET_QUERY], async (_reqInfo): Promise<ResponseShapes[typeof GET_QUERY]> => {
			const listData = await this.stargazingService[GET_QUERY]({ data });
			return { status: 200, body: listData };
		});
	}

	@TsRestHandler(c[GET_SINGLE])
	async getStargazingDetail(@Param('id') id: NanoIdDto) {
		return tsRestHandler(c[GET_SINGLE], async (_reqInfo): Promise<ResponseShapes[typeof GET_SINGLE]> => {
			const resData = await this.stargazingService[GET_SINGLE]({ id });
			if (!resData)
				throw new NotFoundException('ID does not exist');
			return { status: 200, body: resData };
		});
	}

	@UseGuards(AuthGuard('jwt'))
	@TsRestHandler(c[CREATE])
	async createStargazingDetail(@Body() data: UpdateStargazingDetailDto) {
		return tsRestHandler(c[CREATE], async (_reqInfo): Promise<ResponseShapes[typeof CREATE]> => {
			await this.stargazingService[CREATE]({ data });
			return { status: 200, body: 'Create success' };
		});
	}

	@UseGuards(AuthGuard('jwt'))
	@TsRestHandler(c[PUT])
	async updateStargazingDetail(@Param('id') id: NanoIdDto, @Body() data: UpdateStargazingDetailDto) {
		return tsRestHandler(c[PUT], async (_reqInfo): Promise<ResponseShapes[typeof PUT]> => {
			const success = await this.stargazingService[PUT]({ id, data });
			if (!success)
				throw new NotFoundException('ID does not exist');
			return { status: 200, body: 'Update success' };
		});
	}

	@UseGuards(AuthGuard('jwt'))
	@TsRestHandler(c[DELETE])
	async deleteStargazingDetail(@Param('id') id: NanoIdDto) {
		return tsRestHandler(c[DELETE], async (_reqInfo): Promise<ResponseShapes[typeof DELETE]> => {
			const success = await this.stargazingService[DELETE]({ id });
			if (!success)
				throw new NotFoundException('ID does not exist');
			return { status: 200, body: 'Delete success' };
		});
	}
}
