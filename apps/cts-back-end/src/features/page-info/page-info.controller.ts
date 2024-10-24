import { Controller } from '@nestjs/common';
import { pageInfoContract } from '@cts-shared';
import { NestResponseShapes, TsRestHandler, nestControllerContract, tsRestHandler } from '@ts-rest/nest';
import { PageInfoService } from './page-info.service';

const GET_QUERY = 'getPageInfoList';
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
}
