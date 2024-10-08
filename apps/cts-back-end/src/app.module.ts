import { Module } from '@nestjs/common';
import { AboutInfoModule } from './features/about-info/about-info.module';
import { PrismaModule } from './features/shared/prisma.module';
import { FacilitiesModule } from './features/facilities/facilities.module';

@Module({
	imports: [AboutInfoModule, PrismaModule, FacilitiesModule],
	// controllers: [AppController],
	// providers: [AppService],
})
export class AppModule {}
