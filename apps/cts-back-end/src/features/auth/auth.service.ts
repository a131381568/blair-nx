import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async validateUser(email: string, pass: string): Promise<any> {
		const user = await this.usersService.findByEmail(email);
		if (user && user.password && await compare(pass, user.password)) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async login(user: any) {
		const payload = { email: user.email, sub: user.orderId };
		return {
			access_token: this.jwtService.sign(payload),
			refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
		};
	}

	refreshToken(refreshToken: string) {
		try {
			const payload = this.jwtService.verify(refreshToken, { secret: process.env.JWT_SECRET });
			return {
				access_token: this.jwtService.sign({ email: payload.email, sub: payload.sub }),
			};
		}
		catch (e) {
			throw new UnauthorizedException('Invalid refresh token');
		}
	}
}
