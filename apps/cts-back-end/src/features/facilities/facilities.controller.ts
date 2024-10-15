import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse } from '../../core/interceptors/api-response';
import { StrIdDto } from '../../common/dto/id.dto';
import { FacilitiesService } from './facilities.service';
import type { CreateFacilityItemDto, FacilityItemBaseDto, GetFacilitiesListBaseDto, GetFacilitiesListDto, UpdateFacilityItemDto } from './facilities-schemas';

@Controller('facilities')

export class FacilitiesController {
	constructor(private readonly facilitiesService: FacilitiesService) {}

	@Get()
	getFacilitiesList(): Promise<ApiResponse<GetFacilitiesListBaseDto>> {
		return this.facilitiesService.getFacilitiesList();
	}

	@Get(':id')
	getFacilityItem(@Param('id') id: StrIdDto): Promise<ApiResponse<FacilityItemBaseDto>> {
		return this.facilitiesService.getFacilityItem(id);
	}

	@Put(':id')
	async updateFacilityItem(@Param('id') id: StrIdDto, @Body() data: UpdateFacilityItemDto): Promise<ApiResponse<null>> {
		return this.facilitiesService.updateFacilityItem(id, data);
	}

	@Post('create')
	async createFacilityItem(@Body() data: CreateFacilityItemDto): Promise<ApiResponse<null>> {
		return this.facilitiesService.createFacilityItem(data);
	}

	@Delete(':id')
	async deleteFacilityItem(@Param('id') id: StrIdDto): Promise<ApiResponse<null>> {
		return this.facilitiesService.deleteFacilityItem(id);
	}
}
