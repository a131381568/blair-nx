import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { ApiResponseInterceptor } from '../../core/interceptors/api-response.interceptor';
import { ApiResponse } from '../../core/interceptors/api-response';
import { AboutInfoService } from './about-info.service';
import type { GetAboutInfoBaseDto, UpdateAboutInfoDto } from './about-info-schemas';

@Controller('about-info')
@UseInterceptors(ApiResponseInterceptor)
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
