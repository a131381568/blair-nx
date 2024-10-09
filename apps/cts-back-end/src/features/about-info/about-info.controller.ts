import { Body, Controller, Get, NotFoundException, Post, UseInterceptors } from '@nestjs/common';
import { ApiResponseInterceptor } from '../../core/interceptors/api-response.interceptor';
import { ApiResponse } from '../../core/interceptors/api-response';
import { AboutInfoService } from './about-info.service';
import type { GetAboutInfoDto, UpdateAboutInfoDto } from './about-info-schemas';

@Controller('about-info')
@UseInterceptors(ApiResponseInterceptor)
export class AboutInfoController {
	constructor(private readonly aboutService: AboutInfoService) {}

	@Get()
	async getAboutInfo(): Promise<ApiResponse<GetAboutInfoDto>> {
		const aboutInfo = await this.aboutService.getAboutInfo();
		if (!aboutInfo) {
			throw new NotFoundException('About info not found');
		}
		return aboutInfo;
	}

	@Post()
	async updateAboutInfo(@Body() aboutInofData: UpdateAboutInfoDto): Promise<ApiResponse<UpdateAboutInfoDto>> {
		return this.aboutService.updateAboutInfo(aboutInofData);
	}
}
