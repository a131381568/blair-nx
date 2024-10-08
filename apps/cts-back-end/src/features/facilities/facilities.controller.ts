import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UpdateResponsetDto } from '../../common/shared-schemas';
import { FacilitiesService } from './facilities.service';
import type { CreateFacilityItemDto, GetFacilitiesListBaseDto, GetFacilityItemFullDto, UpdateFacilityItemDto } from './facilities-schemas';

@Controller('facilities')
export class FacilitiesController {
	constructor(private readonly facilitiesService: FacilitiesService) {}

	@Get()
	async getFacilitiesList(): Promise<GetFacilitiesListBaseDto> {
		const list = await this.facilitiesService.getFacilitiesList();
		if (!list.length) {
			throw new NotFoundException('No facilities found');
		}
		return list;
	}

	@Get(':id')
	async getFacilityItem(@Param('id', ParseIntPipe) id: number): Promise<GetFacilityItemFullDto> {
		const item = await this.facilitiesService.getFacilityItem(id);
		if (!item) {
			throw new NotFoundException('No facility found');
		}
		return item;
	}

	@Put(':id')
	async updateFacilityItem(
		@Param('id', ParseIntPipe) id: number,
		@Body() data: UpdateFacilityItemDto,
	): Promise<UpdateResponsetDto> {
		return this.facilitiesService.updateFacilityItem(id, data);
	}

	@Post('create')
	async createFacilityItem(@Body() data: CreateFacilityItemDto): Promise<UpdateResponsetDto> {
		return this.facilitiesService.createFacilityItem(data);
	}

	@Delete(':id')
	async deleteFacilityItem(@Param('id', ParseIntPipe) id: number): Promise<UpdateResponsetDto> {
		return this.facilitiesService.deleteFacilityItem(id);
	}
}
