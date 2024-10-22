import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateScienceDto, ScienceItemDto, ScienceListWithPagiDto, ScienceQueryDto } from '@cts-shared/types/science.types';
import { StrIdDto } from '@cts-shared/dto/id.dto';
import { ApiResponse } from '../../core/interceptors/api-response';
import { ScienceService } from './science.service';

@Controller('science')
export class ScienceController {
	constructor(private readonly scienceService: ScienceService) {}

	@Get()
	getScienceList(@Query() data: ScienceQueryDto): Promise<ApiResponse<ScienceListWithPagiDto>> {
		return this.scienceService.getScienceList({ data });
	}

	@Get(':id')
	getScienceDetail(@Param('id') id: StrIdDto): Promise<ApiResponse<ScienceItemDto>> {
		return this.scienceService.getScienceDetail({ id });
	}

	@UseGuards(AuthGuard('jwt'))
	@Put(':id')
	async updateScienceDetail(@Param('id') id: StrIdDto, @Body() data: CreateScienceDto): Promise<ApiResponse<null>> {
		return this.scienceService.updateScienceDetail({ id, data });
	}

	@UseGuards(AuthGuard('jwt'))
	@Post('create')
	async createScienceDetail(@Body() data: CreateScienceDto): Promise<ApiResponse<null>> {
		return this.scienceService.createScienceDetail({ data });
	}

	@UseGuards(AuthGuard('jwt'))
	@Delete(':id')
	async deleteScienceDetail(@Param('id') id: StrIdDto): Promise<ApiResponse<null>> {
		return this.scienceService.deleteScienceDetail({ id });
	}
}
