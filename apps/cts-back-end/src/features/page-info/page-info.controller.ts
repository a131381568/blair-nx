import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '../../core/interceptors/api-response';
import { PageInfoService } from './page-info.service';
import { PageListDto } from './page-info-schemas';

@Controller('page-info')
export class PageInfoController {
	constructor(private readonly pageInfoService: PageInfoService) {}

	@Get()
	getObservatoriesList(): Promise<ApiResponse<PageListDto>> {
		return this.pageInfoService.getObservatoriesList();
	}
}