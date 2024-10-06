// apps/cts-back-end/src/shared/prisma.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
	providers: [PrismaService],
	exports: [PrismaService],
})
export class PrismaModule {}
