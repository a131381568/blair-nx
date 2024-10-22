import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StargazingItemDetailDto, StargazingListWithPagiDto, StargazingQueryDto, UpdateStargazingDetailDto } from '@cts-shared/types/stargazing.types';
import { NanoIdDto } from '@cts-shared/dto/id.dto';
import { ApiResponse } from '../../core/interceptors/api-response';
import { StargazingService } from './stargazing.service';

@Controller('stargazing')
export class StargazingController {
	constructor(private readonly stargazingService: StargazingService) {}

	@Get()
	getScienceList(@Query() data: StargazingQueryDto): Promise<ApiResponse<StargazingListWithPagiDto>> {
		return this.stargazingService.getStargazingQuery({ data });
	}

	@Get(':id')
	getStargazingDetail(@Param('id') id: NanoIdDto): Promise<ApiResponse<StargazingItemDetailDto>> {
		return this.stargazingService.getStargazingDetail({ id });
	}

	@UseGuards(AuthGuard('jwt'))
	@Post('create')
	async createStargazingDetail(@Body() data: UpdateStargazingDetailDto): Promise<ApiResponse<null>> {
		return this.stargazingService.createStargazingDetail({ data });
	}

	@UseGuards(AuthGuard('jwt'))
	@Put(':id')
	async updateStargazingDetail(@Param('id') id: NanoIdDto, @Body() data: UpdateStargazingDetailDto): Promise<ApiResponse<null>> {
		return this.stargazingService.updateStargazingDetail({ id, data });
	}

	@UseGuards(AuthGuard('jwt'))
	@Delete(':id')
	async deleteStargazingDetail(@Param('id') id: NanoIdDto): Promise<ApiResponse<null>> {
		return this.stargazingService.deleteStargazingDetail({ id });
	}
}
