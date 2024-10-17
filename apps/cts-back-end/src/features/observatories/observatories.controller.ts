import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '../../core/interceptors/api-response';
import { NanoIdDto } from '../../common/dto/id.dto';
import { ObservatoriesService } from './observatories.service';
import { ObservatoriesListDto, ObservatoryItemDto, UpdateObservatoryItemDto } from './observatories-schemas';

@Controller('observatories')
export class ObservatoriesController {
	constructor(private readonly observatoriesService: ObservatoriesService) {}

	@Get()
	getObservatoriesList(): Promise<ApiResponse<ObservatoriesListDto>> {
		return this.observatoriesService.getObservatoriesList();
	}

	@Get(':id')
	getObservatoryItem(@Param('id') id: NanoIdDto): Promise<ApiResponse<ObservatoryItemDto>> {
		return this.observatoriesService.getObservatoryItem({ id });
	}

	@UseGuards(AuthGuard('jwt'))
	@Put(':id')
	async updateObservatoryItem(@Param('id') id: NanoIdDto, @Body() data: UpdateObservatoryItemDto): Promise<ApiResponse<null>> {
		return this.observatoriesService.updateObservatoryItem({ id, data });
	}

	@UseGuards(AuthGuard('jwt'))
	@Post('create')
	async createObservatoryItem(@Body() data: UpdateObservatoryItemDto): Promise<ApiResponse<null>> {
		return this.observatoriesService.createObservatoryItem({ data });
	}

	@UseGuards(AuthGuard('jwt'))
	@Delete(':id')
	async deleteFacilityItem(@Param('id') id: NanoIdDto): Promise<ApiResponse<null>> {
		return this.observatoriesService.deleteFacilityItem({ id });
	}
}
