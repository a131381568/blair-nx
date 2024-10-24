import { Body, Controller, NotFoundException, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateScienceDto, NanoIdDto, ScienceQueryPartialDto, scienceContract } from '@cts-shared';
import { NestResponseShapes, TsRestHandler, nestControllerContract, tsRestHandler } from '@ts-rest/nest';
import { ScienceService } from './science.service';

const GET_QUERY = 'getScienceList';
const GET_SINGLE = 'getScienceDetail';
const PUT = 'updateScienceDetail';
const CREATE = 'createScienceDetail';
const DELETE = 'deleteScienceDetail';
const c = nestControllerContract(scienceContract);
type ResponseShapes = NestResponseShapes<typeof c>;

@Controller()
export class ScienceController {
	constructor(private readonly scienceService: ScienceService) {}

	@TsRestHandler(c[GET_QUERY])
	async getScienceList(@Query() data: ScienceQueryPartialDto) {
		return tsRestHandler(c[GET_QUERY], async (_reqInfo): Promise<ResponseShapes[typeof GET_QUERY]> => {
			const listData = await this.scienceService[GET_QUERY]({ data });
			return { status: 200, body: listData };
		});
	}

	@TsRestHandler(c[GET_SINGLE])
	async getScienceDetail(@Param('id') id: NanoIdDto) {
		return tsRestHandler(c[GET_SINGLE], async (_reqInfo): Promise<ResponseShapes[typeof GET_SINGLE]> => {
			const resData = await this.scienceService[GET_SINGLE]({ id });
			if (!resData)
				throw new NotFoundException('ID does not exist');
			return { status: 200, body: resData };
		});
	}

	@UseGuards(AuthGuard('jwt'))
	@TsRestHandler(c[CREATE])
	async createScienceDetail(@Body() data: CreateScienceDto) {
		return tsRestHandler(c[CREATE], async (_reqInfo): Promise<ResponseShapes[typeof CREATE]> => {
			await this.scienceService[CREATE]({ data });
			return { status: 200, body: 'Create success' };
		});
	}

	@UseGuards(AuthGuard('jwt'))
	@TsRestHandler(c[PUT])
	async updateScienceDetail(@Param('id') id: NanoIdDto, @Body() data: CreateScienceDto) {
		return tsRestHandler(c[PUT], async (_reqInfo): Promise<ResponseShapes[typeof PUT]> => {
			const success = await this.scienceService[PUT]({ id, data });
			if (!success)
				throw new NotFoundException('ID does not exist');
			return { status: 200, body: 'Update success' };
		});
	}

	@UseGuards(AuthGuard('jwt'))
	@TsRestHandler(c[DELETE])
	async deleteScienceDetail(@Param('id') id: NanoIdDto) {
		return tsRestHandler(c[DELETE], async (_reqInfo): Promise<ResponseShapes[typeof DELETE]> => {
			const success = await this.scienceService[DELETE]({ id });
			if (!success)
				throw new NotFoundException('ID does not exist');
			return { status: 200, body: 'Delete success' };
		});
	}
}
