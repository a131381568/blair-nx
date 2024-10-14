import { Injectable } from '@nestjs/common';
import { get, tryit } from 'radash';
import { ApiResponse, createApiResponse } from '../../core/interceptors/api-response';
import { PrismaErrorSchema } from '../shared/prisma-schemas';
import { StrIdDto, StrIdSchema } from '../../common/dto/id.dto';
import { ExtendedPrismaClient, InjectPrismaClient } from '../shared/prisma.extension';
import { CreateScienceDto, ScienceItemDto, ScienceListWithPagiDto, ScienceQueryDto, createScienceSchema, scienceItemBaseDefaultData, scienceQuerySchema, sciencetWithPagiDefaultData } from './science-schemas';
import { ScienceSearchService } from './service/science-search.service';
import { ScienceUpdateService } from './service/science-update.service';

@Injectable()
export class ScienceService {
	constructor(
    @InjectPrismaClient()
    private readonly prisma: ExtendedPrismaClient,
    private readonly scienceSearchService: ScienceSearchService,
    private readonly scienceUpdateService: ScienceUpdateService,
	) {}

	async getScienceList(payload: ScienceQueryDto): Promise<ApiResponse<ScienceListWithPagiDto>> {
		const { success: zodSuccess, error: zodErr, data: safeData } = scienceQuerySchema.safeParse(payload);
		if (!zodSuccess)
			return createApiResponse(false, sciencetWithPagiDefaultData, `Validation error: ${zodErr.errors[0].message}`);

		const [err, res] = await tryit(this.scienceSearchService.getScienceQuery.bind(this.scienceSearchService))(safeData);

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, sciencetWithPagiDefaultData, 'Database error');
		if (err)
			return createApiResponse(false, sciencetWithPagiDefaultData, 'Unexpected error occurred');
		if (res && !res.length)
			return createApiResponse(false, sciencetWithPagiDefaultData, 'list is empty');

		const [resData, pagiMeta] = res;
		const scienceData = resData.map(({ title, content, image, updateTime, quoteCat }) => ({
			title,
			updateTime: updateTime ? new Date(updateTime).toLocaleDateString('fr-CA') : '',
			content,
			image,
			postCategoryName: get(quoteCat, 'postCategoryName', ''),
			postCategoryId: get(quoteCat, 'postCategoryId', ''),
		}));

		return createApiResponse(true, {
			list: scienceData,
			meta: pagiMeta,
		});
	}

	async getScienceDetail(id: StrIdDto): Promise<ApiResponse<ScienceItemDto>> {
		const { success: zodSuccess, error: zodErr, data: safeId } = StrIdSchema.safeParse(id);

		if (!zodSuccess)
			return createApiResponse(false, scienceItemBaseDefaultData, `Validation error: ${zodErr.errors[0].message}`);

		const [err, res] = await tryit(this.prisma.science.findFirst)({
			where: { postNanoId: safeId, published: true },
			include: {
				quoteCat: { select: { postCategoryName: true, postCategoryId: true } },
			},
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, scienceItemBaseDefaultData, 'Database error');
		if (err)
			return createApiResponse(false, scienceItemBaseDefaultData, 'Unexpected error occurred');
		if (!res)
			return createApiResponse(false, scienceItemBaseDefaultData, 'Id not found or no changes made');

		const { title, content, image, updateTime, quoteCat } = res;
		return createApiResponse(true, {
			title,
			content,
			image,
			updateTime: updateTime ? new Date(updateTime).toLocaleDateString('fr-CA') : '',
			postCategoryId: get(quoteCat, 'postCategoryId', ''),
			postCategoryName: get(quoteCat, 'postCategoryName', ''),
		});
	}

	async updateScienceDetail(id: StrIdDto, data: CreateScienceDto): Promise<ApiResponse<null>> {
		const { success: idZodSuccess, error: idZodErr, data: safeId } = StrIdSchema.safeParse(id);
		const { success: dataZodSuccess, error: dataZodErr, data: safeData } = createScienceSchema.safeParse(data);

		if (!dataZodSuccess || !idZodSuccess)
			return createApiResponse(false, null, `Validation error: ${[dataZodErr?.errors[0].message, idZodErr?.errors[0].message].join('. ')}`);

		return this.scienceUpdateService.putScienceData({ ...safeData, safeId });
	}

	async createScienceDetail(data: CreateScienceDto): Promise<ApiResponse<null>> {
		const { success: zodSuccess, error: zodErr, data: safeData } = createScienceSchema.safeParse(data);
		if (!zodSuccess)
			return createApiResponse(false, null, `Validation error: ${zodErr.errors[0].message}`);

		const { title, content, image, postCategoryNanoId } = safeData;
		const [err] = await tryit(this.prisma.science.create)({
			data: {
				title,
				content,
				image,
				published: true,
				updateTime: new Date(),
				...(postCategoryNanoId && {
					// 關聯驗證 NanoId 存在於 PostCategories 表中
					quoteCat: { connect: { postCategoryNanoId } },
				}),
			},
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, null, 'Database error');
		if (err)
			return createApiResponse(false, null, 'Unexpected error occurred');

		return createApiResponse(true, null, 'Create success');
	}

	async deleteScienceDetail(id: StrIdDto): Promise<ApiResponse<null>> {
		const { success: zodSuccess, error: zodErr, data: safeId } = StrIdSchema.safeParse(id);

		if (!zodSuccess)
			return createApiResponse(false, null, `Validation error: ${zodErr.errors[0].message}`);

		const [err, res] = await tryit(this.prisma.science.updateMany)({
			where: { postNanoId: safeId, published: true },
			data: { published: false },
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, null, 'Database error');
		if (err)
			return createApiResponse(false, null, 'Unexpected error occurred');
		if (res && !res.count)
			return createApiResponse(false, null, 'Id not found or no changes made');

		return createApiResponse(true, null, 'Delete success');
	}
}
