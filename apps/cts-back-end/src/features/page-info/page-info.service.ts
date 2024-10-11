import { Injectable } from '@nestjs/common';
import { pick, tryit } from 'radash';
import { PrismaService } from '../shared/prisma.service';
import { ApiResponse, createApiResponse } from '../../core/interceptors/api-response';
import { PrismaErrorSchema } from '../shared/prisma-schemas';
import { PageListDto } from './page-info-schemas';

@Injectable()
export class PageInfoService {
	constructor(private prisma: PrismaService) {}

	async getObservatoriesList(): Promise<ApiResponse<PageListDto>> {
		const [err, res] = await tryit(this.prisma.pageInfo.findMany)({
			orderBy: { pageId: 'asc' },
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, [], 'Database error');
		if (err)
			return createApiResponse(false, [], 'Unexpected error occurred');
		if (res && !res.length)
			return createApiResponse(false, [], 'list is empty');

		return createApiResponse(true, res.map(item => pick(item, ['pageTitle', 'subPageTitle', 'pageRoute'])));
	}
}
