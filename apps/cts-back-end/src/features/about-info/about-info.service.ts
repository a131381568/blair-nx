import { Injectable } from '@nestjs/common';
import { tryit } from 'radash';
import { PrismaService } from '../shared/prisma.service';
import { ApiResponse, createApiResponse } from '../../core/interceptors/api-response';
import type { GetAboutInfoDto, UpdateAboutInfoDto } from './about-info-schemas';
import { updateAboutInfoSchema } from './about-info-schemas';

@Injectable()
export class AboutInfoService {
	constructor(private prisma: PrismaService) {}

	async getAboutInfo(): Promise<ApiResponse<GetAboutInfoDto>> {
		const [err, res] = await tryit(this.prisma.aboutInfo.findUnique)({
			where: { aboutId: 1 },
		});
		if (err || !res) {
			return createApiResponse(false, {
				visual: '',
				slogan: '',
				philosophy: '',
				quote: '',
				epilogue: '',
				aboutId: null,
			});
		}
		return createApiResponse(true, res);
	}

	async updateAboutInfo(data: UpdateAboutInfoDto): Promise<ApiResponse<UpdateAboutInfoDto>> {
		try {
			const validatedData = updateAboutInfoSchema.parse(data);

			const [err] = await tryit(this.prisma.aboutInfo.update)({
				where: { aboutId: 1 },
				data: validatedData,
			});
			if (err)
				return createApiResponse(false, data, 'Update failed');
			return createApiResponse(true, data, 'Update success');
		}
		catch (error) {
			return createApiResponse(false, data, 'Validated failed');
		}
	}
}
