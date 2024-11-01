import { Body, Controller, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NanoIdDto, UpdatePageItemDto, pageInfoContract } from '@cts-shared';
import { NestResponseShapes, TsRestHandler, nestControllerContract, tsRestHandler } from '@ts-rest/nest';
import { PageInfoService } from './page-info.service';

const GET_QUERY = 'getPageInfoList';
const PUT = 'updatePageItem';
const c = nestControllerContract(pageInfoContract);
type ResponseShapes = NestResponseShapes<typeof c>;

@Controller()
export class PageInfoController {
	constructor(private readonly pageInfoService: PageInfoService) {}

	@TsRestHandler(c[GET_QUERY])
	async getPageInfoList() {
		return tsRestHandler(c[GET_QUERY], async (_reqInfo): Promise<ResponseShapes[typeof GET_QUERY]> => {
			const listData = await this.pageInfoService[GET_QUERY]();
			return { status: 200, body: listData };
		});
	}

	@UseGuards(AuthGuard('jwt'))
	@TsRestHandler(c[PUT])
	updatePageItem(@Param('id') id: NanoIdDto, @Body() data: UpdatePageItemDto) {
		return tsRestHandler(c[PUT], async (_reqInfo): Promise<ResponseShapes[typeof PUT]> => {
			const success = await this.pageInfoService[PUT]({ id, data });
			if (!success)
				throw new NotFoundException('ID does not exist');
			return { status: 200, body: 'Update success' };
		});
	}
}
