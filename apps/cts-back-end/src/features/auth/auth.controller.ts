import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	async login(@Body() body: { email: string; password: string }) {
		const user = await this.authService.validateUser(body.email, body.password);
		if (!user) {
			throw new UnauthorizedException();
		}
		return this.authService.login(user);
	}

	@Post('refresh')
	refreshToken(@Body('refresh_token') refreshToken: string) {
		return this.authService.refreshToken(refreshToken);
	}
}
