import { Module } from '@nestjs/common';
import { AboutInfoModule } from './modules/about-info/about-info.module';
import { PrismaModule } from './shared/prisma.module';
import { FacilitiesModule } from './modules/facilities/facilities.module';

@Module({
	imports: [AboutInfoModule, PrismaModule, FacilitiesModule],
	// controllers: [AppController],
	// providers: [AppService],
})
export class AppModule {}
