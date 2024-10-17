import { Module } from '@nestjs/common';
import { PrismaModule } from '../shared/prisma.module';
import { StargazingService } from './stargazing.service';
import { StargazingController } from './stargazing.controller';

@Module({
	imports: [PrismaModule],
	providers: [StargazingService],
	controllers: [StargazingController],
})
export class StargazingModule {}
