import { Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import pagination from 'prisma-extension-pagination';

export const PRISMA_CLIENT = Symbol('PRISMA_CLIENT');

export const InjectPrismaClient = () => Inject(PRISMA_CLIENT);

export const extendedPrismaClient = new PrismaClient().$extends(pagination());

export type ExtendedPrismaClient = typeof extendedPrismaClient;
