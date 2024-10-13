import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse } from '../../core/interceptors/api-response';
import { NanoIdDto } from '../../common/dto/id.dto';
import { StargazingService } from './stargazing.service';
import { StargazingItemDetailDto, StargazingListWithPagiDto, StargazingQueryDto } from './stargazing-schemas';

@Controller('stargazing')
export class StargazingController {
	constructor(private readonly stargazingService: StargazingService) {}

	@Get()
	getScienceList(@Query() data: StargazingQueryDto): Promise<ApiResponse<StargazingListWithPagiDto>> {
		return this.stargazingService.getStargazingQuery(data);
	}

	@Get(':id')
	getStargazingDetail(@Param('id') id: NanoIdDto): Promise<ApiResponse<StargazingItemDetailDto>> {
		return this.stargazingService.getStargazingDetail(id);
	}
}
