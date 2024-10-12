import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { PostCategoriesService } from './post-categories.service';
import { PostCategoriesController } from './post-categories.controller';

@Module({
	imports: [PrismaModule.forRoot()],
	controllers: [PostCategoriesController],
	providers: [PostCategoriesService],
})
export class PostCategoriesModule {}
