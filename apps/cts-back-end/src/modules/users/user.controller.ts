import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import type { User } from '@prisma/client';
import { UserService } from './user.service';
import type { CreateUserDto, UpdateUserDto } from './user-schemas';

@Controller('users')
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	async getAllUsers(): Promise<User[]> {
		return this.userService.getAllUsers();
	}

	@Get(':id')
	async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
		return this.userService.getUserById(id);
	}

	@Post()
	async createUser(@Body() userData: CreateUserDto): Promise<User> {
		return this.userService.createUser(userData);
	}

	@Put(':id')
	async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: UpdateUserDto,
	): Promise<User> {
		return this.userService.updateUser(id, userData);
	}

	@Delete(':id')
	@HttpCode(204)
	async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
		await this.userService.deleteUser(id);
	}
}
