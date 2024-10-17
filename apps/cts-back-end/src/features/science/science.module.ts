import { Module } from '@nestjs/common';
import { PrismaModule } from '../shared/prisma.module';
import { ScienceService } from './science.service';
import { ScienceController } from './science.controller';
import { ScienceSearchService } from './service/science-search.service';

@Module({
	imports: [PrismaModule],
	controllers: [ScienceController],
	providers: [ScienceService, ScienceSearchService],
})
export class ScienceModule {}
