import { Injectable } from '@nestjs/common';
import { omit } from 'radash';
import { ApiResponse, GetAboutInfoBaseDto, UpdateAboutInfoDto, createApiResponse, defaultAboutInfoData } from '@cts-shared';
import { ExtendedPrismaClient, InjectPrismaClient } from '../shared/prisma.extension';

@Injectable()
export class AboutInfoService {
	constructor(
		@InjectPrismaClient()
		private readonly prisma: ExtendedPrismaClient,
	) {}

	async getAboutInfo(): Promise<GetAboutInfoBaseDto> {
		const res = await this.prisma.aboutInfo.findFirst({
			where: { aboutId: 1 },
		});
		if (!res)
			return defaultAboutInfoData;
		return omit(res, ['aboutId']);
	}

	async updateAboutInfo({ data }: { data: UpdateAboutInfoDto }): Promise<ApiResponse<null>> {
		await this.prisma.aboutInfo.update({
			where: { aboutId: 1 },
			data,
		});
		return createApiResponse(true, null, 'Update success');
	}
}
