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
		// const res = await this.prisma.pageInfo.findMany({
		// 	orderBy: { pageId: 'asc' },
		// });
		// return res.map(item => pick(item, ['pageTitle', 'subPageTitle', 'pageRoute', 'pageNanoId']));
		return [
			{
				pageTitle: '關於我們',
				subPageTitle: 'about',
				pageRoute: 'About',
				pageNanoId: 'SKsK7iVNRh',
			},
			{
				pageTitle: '天文科普',
				subPageTitle: 'science',
				pageRoute: 'Science',
				pageNanoId: 'vk6Dsd3nvs',
			},
			{
				pageTitle: '天文科普',
				subPageTitle: 'science',
				pageRoute: 'SingleScience',
				pageNanoId: 'R8z6saHCvU',
			},
			{
				pageTitle: '星星物語',
				subPageTitle: 'story',
				pageRoute: 'Story',
				pageNanoId: 'bu8NqtTb8w',
			},
			{
				pageTitle: '星星物語',
				subPageTitle: 'story',
				pageRoute: 'SingleStory',
				pageNanoId: 'l6bEk-mB8a',
			},
			{
				pageTitle: '天文設施',
				subPageTitle: 'facilities',
				pageRoute: 'Facilities',
				pageNanoId: 'j8OvVGnMc6',
			},
			{
				pageTitle: '觀星地點',
				subPageTitle: 'stargazing',
				pageRoute: 'Stargazing',
				pageNanoId: 'VlOuhiNbRu',
			},
			{
				pageTitle: '標籤彙整',
				subPageTitle: 'tag',
				pageRoute: 'Archive',
				pageNanoId: 'EHrHRzgCTy',
			},
			{
				pageTitle: '搜尋頁面',
				subPageTitle: 'search',
				pageRoute: 'Search',
				pageNanoId: 'XNFSmU86fU',
			},
			{
				pageTitle: 'Morbi interdum',
				subPageTitle: 'Ut pretium quis lorem et tincidunt. Nulla purus nibh, pharetra at massa sit amet, dignissim scelerisque mauris. Maecenas luctus, mi sit amet lobortis malesuada, orci mauris tincidunt libero',
				pageRoute: 'Home',
				pageNanoId: '7H7WpBGe46',
			},
		];
	}

	async updatePageItem({ id, data }: { id: NanoIdDto; data: UpdatePageItemDto }): Promise<boolean> {
		const { count } = await this.prisma.pageInfo.updateMany({
			where: { pageNanoId: id },
			data,
		});
		return Boolean(count);
	}
}
