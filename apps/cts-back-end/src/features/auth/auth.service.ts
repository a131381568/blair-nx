import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { pick, tryit } from 'radash';
import { UsersService } from '../users/users.service';
import { ErrorAdditional, ValidationAdditional } from '../shared/response-handler';
import { ApiResponse, createApiResponse } from '../../core/interceptors/api-response';
import { AccessTokenDto, GetTokenDto, LoginInputDto, RefreshTokenDto, UserBaseDto, getTokenSchema, loginInputSchema, refreshTokenSchema } from '../shared/users-schemas';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	@ValidationAdditional(loginInputSchema)
	@ErrorAdditional()
	async validateUser({ data }: { data: LoginInputDto }): Promise<ApiResponse<UserBaseDto>> {
		const { success: hasMail, data: userData } = await this.usersService.getPassByEmail({ data: {
			email: data.email,
		} });

		if (hasMail && userData && userData.password) {
			const passIsSame = await compare(data.password, userData.password);
			if (!passIsSame)
				return createApiResponse(false, null, 'You entered the wrong password');
			return createApiResponse(true, userData, 'Validation success');
		}
		return createApiResponse(false, null, 'Validation error');
	}

	@ValidationAdditional(getTokenSchema)
	@ErrorAdditional()
	async getAllToken({ data }: { data: GetTokenDto }) {
		const payload = pick(data, ['email', 'nanoId']);
		return createApiResponse(true, {
			accessToken: this.jwtService.sign(payload),
			refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
		});
	}

	@ValidationAdditional(refreshTokenSchema)
	@ErrorAdditional()
	async refreshToken({ data }: { data: RefreshTokenDto }): Promise<ApiResponse<AccessTokenDto | null>> {
		const [err, payload] = await tryit(this.jwtService.verify.bind(this.jwtService))(
			data.refreshToken,
			{ secret: process.env.JWT_SECRET },
		);

		if (err)
			return createApiResponse(false, null, 'Generate refresh token fail');

		return createApiResponse(true, {
			accessToken: this.jwtService.sign({ email: payload.email, nanoId: payload.nanoId }),
		});
	}
}
