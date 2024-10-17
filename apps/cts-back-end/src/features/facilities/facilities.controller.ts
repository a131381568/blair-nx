import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '../../core/interceptors/api-response';
import { NanoIdDto } from '../../common/dto/id.dto';
import { FacilitiesService } from './facilities.service';
import type { CreateFacilityItemDto, FacilityItemBaseDto, GetFacilitiesListBaseDto, UpdateFacilityItemDto } from './facilities-schemas';

@Controller('facilities')
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

	@UseGuards(AuthGuard('jwt'))
	@Put(':id')
	async updateFacilityItem(@Param('id') id: NanoIdDto, @Body() data: UpdateFacilityItemDto): Promise<ApiResponse<null>> {
		return this.facilitiesService.updateFacilityItem({ id, data });
	}

	@UseGuards(AuthGuard('jwt'))
	@Post('create')
	async createFacilityItem(@Body() data: CreateFacilityItemDto): Promise<any> {
		return this.facilitiesService.createFacilityItem({ data });
	}

	@UseGuards(AuthGuard('jwt'))
	@Delete(':id')
	async deleteFacilityItem(@Param('id') id: NanoIdDto): Promise<any> {
		return this.facilitiesService.deleteFacilityItem({ id });
	}
}
