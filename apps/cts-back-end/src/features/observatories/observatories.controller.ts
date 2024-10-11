import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse } from '../../core/interceptors/api-response';
import { StrIdDto } from '../../common/dto/id.dto';
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
	getObservatoryItem(@Param('id') id: StrIdDto): Promise<ApiResponse<ObservatoryItemDto>> {
		return this.observatoriesService.getObservatoryItem(id);
	}

	@Put(':id')
	async updateObservatoryItem(@Param('id') id: StrIdDto, @Body() data: UpdateObservatoryItemDto): Promise<ApiResponse<null>> {
		return this.observatoriesService.updateObservatoryItem(id, data);
	}

	@Post('create')
	async createObservatoryItem(@Body() data: UpdateObservatoryItemDto): Promise<ApiResponse<null>> {
		return this.observatoriesService.createObservatoryItem(data);
	}

	@Delete(':id')
	async deleteFacilityItem(@Param('id') id: StrIdDto): Promise<ApiResponse<null>> {
		return this.observatoriesService.deleteFacilityItem(id);
	}
}