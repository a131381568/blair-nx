import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { AboutInfoController } from './about-info.controller';
import { AboutInfoService } from './about-info.service';

@Module({
	imports: [PrismaModule.forRoot()],
	controllers: [AboutInfoController],
	providers: [AboutInfoService],
})
export class AboutInfoModule {}
