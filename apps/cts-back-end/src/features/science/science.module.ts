import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { ScienceService } from './science.service';
import { ScienceController } from './science.controller';
import { ScienceSearchService } from './service/science-search.service';
import { ScienceUpdateService } from './service/science-update.service';

@Module({
	imports: [PrismaModule.forRoot()],
	controllers: [ScienceController],
	providers: [ScienceService, ScienceSearchService, ScienceUpdateService],
})
export class ScienceModule {}
