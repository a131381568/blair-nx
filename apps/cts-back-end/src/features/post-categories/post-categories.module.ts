import { Module } from '@nestjs/common';
import { PrismaModule } from '../shared/prisma.module';
import { PostCategoriesService } from './post-categories.service';
import { PostCategoriesController } from './post-categories.controller';

@Module({
	imports: [PrismaModule],
	controllers: [PostCategoriesController],
	providers: [PostCategoriesService],
})
export class PostCategoriesModule {}
