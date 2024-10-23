import { Injectable } from '@nestjs/common';
import { omit } from 'radash';
import { ApiResponse, GetAboutInfoBaseDto, UpdateAboutInfoDto, createApiResponse, defaultAboutInfoData, updateAboutInfoSchema } from '@cts-shared';
import { ExtendedPrismaClient, InjectPrismaClient } from '../shared/prisma.extension';
import { ErrorAdditional, ValidationAdditional } from '../shared/response-handler';

@Injectable()
export class AboutInfoService {
	constructor(
		@InjectPrismaClient()
		private readonly prisma: ExtendedPrismaClient,
	) {}

	@ErrorAdditional(defaultAboutInfoData)
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
