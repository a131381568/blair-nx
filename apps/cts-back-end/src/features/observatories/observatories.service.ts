import { Injectable } from '@nestjs/common';
import { omit, tryit } from 'radash';
import { PrismaService } from '../shared/prisma.service';
import { ApiResponse, createApiResponse } from '../../core/interceptors/api-response';
import { PrismaErrorSchema } from '../shared/prisma-schemas';
import { IntIdDto, IntIdSchema } from '../../common/dto/id.dto';
import { ObservatoriesListDto, ObservatoryItemDto, UpdateObservatoryItemDto, defaultObservatoryItemData, updateObservatoryItemSchema } from './observatories-schemas';

@Injectable()
export class ObservatoriesService {
	constructor(private prisma: PrismaService) {}

	async getObservatoriesList(): Promise<ApiResponse<ObservatoriesListDto>> {
		const [err, res] = await tryit(this.prisma.observatoriesList.findMany)({
			orderBy: { observatoryOrderId: 'asc' },
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, [], 'Database error');
		if (err)
			return createApiResponse(false, [], 'Unexpected error occurred');
		if (res && !res.length)
			return createApiResponse(false, [], 'ObservatoriesList is empty');

		return createApiResponse(true, res.map(item => omit(item, ['published', 'observatoryOrderId'])));
	}

	async getObservatoryItem(id: IntIdDto): Promise<ApiResponse<ObservatoryItemDto>> {
		const { success: zodSuccess, error: zodErr, data: safeId } = IntIdSchema.safeParse(id);

		if (!zodSuccess)
			return createApiResponse(false, defaultObservatoryItemData, `Validation error: ${zodErr.errors[0].message}`);

		const [err, res] = await tryit(this.prisma.observatoriesList.findFirst)({
			where: {
				observatoryOrderId: safeId,
				published: true,
			},
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, defaultObservatoryItemData, 'Database error');
		if (err)
			return createApiResponse(false, defaultObservatoryItemData, 'Unexpected error occurred');
		if (!res)
			return createApiResponse(false, defaultObservatoryItemData, 'observatoryCategoryId not found or no changes made');

		return createApiResponse(true, omit(res, ['published', 'observatoryOrderId']));
	}

	async updateObservatoryItem(
		id: IntIdDto,
		data: UpdateObservatoryItemDto,
	): Promise<ApiResponse<null>> {
		const { success: idZodSuccess, error: idZodErr, data: safeId } = IntIdSchema.safeParse(id);
		const { success: dataZodSuccess, error: dataZodErr, data: safeData } = updateObservatoryItemSchema.safeParse(data);

		if (!dataZodSuccess || !idZodSuccess)
			return createApiResponse(false, null, `Validation error: ${[dataZodErr?.errors[0].message, idZodErr?.errors[0].message].join('. ')}`);

		const [err, res] = await tryit(this.prisma.observatoriesList.updateMany)({
			where: {
				observatoryOrderId: safeId,
				published: true,
			},
			data: safeData,
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, null, 'Database error');
		if (err)
			return createApiResponse(false, null, 'Unexpected error occurred');
		if (res && !res.count)
			return createApiResponse(false, null, 'observatoryCategoryId not found or no changes made');

		return createApiResponse(true, null, 'Update success');
	}

	async createObservatoryItem(
		data: UpdateObservatoryItemDto,
	): Promise<ApiResponse<null>> {
		const { success: zodSuccess, error: zodErr, data: safeData } = updateObservatoryItemSchema.safeParse(data);

		if (!zodSuccess)
			return createApiResponse(false, null, `Validation error: ${zodErr.errors[0].message}`);

		return this.prisma.$transaction(async (prisma) => {
			const lastItem = await prisma.observatoriesList.findFirst({
				orderBy: { observatoryOrderId: 'desc' },
				select: { observatoryOrderId: true },
			});

			const nextOrderId = (lastItem?.observatoryOrderId ?? 0) + 1;

			const [err] = await tryit(prisma.observatoriesList.create)({
				data: {
					...safeData,
					published: true,
					observatoryOrderId: nextOrderId,
				},
			});

			if (err && PrismaErrorSchema.safeParse(err).success)
				return createApiResponse(false, null, 'Database error');
			if (err)
				return createApiResponse(false, null, 'Unexpected error occurred');

			return createApiResponse(true, null, 'Create success');
		});
	}
}
