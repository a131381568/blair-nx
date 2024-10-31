import { Injectable } from '@nestjs/common';
import { pick } from 'radash';
import { NanoIdDto, PageListDto, UpdatePageItemDto } from '@cts-shared';
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
		return res.map(item => pick(item, ['pageTitle', 'subPageTitle', 'pageRoute', 'pageNanoId']));
	}

	async updatePageItem({ id, data }: { id: NanoIdDto; data: UpdatePageItemDto }): Promise<boolean> {
		const { count } = await this.prisma.pageInfo.updateMany({
			where: { pageNanoId: id },
			data,
		});
		return Boolean(count);
	}
}
