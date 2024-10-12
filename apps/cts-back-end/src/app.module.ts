import { Module } from '@nestjs/common';
import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';
import { PrismaModule } from './features/shared/prisma.module';
import { AboutInfoModule } from './features/about-info/about-info.module';
import { PageInfoModule } from './features/page-info/page-info.module';
import { FacilitiesModule } from './features/facilities/facilities.module';
import { ObservatoriesModule } from './features/observatories/observatories.module';
import { ScienceModule } from './features/science/science.module';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { PrismaClientExceptionFilter } from './core/filter/prisma-client-exception.filter';
import { PostCategoriesModule } from './features/post-categories/post-categories.module';

@Module({
	imports: [AboutInfoModule, PrismaModule, FacilitiesModule, ObservatoriesModule, PageInfoModule, PostCategoriesModule, ScienceModule],
	providers: [
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
		{
			provide: APP_FILTER,
			useFactory: ({ httpAdapter }: HttpAdapterHost) => {
				return new PrismaClientExceptionFilter(httpAdapter);
			},
			inject: [HttpAdapterHost],
		},
	],
})
export class AppModule {}
