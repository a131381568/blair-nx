import { Module } from '@nestjs/common';
import { PrismaModule } from '../shared/prisma.module';
import { PageInfoService } from './page-info.service';
import { PageInfoController } from './page-info.controller';

@Module({
	imports: [PrismaModule],
	controllers: [PageInfoController],
	providers: [PageInfoService],
})
export class PageInfoModule {}
