import { Module } from '@nestjs/common';
import { PrismaModule } from '../shared/prisma.module';
import { ObservatoriesService } from './observatories.service';
import { ObservatoriesController } from './observatories.controller';

@Module({
	imports: [PrismaModule],
	controllers: [ObservatoriesController],
	providers: [ObservatoriesService],
})
export class ObservatoriesModule {}
