import { Body, Controller, Delete, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateScienceDto, ScienceQueryPartialDto, StrIdDto, scienceContract } from '@cts-shared';
import { NestResponseShapes, TsRestHandler, nestControllerContract, tsRestHandler } from '@ts-rest/nest';
import { ApiResponse } from '../../core/interceptors/api-response';
import { ScienceService } from './science.service';

const c = nestControllerContract(scienceContract);
type ResponseShapes = NestResponseShapes<typeof c>;
const GET_QUERY = 'getScienceList';
const GET_SINGLE = 'getScienceDetail';

@Controller()
export class ScienceController {
	constructor(private readonly scienceService: ScienceService) {}

	@TsRestHandler(c[GET_QUERY])
	async getScienceList(@Query() data: ScienceQueryPartialDto) {
		return tsRestHandler(c[GET_QUERY], async (_reqInfo): Promise<ResponseShapes[typeof GET_QUERY]> => {
			const { data: resList } = await this.scienceService[GET_QUERY]({ data });

			if (process.env.IS_DEBUG) {
				const { success: zodSuccess, error: zodError } = c[GET_QUERY].responses['200'].safeParse(resList);
				if (!zodSuccess)
					throw new Error(zodError.errors.toString());
			}

			return { status: 200, body: resList };
		});
	}

	@TsRestHandler(c[GET_SINGLE])
	async getScienceDetail(@Param('id') id: StrIdDto) {
		return tsRestHandler(c[GET_SINGLE], async (_reqInfo): Promise<ResponseShapes[typeof GET_SINGLE]> => {
			const { data: resItem } = await this.scienceService[GET_SINGLE]({ id });

			if (process.env.IS_DEBUG) {
				const { success: zodSuccess, error: zodError } = c[GET_SINGLE].responses['200'].safeParse(resItem);
				if (!zodSuccess)
					throw new Error(zodError.errors.toString());
			}

			return { status: 200, body: resItem };
		});
	}

	@UseGuards(AuthGuard('jwt'))
	@Put(':id')
	async updateScienceDetail(@Param('id') id: StrIdDto, @Body() data: CreateScienceDto): Promise<ApiResponse<null>> {
		return this.scienceService.updateScienceDetail({ id, data });
	}

	@UseGuards(AuthGuard('jwt'))
	@Post('create')
	async createScienceDetail(@Body() data: CreateScienceDto): Promise<ApiResponse<null>> {
		return this.scienceService.createScienceDetail({ data });
	}

	@UseGuards(AuthGuard('jwt'))
	@Delete(':id')
	async deleteScienceDetail(@Param('id') id: StrIdDto): Promise<ApiResponse<null>> {
		return this.scienceService.deleteScienceDetail({ id });
	}
}
