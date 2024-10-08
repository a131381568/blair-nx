import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import type { AboutInfo } from '@prisma/client';
import { AboutInfoService } from './about-info.service';
import type { UpdateAboutInfoDto } from './about-info-schemas';

@Controller('about-info')
export class AboutInfoController {
	constructor(private readonly aboutService: AboutInfoService) {}

	@Get()
	async getAboutInfo(): Promise<AboutInfo> {
		const aboutInfo = await this.aboutService.getAboutInfo();
		if (!aboutInfo) {
			throw new NotFoundException('About info not found');
		}
		return aboutInfo;
	}

	@Post()
	async updateAboutInfo(@Body() aboutInofData: UpdateAboutInfoDto): Promise<AboutInfo> {
		return this.aboutService.updateAboutInfo(aboutInofData);
	}
}
