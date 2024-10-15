import { Injectable } from '@nestjs/common';
import { omit, tryit } from 'radash';
import { ExtendedPrismaClient, InjectPrismaClient } from '../shared/prisma.extension';
import { ApiResponse, createApiResponse } from '../../core/interceptors/api-response';
import { PrismaErrorSchema } from '../shared/prisma-schemas';
import type { GetAboutInfoBaseDto, UpdateAboutInfoDto } from './about-info-schemas';
import { defaultAboutInfoData, updateAboutInfoSchema } from './about-info-schemas';

@Injectable()
export class AboutInfoService {
	constructor(
		@InjectPrismaClient()
		private readonly prisma: ExtendedPrismaClient,
	) {}

	async getAboutInfo(): Promise<ApiResponse<GetAboutInfoBaseDto>> {
		const [err, res] = await tryit(this.prisma.aboutInfo.findUnique)({
			where: { aboutId: 1 },
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, defaultAboutInfoData, 'Database error');
		if (err || !res)
			return createApiResponse(false, defaultAboutInfoData, 'Unexpected error occurred');

		return createApiResponse(true, omit(res, ['aboutId']));
	}

	async updateAboutInfo(data: UpdateAboutInfoDto): Promise<ApiResponse<null>> {
		const { success: zodSuccess, error: zodErr, data: safeData } = updateAboutInfoSchema.safeParse(data);

		if (!zodSuccess)
			return createApiResponse(false, null, `Validation error: ${zodErr.errors[0].message}`);

		const [err, res] = await tryit(this.prisma.aboutInfo.update)({
			where: { aboutId: 1 },
			data: safeData,
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, null, 'Database error');
		if (err || !res)
			return createApiResponse(false, null, 'Unexpected error occurred');

		return createApiResponse(true, null, 'Update success');
	}
}
