import { Injectable } from '@nestjs/common';
import { get, pick } from 'radash';
import { CreateScienceDto, NanoIdDto, ScienceItemDto, ScienceListWithPagiDto, ScienceQueryDto, ScienceQueryPartialDto, defaultScienceQueryData } from '@cts-shared';
import { ExtendedPrismaClient, InjectPrismaClient } from '../shared/prisma.extension';
import { ScienceSearchService } from './service/science-search.service';

@Injectable()
export class ScienceService {
	constructor(
    @InjectPrismaClient()
    private readonly prisma: ExtendedPrismaClient,
    private readonly scienceSearchService: ScienceSearchService,
	) {}

	async getScienceList({ data }: { data: ScienceQueryPartialDto }): Promise<ScienceListWithPagiDto> {
		const payload: ScienceQueryDto = {
			...data,
			page: get(data, 'page', defaultScienceQueryData.page),
			limit: get(data, 'limit', defaultScienceQueryData.limit),
		};
		const res = await this.scienceSearchService.getScienceQuery(payload);

		const [resData, pagiMeta] = res;
		const scienceData = resData.map(item => ({
			...pick(item, ['title', 'content', 'image', 'postNanoId']),
			updateTime: item.updateTime ? new Date(item.updateTime).toLocaleDateString('fr-CA') : '',
			postCategoryName: get(item.quoteCat, 'postCategoryName', ''),
			postCategoryId: get(item.quoteCat, 'postCategoryId', ''),
		}));

		return {
			list: scienceData,
			meta: pagiMeta,
		};
	}

	async getScienceDetail({ id }: { id: NanoIdDto }): Promise<ScienceItemDto | null> {
		const res = await this.prisma.science.findFirst({
			where: { postNanoId: id, published: true },
			include: {
				quoteCat: { select: { postCategoryName: true, postCategoryId: true } },
			},
		});

		return res
			? {
					...pick(res, ['title', 'content', 'image', 'postNanoId']),
					updateTime: res.updateTime ? new Date(res.updateTime).toLocaleDateString('fr-CA') : '',
					postCategoryId: get(res.quoteCat, 'postCategoryId', ''),
					postCategoryName: get(res.quoteCat, 'postCategoryName', ''),
				}
			: null;
	}

	async createScienceDetail({ data }: { data: CreateScienceDto }): Promise<boolean> {
		const res = await this.prisma.science.create({
			data: {
				...pick(data, ['title', 'content', 'image']),
				published: true,
				updateTime: new Date(),
				...((data.postCategoryNanoId) && {
					// 關聯驗證 NanoId 存在於 PostCategories 表中
					quoteCat: { connect: { postCategoryNanoId: data.postCategoryNanoId } },
				}),
			},
		});
		return Boolean(res);
	}

	async updateScienceDetail({ id, data }: { id: NanoIdDto; data: CreateScienceDto }): Promise<boolean> {
		const { count } = await this.prisma.science.updateMany({
			where: { postNanoId: id, published: true },
			data: { ...data, updateTime: new Date() },
		});
		return Boolean(count);
	}

	async deleteScienceDetail({ id }: { id: NanoIdDto }): Promise<boolean> {
		const { count } = await this.prisma.science.updateMany({
			where: { postNanoId: id, published: true },
			data: { published: false },
		});
		return Boolean(count);
	}
}
