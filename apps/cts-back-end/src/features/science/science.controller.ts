import { Body, Controller, Get } from '@nestjs/common';
import { ApiResponse } from '../../core/interceptors/api-response';
import { ScienceService } from './science.service';
import { ScienceListWithPagiDto, ScienceQueryDto } from './science-schemas';

@Controller('science')
export class ScienceController {
	constructor(private readonly scienceService: ScienceService) {}

	@Get()
	getScienceList(@Body() data: ScienceQueryDto): Promise<ApiResponse<ScienceListWithPagiDto>> {
		return this.scienceService.getScienceList(data);
	}
}
