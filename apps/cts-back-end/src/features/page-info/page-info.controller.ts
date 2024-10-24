import { Controller, Get } from '@nestjs/common';
import { ApiResponse, PageListDto } from '@cts-shared';
import { PageInfoService } from './page-info.service';

@Controller('page-info')
export class PageInfoController {
	constructor(private readonly pageInfoService: PageInfoService) {}

	@Get()
	getObservatoriesList(): Promise<ApiResponse<PageListDto>> {
		return this.pageInfoService.getObservatoriesList();
	}
}
