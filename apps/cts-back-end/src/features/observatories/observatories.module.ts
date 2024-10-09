import { Module } from '@nestjs/common';
import { ObservatoriesService } from './observatories.service';
import { ObservatoriesController } from './observatories.controller';

@Module({
	providers: [ObservatoriesService],
	controllers: [ObservatoriesController],
})
export class ObservatoriesModule {}
