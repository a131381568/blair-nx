import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { PageInfoService } from './page-info.service';
import { PageInfoController } from './page-info.controller';

@Module({
	imports: [PrismaModule.forRoot()],
	controllers: [PageInfoController],
	providers: [PageInfoService],
})
export class PageInfoModule {}
