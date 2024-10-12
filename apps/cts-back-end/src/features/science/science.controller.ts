import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse } from '../../core/interceptors/api-response';
import { StrIdDto } from '../../common/dto/id.dto';
import { ScienceService } from './science.service';
import { CreateScienceDto, ScienceItemDto, ScienceListWithPagiDto, ScienceQueryDto } from './science-schemas';

@Controller('science')
export class ScienceController {
	constructor(private readonly scienceService: ScienceService) {}

	@Get()
	getScienceList(@Body() data: ScienceQueryDto): Promise<ApiResponse<ScienceListWithPagiDto>> {
		return this.scienceService.getScienceList(data);
	}

	@Get(':id')
	getScienceDetail(@Param('id') id: StrIdDto): Promise<ApiResponse<ScienceItemDto>> {
		return this.scienceService.getScienceDetail(id);
	}

	@Post('create')
	async createScienceItem(@Body() data: CreateScienceDto): Promise<ApiResponse<null>> {
		return this.scienceService.createScienceItem(data);
	}
}
