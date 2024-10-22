import { Injectable } from '@nestjs/common';
import { pick } from 'radash';
import { PageListDto } from '@cts-shared';
import { ExtendedPrismaClient, InjectPrismaClient } from '../shared/prisma.extension';
import { ApiResponse, createApiResponse } from '../../core/interceptors/api-response';
import { ErrorAdditional } from '../shared/response-handler';

@Injectable()
export class PageInfoService {
	constructor(
		@InjectPrismaClient()
		private readonly prisma: ExtendedPrismaClient,
	) {}

	@ErrorAdditional([])
	async getObservatoriesList(): Promise<ApiResponse<PageListDto>> {
		const res = await this.prisma.pageInfo.findMany({
			orderBy: { pageId: 'asc' },
		});
		return createApiResponse(true, res.map(item => pick(item, ['pageTitle', 'subPageTitle', 'pageRoute'])));
	}
}
