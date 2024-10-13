import { Module } from '@nestjs/common';
import { StargazingService } from './stargazing.service';
import { StargazingController } from './stargazing.controller';

@Module({
	providers: [StargazingService],
	controllers: [StargazingController],
})
export class StargazingModule {}
