import { Injectable } from '@nestjs/common';
import { omit, tryit } from 'radash';
import { PrismaService } from '../shared/prisma.service';
import { ApiResponse, createApiResponse } from '../../core/interceptors/api-response';
import { PrismaErrorSchema } from '../shared/prisma-schemas';
import type { GetAboutInfoBaseDto, UpdateAboutInfoDto } from './about-info-schemas';
import { defaultAboutInfoData, updateAboutInfoSchema } from './about-info-schemas';

@Injectable()
export class AboutInfoService {
	constructor(private prisma: PrismaService) {}

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

	async updateAboutInfo(data: UpdateAboutInfoDto): Promise<ApiResponse<UpdateAboutInfoDto>> {
		const { success: zodSuccess, error: zodErr, data: safeData } = updateAboutInfoSchema.safeParse(data);

		if (!zodSuccess)
			return createApiResponse(false, data, `Validation error: ${zodErr.errors[0].message}`);

		const [err, res] = await tryit(this.prisma.aboutInfo.update)({
			where: { aboutId: 1 },
			data: safeData,
		});

		if (err && PrismaErrorSchema.safeParse(err).success)
			return createApiResponse(false, data, 'Database error');
		if (err || !res)
			return createApiResponse(false, data, 'Unexpected error occurred');

		return createApiResponse(true, safeData, 'Update success');
	}
}
