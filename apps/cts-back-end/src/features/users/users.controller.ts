import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterPayloadDto, userBaseFitDto } from '../shared/users-schemas';
import { ApiResponse } from '../../core/interceptors/api-response';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@UseGuards(AuthGuard('jwt'))
	@Get()
	getUserList(): Promise<ApiResponse<userBaseFitDto[]>> {
		return this.usersService.getUserList();
	}

	@Post('register')
	register(@Body() data: RegisterPayloadDto): Promise<ApiResponse<null>> {
		return this.usersService.registerUser({ data });
	}
}
