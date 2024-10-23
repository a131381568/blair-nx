import { Body, Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateAboutInfoDto, aboutInfoContract } from '@cts-shared';
import { NestResponseShapes, TsRestHandler, nestControllerContract, tsRestHandler } from '@ts-rest/nest';
import { AboutInfoService } from './about-info.service';

const c = nestControllerContract(aboutInfoContract);
type ResponseShapes = NestResponseShapes<typeof c>;

const GET_QUERY = 'getAboutInfo';
const UPDATE = 'updateAboutInfo';

@Controller()
export class AboutInfoController {
	constructor(private readonly aboutService: AboutInfoService) {}

	@TsRestHandler(c[GET_QUERY])
	async getAboutInfo() {
		return tsRestHandler(c[GET_QUERY], async (_reqInfo): Promise<ResponseShapes[typeof GET_QUERY]> => {
			const resData = await this.aboutService[GET_QUERY]();
			return { status: 200, body: resData };
		});
	}

	@UseGuards(AuthGuard('jwt'))
	@TsRestHandler(c[UPDATE])
	async updateAboutInfo(@Body() data: UpdateAboutInfoDto) {
		return tsRestHandler(c[UPDATE], async (_reqInfo): Promise<ResponseShapes[typeof UPDATE]> => {
			await this.aboutService[UPDATE]({ data });
			return { status: 200, body: 'Update success' };
		});
	}
}
