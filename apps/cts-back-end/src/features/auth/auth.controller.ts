import { BadRequestException, Body, Controller, UseInterceptors } from '@nestjs/common';
import { LoginInputDto, RefreshTokenDto, authContract } from '@cts-shared';
import { NestResponseShapes, TsRestHandler, nestControllerContract, tsRestHandler } from '@ts-rest/nest';
import { isString } from 'radash';
import { ApiResponseInterceptor } from '../../core/interceptors/api-response.interceptor';
import { AuthService } from './auth.service';

const LOGIN = 'login';
const REFRESH = 'refreshToken';
const c = nestControllerContract(authContract);
type ResponseShapes = NestResponseShapes<typeof c>;

@Controller()
@UseInterceptors(ApiResponseInterceptor)
export class AuthController {
	constructor(private authService: AuthService) {}

	@TsRestHandler(c[LOGIN])
	login(@Body() data: LoginInputDto) {
		return tsRestHandler(c[LOGIN], async (_reqInfo): Promise<ResponseShapes[typeof LOGIN]> => {
			const validationInfo = await this.authService.validateUser({ data });

			if (validationInfo.userInfo) {
				const tokenInfo = await this.authService.getAllToken({
					data: {
						email: validationInfo.userInfo.email,
						nanoId: validationInfo.userInfo.nanoId,
					},
				});
				return { status: 201, body: tokenInfo };
			}

			throw new BadRequestException(validationInfo.msg);
		});
	}

	@TsRestHandler(c[REFRESH])
	refreshToken(@Body() data: RefreshTokenDto) {
		return tsRestHandler(c[REFRESH], async (_reqInfo): Promise<ResponseShapes[typeof REFRESH]> => {
			const refreshInfo = await this.authService.refreshToken({ data });

			if (!isString(refreshInfo) && refreshInfo.accessToken)
				return { status: 201, body: refreshInfo };

			throw new BadRequestException(refreshInfo);
		});
	}
}
