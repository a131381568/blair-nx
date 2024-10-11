import { Module } from '@nestjs/common';
import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';
import { AboutInfoModule } from './features/about-info/about-info.module';
import { PageInfoModule } from './features/page-info/page-info.module';
import { PrismaModule } from './features/shared/prisma.module';
import { FacilitiesModule } from './features/facilities/facilities.module';
import { ObservatoriesModule } from './features/observatories/observatories.module';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { PrismaClientExceptionFilter } from './core/filter/prisma-client-exception.filter';

@Module({
	imports: [AboutInfoModule, PrismaModule, FacilitiesModule, ObservatoriesModule, PageInfoModule],
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
