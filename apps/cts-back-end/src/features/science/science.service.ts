import { Injectable } from '@nestjs/common';
import { get, pick } from 'radash';
import { ApiResponse, createApiResponse } from '../../core/interceptors/api-response';
import { StrIdDto } from '../../common/dto/id.dto';
import { ExtendedPrismaClient, InjectPrismaClient } from '../shared/prisma.extension';
import { ErrorAdditional, ValidationAdditional } from '../shared/response-handler';
import { CreateScienceDto, ScienceItemDto, ScienceListWithPagiDto, ScienceQueryDto, createScienceSchema, scienceItemBaseDefaultData, scienceQuerySchema, sciencetWithPagiDefaultData } from './science-schemas';
import { ScienceSearchService } from './service/science-search.service';

@Injectable()
export class ScienceService {
	constructor(
    @InjectPrismaClient()
    private readonly prisma: ExtendedPrismaClient,
    private readonly scienceSearchService: ScienceSearchService,
	) {}

	@ValidationAdditional(scienceQuerySchema)
	@ErrorAdditional(sciencetWithPagiDefaultData)
	async getScienceList({ data }: { data: ScienceQueryDto }): Promise<ApiResponse<ScienceListWithPagiDto>> {
		const res = await this.scienceSearchService.getScienceQuery(data);

		const [resData, pagiMeta] = res;
		const scienceData = resData.map(item => ({
			...pick(item, ['title', 'content', 'image']),
			updateTime: item.updateTime ? new Date(item.updateTime).toLocaleDateString('fr-CA') : '',
			postCategoryName: get(item.quoteCat, 'postCategoryName', ''),
			postCategoryId: get(item.quoteCat, 'postCategoryId', ''),
		}));

		return createApiResponse(true, {
			list: scienceData,
			meta: pagiMeta,
		});
	}

	@ValidationAdditional()
	@ErrorAdditional(scienceItemBaseDefaultData)
	async getScienceDetail({ id }: { id: StrIdDto }): Promise<ApiResponse<ScienceItemDto>> {
		const res = await this.prisma.science.findFirst({
			where: { postNanoId: id, published: true },
			include: {
				quoteCat: { select: { postCategoryName: true, postCategoryId: true } },
			},
		});

		return createApiResponse(
			Boolean(res),
			res
				? {
						...pick(res, ['title', 'content', 'image']),
						updateTime: res.updateTime ? new Date(res.updateTime).toLocaleDateString('fr-CA') : '',
						postCategoryId: get(res.quoteCat, 'postCategoryId', ''),
						postCategoryName: get(res.quoteCat, 'postCategoryName', ''),
					}
				: scienceItemBaseDefaultData,
		);
	}

	@ValidationAdditional(createScienceSchema)
	@ErrorAdditional()
	async updateScienceDetail({ id, data }: {
		id: StrIdDto;
		data: CreateScienceDto;
	}): Promise<ApiResponse<null>> {
		await this.prisma.science.update({
			where: { postNanoId: id, published: true },
			data: { ...data, updateTime: new Date() },
		});
		return createApiResponse(true, null, 'Update success');
	}

	@ValidationAdditional(createScienceSchema)
	@ErrorAdditional()
	async createScienceDetail({ data }: { data: CreateScienceDto }): Promise<ApiResponse<null>> {
		await this.prisma.science.create({
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
		return createApiResponse(true, null, 'Create success');
	}

	@ValidationAdditional()
	@ErrorAdditional()
	async deleteScienceDetail({ id }: { id: StrIdDto }): Promise<ApiResponse<null>> {
		await this.prisma.science.update({
			where: { postNanoId: id, published: true },
			data: { published: false },
		});
		return createApiResponse(true, null, 'Delete success');
	}
}
