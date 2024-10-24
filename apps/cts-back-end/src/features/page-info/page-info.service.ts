import { Injectable } from '@nestjs/common';
import { pick } from 'radash';
import { PageListDto } from '@cts-shared';
import { ExtendedPrismaClient, InjectPrismaClient } from '../shared/prisma.extension';

@Injectable()
export class PageInfoService {
	constructor(
		@InjectPrismaClient()
		private readonly prisma: ExtendedPrismaClient,
	) {}

	async getPageInfoList(): Promise<PageListDto> {
		const res = await this.prisma.pageInfo.findMany({
			orderBy: { pageId: 'asc' },
		});
		return res.map(item => pick(item, ['pageTitle', 'subPageTitle', 'pageRoute']));
	}
}
