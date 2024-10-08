import { Injectable } from '@nestjs/common';
import { tryit } from 'radash';
import { PrismaService } from '../shared/prisma.service';
import { UpdateResponsetDto } from '../../common/shared-schemas';
import { generateResult } from '../../common/update-response';
import type { GetAboutInfoDto, UpdateAboutInfoDto } from './about-info-schemas';
import { updateAboutInfoSchema } from './about-info-schemas';

@Injectable()
export class AboutInfoService {
	constructor(private prisma: PrismaService) {}

	async getAboutInfo(): Promise<GetAboutInfoDto> {
		const [err, res] = await tryit(this.prisma.aboutInfo.findUnique)({
			where: { aboutId: 1 },
		});
		if (err || !res) {
			return {
				visual: '',
				slogan: '',
				philosophy: '',
				quote: '',
				epilogue: '',
				aboutId: 1,
			};
		}
		return res;
	}

	async updateAboutInfo(data: UpdateAboutInfoDto): Promise<UpdateResponsetDto> {
		try {
			const validatedData = updateAboutInfoSchema.parse(data);

			const [err] = await tryit(this.prisma.aboutInfo.update)({
				where: { aboutId: 1 },
				data: validatedData,
			});
			if (err)
				return generateResult(false, data, 'Update failure');
			return generateResult(true, data, 'Update success');
		}
		catch (error: unknown) {
			return generateResult(false, data, 'Validated failed');
		}
	}
}
