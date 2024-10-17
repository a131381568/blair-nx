import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiResponse } from '../../core/interceptors/api-response';
import { ApiResponseInterceptor } from '../../core/interceptors/api-response.interceptor';
import { AccessTokenDto, LoginInputDto, RefreshTokenDto, TokenGroupDto, UserBaseDto } from '../shared/users-schemas';
import { AuthService } from './auth.service';

@Controller('auth')
@UseInterceptors(ApiResponseInterceptor)
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	async login(@Body() data: LoginInputDto): Promise<ApiResponse<TokenGroupDto | UserBaseDto>> {
		const validationInfo = await this.authService.validateUser({ data });
		if (validationInfo.success && validationInfo.data) {
			return this.authService.getAllToken({
				data: {
					email: validationInfo.data.email,
					nanoId: validationInfo.data.nanoId,
				},
			});
		}
		return validationInfo;
	}

	@Post('refresh')
	refreshToken(@Body() data: RefreshTokenDto): Promise<ApiResponse<AccessTokenDto | null>> {
		return this.authService.refreshToken({ data });
	}
}
