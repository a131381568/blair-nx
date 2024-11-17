import { IncomingHttpHeaders } from 'node:http';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

interface MockRequest {
	headers: IncomingHttpHeaders;
	params: Record<string, string>;
	query: Record<string, unknown>;
	body: Record<string, unknown>;
}

describe('authController', () => {
	let controller: AuthController;
	let _service: AuthService;

	const mockAuthService = {
		validateUser: jest.fn(),
		getAllToken: jest.fn(),
		refreshToken: jest.fn(),
	};

	const baseReqInfo: MockRequest = {
		headers: {} as IncomingHttpHeaders,
		params: {},
		query: {},
		body: {},
	};

	const mockLoginData = {
		email: 'test@example.com',
		password: 'testPassword',
	};

	const mockUserData = {
		email: 'test@example.com',
		nanoId: 'test-nano-id',
		password: 'hashedPassword',
	};

	const mockTokenData = {
		accessToken: 'mock-access-token',
		refreshToken: 'mock-refresh-token',
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				{
					provide: AuthService,
					useValue: mockAuthService,
				},
			],
		}).compile();

		controller = module.get<AuthController>(AuthController);
		_service = module.get<AuthService>(AuthService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('login', () => {
		it('登入成功時應回傳 token 資訊', async () => {
			mockAuthService.validateUser.mockResolvedValue({
				userInfo: mockUserData,
				msg: '驗證成功',
			});

			mockAuthService.getAllToken.mockResolvedValue(mockTokenData);

			const response = await controller.login(mockLoginData)({
				...baseReqInfo,
				body: mockLoginData,
			});

			expect(response).toEqual({
				status: 201,
				body: mockTokenData,
			});

			expect(mockAuthService.validateUser).toHaveBeenCalledWith({
				data: mockLoginData,
			});

			expect(mockAuthService.getAllToken).toHaveBeenCalledWith({
				data: {
					email: mockUserData.email,
					nanoId: mockUserData.nanoId,
				},
			});
		});

		it('驗證失敗時應拋出 BadRequestException', async () => {
			mockAuthService.validateUser.mockResolvedValue({
				userInfo: null,
				msg: '驗證失敗',
			});

			await expect(
				controller.login(mockLoginData)({
					...baseReqInfo,
					body: mockLoginData,
				}),
			).rejects.toThrow(BadRequestException);
		});

		it('密碼錯誤時應拋出 BadRequestException', async () => {
			mockAuthService.validateUser.mockResolvedValue({
				userInfo: null,
				msg: '密碼不正確',
			});

			await expect(
				controller.login(mockLoginData)({
					...baseReqInfo,
					body: mockLoginData,
				}),
			).rejects.toThrow(BadRequestException);
		});
	});

	describe('refreshToken', () => {
		const mockRefreshTokenData = {
			refreshToken: 'valid-refresh-token',
		};

		it('更新 token 成功時應回傳新的 access token', async () => {
			const newAccessToken = {
				accessToken: 'new-access-token',
			};

			mockAuthService.refreshToken.mockResolvedValue(newAccessToken);

			const response = await controller.refreshToken(mockRefreshTokenData)({
				...baseReqInfo,
				body: mockRefreshTokenData,
			});

			expect(response).toEqual({
				status: 201,
				body: newAccessToken,
			});

			expect(mockAuthService.refreshToken).toHaveBeenCalledWith({
				data: mockRefreshTokenData,
			});
		});

		it('refresh token 無效時應拋出 BadRequestException', async () => {
			mockAuthService.refreshToken.mockResolvedValue('生成 refresh token 失敗');

			await expect(
				controller.refreshToken(mockRefreshTokenData)({
					...baseReqInfo,
					body: mockRefreshTokenData,
				}),
			).rejects.toThrow(BadRequestException);
		});
	});
});
