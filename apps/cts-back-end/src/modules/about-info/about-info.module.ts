import { Module } from '@nestjs/common';
import { PrismaModule } from '../../shared/prisma.module';
import { AboutInfoController } from './about-info.controller';
import { AboutInfoService } from './about-info.service';

@Module({
	imports: [PrismaModule],
	controllers: [AboutInfoController],
	providers: [AboutInfoService],
})
export class AboutInfoModule {}
