import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiResponse } from '../../core/interceptors/api-response';
import { NanoIdDto } from '../../common/dto/id.dto';
import { ApiResponseInterceptor } from '../../core/interceptors/api-response.interceptor';
import { FacilitiesService } from './facilities.service';
import type { CreateFacilityItemDto, FacilityItemBaseDto, GetFacilitiesListBaseDto, UpdateFacilityItemDto } from './facilities-schemas';

@Controller('facilities')
@UseInterceptors(ApiResponseInterceptor)
export class FacilitiesController {
	constructor(private readonly facilitiesService: FacilitiesService) {}

	@Get()
	getFacilitiesList(): Promise<ApiResponse<GetFacilitiesListBaseDto>> {
		return this.facilitiesService.getFacilitiesList();
	}

	@Get(':id')
	getFacilityItem(@Param('id') id: NanoIdDto): Promise<ApiResponse<FacilityItemBaseDto>> {
		return this.facilitiesService.getFacilityItem({ id });
	}

	@Put(':id')
	async updateFacilityItem(@Param('id') id: NanoIdDto, @Body() data: UpdateFacilityItemDto): Promise<ApiResponse<null>> {
		return this.facilitiesService.updateFacilityItem({ id, data });
	}

	@Post('create')
	async createFacilityItem(@Body() data: CreateFacilityItemDto): Promise<any> {
		return this.facilitiesService.createFacilityItem({ data });
	}

	@Delete(':id')
	async deleteFacilityItem(@Param('id') id: NanoIdDto): Promise<any> {
		return this.facilitiesService.deleteFacilityItem({ id });
	}
}
