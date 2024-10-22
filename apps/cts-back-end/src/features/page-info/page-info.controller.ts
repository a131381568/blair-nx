import { Controller, Get } from '@nestjs/common';
import { PageListDto } from '@cts-shared/types/page-info.types';
import { ApiResponse } from '../../core/interceptors/api-response';
import { PageInfoService } from './page-info.service';

@Controller('page-info')
export class PageInfoController {
	constructor(private readonly pageInfoService: PageInfoService) {}

	@Get()
	getObservatoriesList(): Promise<ApiResponse<PageListDto>> {
		return this.pageInfoService.getObservatoriesList();
	}
}
