import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}
	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@Post('register')
	async register(@Body() body: { name: string; email: string; password: string }) {
		return this.usersService.registerUser(body.name, body.email, body.password);
	}
}
