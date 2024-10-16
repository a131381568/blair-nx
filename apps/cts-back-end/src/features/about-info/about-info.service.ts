import { Injectable } from '@nestjs/common';
import { omit } from 'radash';
import { ExtendedPrismaClient, InjectPrismaClient } from '../shared/prisma.extension';
import { ApiResponse, createApiResponse } from '../../core/interceptors/api-response';
import { ErrorAdditional, ValidationAdditional } from '../shared/response-handler';
import type { GetAboutInfoBaseDto, UpdateAboutInfoDto } from './about-info-schemas';
import { defaultAboutInfoData, updateAboutInfoSchema } from './about-info-schemas';

@Injectable()
export class AboutInfoService {
	constructor(
		@InjectPrismaClient()
		private readonly prisma: ExtendedPrismaClient,
	) {}

	@ErrorAdditional()
	async getAboutInfo(): Promise<ApiResponse<GetAboutInfoBaseDto>> {
		const res = await this.prisma.aboutInfo.findFirst({
			where: { aboutId: 1 },
		});
		return createApiResponse(Boolean(res), res ? omit(res, ['aboutId']) : defaultAboutInfoData);
	}

	@ValidationAdditional(updateAboutInfoSchema)
	@ErrorAdditional()
	async updateAboutInfo({ data }: { data: UpdateAboutInfoDto }): Promise<ApiResponse<null>> {
		await this.prisma.aboutInfo.update({
			where: { aboutId: 1 },
			data,
		});
		return createApiResponse(true, null, 'Update success');
	}
}
