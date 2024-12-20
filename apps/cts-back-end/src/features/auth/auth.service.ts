import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { pick, tryit } from 'radash';
import { AUTH_CONFIG, AccessTokenDto, GetTokenDto, LoginInputDto, RefreshTokenDto, ValidateUserResDto } from '@cts-shared';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async validateUser({ data }: { data: LoginInputDto }): Promise<ValidateUserResDto> {
		const { success: hasMail, data: userData } = await this.usersService.getPassByEmail({ data: {
			email: data.email,
		} });

		if (hasMail && userData && userData.password) {
			const passIsSame = await compare(data.password, userData.password);
			if (!passIsSame)
				return { userInfo: null, msg: '密碼不正確' }; // Password incorrect
			return { userInfo: userData, msg: '驗證成功' }; // ValidateUser success
		}
		return { userInfo: null, msg: '驗證失敗' }; // Validation error
	}

	async getAllToken({ data }: { data: GetTokenDto }) {
		const payload = pick(data, ['email', 'nanoId']);
		return {
			accessToken: this.jwtService.sign(payload), // auth.module.ts (expiresIn: JwtModule.signOptions)
			refreshToken: this.jwtService.sign(payload, { expiresIn: AUTH_CONFIG.REFRESH_EXPIRY }),
		};
	}

	async refreshToken({ data }: { data: RefreshTokenDto }): Promise<AccessTokenDto | string> {
		const [err, payload] = await tryit(this.jwtService.verify.bind(this.jwtService))(
			data.refreshToken,
			{ secret: process.env.JWT_SECRET },
		);

		if (err)
			return '生成 refresh token 失敗'; // Generate refresh token fail

		return { accessToken: this.jwtService.sign({ email: payload.email, nanoId: payload.nanoId }) };
	}
}
