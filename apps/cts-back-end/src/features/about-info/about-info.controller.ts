import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetAboutInfoBaseDto, UpdateAboutInfoDto } from '@cts-shared/types/about-info.types';
import { ApiResponse } from '../../core/interceptors/api-response';
import { AboutInfoService } from './about-info.service';

@Controller('about-info')
export class AboutInfoController {
	constructor(private readonly aboutService: AboutInfoService) {}

	@Get()
	async getAboutInfo(): Promise<ApiResponse<GetAboutInfoBaseDto>> {
		return this.aboutService.getAboutInfo();
	}

	@UseGuards(AuthGuard('jwt'))
	@Post()
	async updateAboutInfo(@Body() data: UpdateAboutInfoDto): Promise<ApiResponse<null>> {
		return this.aboutService.updateAboutInfo({ data });
	}
}
