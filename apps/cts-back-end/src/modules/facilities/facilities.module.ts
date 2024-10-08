import { Module } from '@nestjs/common';
import { PrismaModule } from '../../shared/prisma.module';
import { FacilitiesController } from './facilities.controller';
import { FacilitiesService } from './facilities.service';

@Module({
	imports: [PrismaModule],
	controllers: [FacilitiesController],
	providers: [FacilitiesService],
})
export class FacilitiesModule {}
