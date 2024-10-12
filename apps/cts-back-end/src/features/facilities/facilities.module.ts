import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { FacilitiesController } from './facilities.controller';
import { FacilitiesService } from './facilities.service';

@Module({
	imports: [PrismaModule.forRoot()],
	controllers: [FacilitiesController],
	providers: [FacilitiesService],
})
export class FacilitiesModule {}
