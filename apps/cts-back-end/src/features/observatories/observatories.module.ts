import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { ObservatoriesService } from './observatories.service';
import { ObservatoriesController } from './observatories.controller';

@Module({
	imports: [PrismaModule.forRoot()],
	controllers: [ObservatoriesController],
	providers: [ObservatoriesService],
})
export class ObservatoriesModule {}
