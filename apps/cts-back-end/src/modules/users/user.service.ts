import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import type { User } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PrismaService } from '../../shared/prisma.service';
import type { CreateUserDto, UpdateUserDto } from './user-schemas';
import { createUserSchema, updateUserSchema } from './user-schemas';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getAllUsers(): Promise<User[]> {
		return this.prisma.user.findMany();
	}

	async getUserById(id: number): Promise<User> {
		const user = await this.prisma.user.findUnique({ where: { id } });
		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`);
		}
		return user;
	}

	async createUser(data: CreateUserDto): Promise<User> {
		try {
			const validatedData = createUserSchema.parse(data);
			return await this.prisma.user.create({ data: validatedData });
		}
		catch (error: unknown) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ConflictException('Email already exists');
				}
			}
			if (error instanceof z.ZodError) {
				throw new BadRequestException(error);
			}
			throw error;
		}
	}

	async updateUser(id: number, data: UpdateUserDto): Promise<User> {
		try {
			const validatedData = updateUserSchema.parse(data);
			return await this.prisma.user.update({
				where: { id },
				data: validatedData,
			});
		}
		catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') {
					throw new NotFoundException(`User with ID ${id} not found`);
				}
			}
			if (error instanceof z.ZodError) {
				throw new BadRequestException(error.errors);
			}
			throw error;
		}
	}

	async deleteUser(id: number): Promise<User> {
		try {
			return await this.prisma.user.delete({
				where: { id },
			});
		}
		catch (error: unknown) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') {
					throw new NotFoundException(`User with ID ${id} not found`);
				}
			}
			throw error;
		}
	}
}
