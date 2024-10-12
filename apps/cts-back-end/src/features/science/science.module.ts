import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { ScienceService } from './science.service';
import { ScienceController } from './science.controller';

@Module({
	imports: [PrismaModule.forRoot()],
	controllers: [ScienceController],
	providers: [ScienceService],
})
export class ScienceModule {}
