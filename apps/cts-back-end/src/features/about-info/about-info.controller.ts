import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse } from '../../core/interceptors/api-response';
import { AboutInfoService } from './about-info.service';
import type { GetAboutInfoBaseDto, UpdateAboutInfoDto } from './about-info-schemas';
// import { AuthGuard } from '@nestjs/passport';

@Controller('about-info')
export class AboutInfoController {
	constructor(private readonly aboutService: AboutInfoService) {}
	// @UseGuards(AuthGuard('jwt'))
	@Get()
	async getAboutInfo(): Promise<ApiResponse<GetAboutInfoBaseDto>> {
		return this.aboutService.getAboutInfo();
	}

	@Post()
	async updateAboutInfo(@Body() data: UpdateAboutInfoDto): Promise<ApiResponse<null>> {
		return this.aboutService.updateAboutInfo({ data });
	}
}
