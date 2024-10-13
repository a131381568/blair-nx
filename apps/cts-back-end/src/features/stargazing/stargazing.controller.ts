import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse } from '../../core/interceptors/api-response';
import { StargazingService } from './stargazing.service';
import { StargazingListWithPagiDto, StargazingQueryDto } from './stargazing-schemas';

@Controller('stargazing')
export class StargazingController {
	constructor(private readonly stargazingService: StargazingService) {}

	@Get()
	getScienceList(@Query() data: StargazingQueryDto): Promise<ApiResponse<StargazingListWithPagiDto>> {
		return this.stargazingService.getStargazingQuery(data);
	}
}
