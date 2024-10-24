import { Body, Controller, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NanoIdDto, UpdateObservatoryItemDto, observatoriesContract } from '@cts-shared';
import { NestResponseShapes, TsRestHandler, nestControllerContract, tsRestHandler } from '@ts-rest/nest';
import { ObservatoriesService } from './observatories.service';

const GET_QUERY = 'getObservatoriesList';
const GET_SINGLE = 'getObservatoryItem';
const PUT = 'updateObservatoryItem';
const CREATE = 'createObservatoryItem';
const DELETE = 'deleteObservatoryItem';
const c = nestControllerContract(observatoriesContract);
type ResponseShapes = NestResponseShapes<typeof c>;

@Controller()
export class ObservatoriesController {
	constructor(private readonly observatoriesService: ObservatoriesService) {}

	@TsRestHandler(c[GET_QUERY])
	getObservatoriesList() {
		return tsRestHandler(c[GET_QUERY], async (_reqInfo): Promise<ResponseShapes[typeof GET_QUERY]> => {
			const listData = await this.observatoriesService[GET_QUERY]();
			return { status: 200, body: listData };
		});
	}

	@TsRestHandler(c[GET_SINGLE])
	getObservatoryItem(@Param('id') id: NanoIdDto) {
		return tsRestHandler(c[GET_SINGLE], async (_reqInfo): Promise<ResponseShapes[typeof GET_SINGLE]> => {
			const resData = await this.observatoriesService[GET_SINGLE]({ id });
			if (!resData)
				throw new NotFoundException('ID does not exist');
			return { status: 200, body: resData };
		});
	}

	@UseGuards(AuthGuard('jwt'))
	@TsRestHandler(c[CREATE])
	async createObservatoryItem(@Body() data: UpdateObservatoryItemDto) {
		return tsRestHandler(c[CREATE], async (_reqInfo): Promise<ResponseShapes[typeof CREATE]> => {
			await this.observatoriesService[CREATE]({ data });
			return { status: 200, body: 'Create success' };
		});
	}

	@UseGuards(AuthGuard('jwt'))
	@TsRestHandler(c[PUT])
	updateObservatoryItem(@Param('id') id: NanoIdDto, @Body() data: UpdateObservatoryItemDto) {
		return tsRestHandler(c[PUT], async (_reqInfo): Promise<ResponseShapes[typeof PUT]> => {
			const success = await this.observatoriesService[PUT]({ id, data });
			if (!success)
				throw new NotFoundException('ID does not exist');
			return { status: 200, body: 'Update success' };
		});
	}

	@UseGuards(AuthGuard('jwt'))
	@TsRestHandler(c[DELETE])
	deleteObservatoryItem(@Param('id') id: NanoIdDto) {
		return tsRestHandler(c[DELETE], async (_reqInfo): Promise<ResponseShapes[typeof DELETE]> => {
			const success = await this.observatoriesService[DELETE]({ id });
			if (!success)
				throw new NotFoundException('ID does not exist');
			return { status: 200, body: 'Delete success' };
		});
	}
}
