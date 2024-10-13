import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
	providers: [UsersService, PrismaService],
	exports: [UsersService],
	controllers: [UsersController],
})
export class UsersModule {}
