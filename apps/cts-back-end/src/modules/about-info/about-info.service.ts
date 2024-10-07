import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import type { AboutInfo } from '@prisma/client';
import { z } from 'zod';
import { PrismaService } from '../../shared/prisma.service';
import type { UpdateAboutInfoDto } from './about-info-schemas';
import { updateAboutInfoSchema } from './about-info-schemas';

@Injectable()
export class AboutInfoService {
	constructor(private prisma: PrismaService) {}

	async getAboutInfo(): Promise<AboutInfo> {
		const info = await this.prisma.aboutInfo.findUnique({
			where: { aboutId: 1 },
		});
		if (!info) {
			throw new NotFoundException(`About is not found`);
		}
		return info;
	}

	async updateAboutInfo(data: UpdateAboutInfoDto): Promise<AboutInfo> {
		try {
			const validatedData = updateAboutInfoSchema.parse(data);
			return await this.prisma.aboutInfo.update({
				where: { aboutId: 1 },
				data: validatedData,
			});
		}
		catch (error: unknown) {
			if (error instanceof z.ZodError) {
				throw new BadRequestException(error);
			}
			throw error;
		}
	}
}
