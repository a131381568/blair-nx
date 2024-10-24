import { Body, Controller, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateFacilityItemDto, NanoIdDto, UpdateFacilityItemDto, facilitiesContract } from '@cts-shared';
import { NestResponseShapes, TsRestHandler, nestControllerContract, tsRestHandler } from '@ts-rest/nest';
import { FacilitiesService } from './facilities.service';

const GET = 'getFacilitiesList';
const GET_SINGLE = 'getFacilityItem';
const CREATE = 'createFacilityItem';
const PUT = 'updateFacilityItem';
const DELETE = 'deleteFacilityItem';
const c = nestControllerContract(facilitiesContract);
type ResponseShapes = NestResponseShapes<typeof c>;

@Controller()
export class FacilitiesController {
	constructor(private readonly facilitiesService: FacilitiesService) {}

	@TsRestHandler(c[GET])
	getFacilitiesList() {
		return tsRestHandler(c[GET], async (_reqInfo): Promise<ResponseShapes[typeof GET]> => {
			const listData = await this.facilitiesService[GET]();
			return { status: 200, body: listData };
		});
	}

	@TsRestHandler(c[GET_SINGLE])
	getFacilityItem(@Param('id') id: NanoIdDto) {
		return tsRestHandler(c[GET_SINGLE], async (_reqInfo): Promise<ResponseShapes[typeof GET_SINGLE]> => {
			const resData = await this.facilitiesService[GET_SINGLE]({ id });
			if (!resData)
				throw new NotFoundException('ID does not exist');
			return { status: 200, body: resData };
		});
	}

	@UseGuards(AuthGuard('jwt'))
	@TsRestHandler(c[CREATE])
	createFacilityItem(@Body() data: CreateFacilityItemDto) {
		return tsRestHandler(c[CREATE], async (_reqInfo): Promise<ResponseShapes[typeof CREATE]> => {
			await this.facilitiesService[CREATE]({ data });
			return { status: 200, body: 'Create success' };
		});
	}

	@UseGuards(AuthGuard('jwt'))
	@TsRestHandler(c[PUT])
	updateFacilityItem(@Param('id') id: NanoIdDto, @Body() data: UpdateFacilityItemDto) {
		return tsRestHandler(c[PUT], async (_reqInfo): Promise<ResponseShapes[typeof PUT]> => {
			const success = await this.facilitiesService[PUT]({ id, data });
			if (!success)
				throw new NotFoundException('ID does not exist');
			return { status: 200, body: 'Update success' };
		});
	}

	@UseGuards(AuthGuard('jwt'))
	@TsRestHandler(c[DELETE])
	deleteFacilityItem(@Param('id') id: NanoIdDto) {
		return tsRestHandler(c[DELETE], async (_reqInfo): Promise<ResponseShapes[typeof DELETE]> => {
			const success = await this.facilitiesService[DELETE]({ id });
			if (!success)
				throw new NotFoundException('ID does not exist');
			return { status: 200, body: 'Delete success' };
		});
	}
}
