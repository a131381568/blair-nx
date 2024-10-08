import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { UpdateResponsetDto } from '../../common/shared-schemas';
import { AboutInfoService } from './about-info.service';
import type { GetAboutInfoDto, UpdateAboutInfoDto } from './about-info-schemas';

@Controller('about-info')
export class AboutInfoController {
	constructor(private readonly aboutService: AboutInfoService) {}

	@Get()
	async getAboutInfo(): Promise<GetAboutInfoDto> {
		const aboutInfo = await this.aboutService.getAboutInfo();
		if (!aboutInfo) {
			throw new NotFoundException('About info not found');
		}
		return aboutInfo;
	}

	@Post()
	async updateAboutInfo(@Body() aboutInofData: UpdateAboutInfoDto): Promise<UpdateResponsetDto> {
		return this.aboutService.updateAboutInfo(aboutInofData);
	}
}
