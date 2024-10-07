import { Module } from '@nestjs/common';
import { AboutInfoModule } from './modules/about-info/about-info.module';
import { PrismaModule } from './shared/prisma.module';

@Module({
	imports: [AboutInfoModule, PrismaModule],
	// controllers: [AppController],
	// providers: [AppService],
})
export class AppModule {}
