import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { AUTH_CONFIG } from '@cts-shared';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

jest.mock('bcrypt');

describe('authService', () => {
	let service: AuthService;
	let usersService: jest.Mocked<UsersService>;
	let jwtService: jest.Mocked<JwtService> & { verify: jest.Mock };

	const mockUserData = {
		name: 'test-name',
		email: 'test@example.com',
		nanoId: 'test-nano-id',
		password: 'hashedPassword',
	};

	const mockTokenData = {
		accessToken: 'mock-access-token',
		refreshToken: 'mock-refresh-token',
	};

	beforeEach(async () => {
		const mockUsersService = {
			getPassByEmail: jest.fn(),
		};

		const mockJwtService = {
			sign: jest.fn(),
			verify: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: UsersService,
					useValue: mockUsersService,
				},
				{
					provide: JwtService,
					useValue: mockJwtService,
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
		usersService = module.get(UsersService);
		jwtService = module.get(JwtService);
	});

	describe('validateUser', () => {
		const loginData = {
			email: 'test@example.com',
			password: 'testPassword',
		};

		it('驗證成功時應回傳使用者資訊和成功訊息', async () => {
			usersService.getPassByEmail.mockResolvedValue({
				success: true,
				data: mockUserData,
			});
			(compare as jest.Mock).mockResolvedValue(true);

			const result = await service.validateUser({ data: loginData });

			expect(result).toEqual({
				userInfo: mockUserData,
				msg: '驗證成功',
			});
			expect(usersService.getPassByEmail).toHaveBeenCalledWith({
				data: { email: loginData.email },
			});
		});

		it('密碼不正確時應回傳錯誤訊息', async () => {
			usersService.getPassByEmail.mockResolvedValue({
				success: true,
				data: mockUserData,
			});
			(compare as jest.Mock).mockResolvedValue(false);

			const result = await service.validateUser({ data: loginData });

			expect(result).toEqual({
				userInfo: null,
				msg: '密碼不正確',
			});
		});

		it('找不到使用者時應回傳驗證失敗訊息', async () => {
			usersService.getPassByEmail.mockResolvedValue({
				success: false,
				data: null,
			});

			const result = await service.validateUser({ data: loginData });

			expect(result).toEqual({
				userInfo: null,
				msg: '驗證失敗',
			});
		});
	});

	describe('getAllToken', () => {
		const tokenData = {
			email: 'test@example.com',
			nanoId: 'test-nano-id',
		};

		it('應正確生成 access token 和 refresh token', async () => {
			jwtService.sign
				.mockReturnValueOnce(mockTokenData.accessToken)
				.mockReturnValueOnce(mockTokenData.refreshToken);

			const result = await service.getAllToken({ data: tokenData });

			expect(result).toEqual(mockTokenData);
			expect(jwtService.sign).toHaveBeenCalledTimes(2);
			expect(jwtService.sign).toHaveBeenNthCalledWith(1, tokenData);
			expect(jwtService.sign).toHaveBeenNthCalledWith(2, tokenData, {
				expiresIn: AUTH_CONFIG.REFRESH_EXPIRY,
			});
		});
	});

	describe('refreshToken', () => {
		const refreshTokenData = {
			refreshToken: 'valid-refresh-token',
		};

		const decodedToken = {
			email: 'test@example.com',
			nanoId: 'test-nano-id',
		};

		it('成功更新 token 時應回傳新的 access token', async () => {
			jwtService.verify.mockResolvedValue(decodedToken);
			jwtService.sign.mockReturnValue('new-access-token');

			const result = await service.refreshToken({ data: refreshTokenData });

			expect(result).toEqual({
				accessToken: 'new-access-token',
			});
			expect(jwtService.verify).toHaveBeenCalledWith(
				refreshTokenData.refreshToken,
				{ secret: process.env.JWT_SECRET },
			);
			expect(jwtService.sign).toHaveBeenCalledWith({
				email: decodedToken.email,
				nanoId: decodedToken.nanoId,
			});
		});

		it('refresh token 無效時應回傳錯誤訊息', async () => {
			jwtService.verify.mockRejectedValue(new Error('Invalid token'));

			const result = await service.refreshToken({ data: refreshTokenData });

			expect(result).toBe('生成 refresh token 失敗');
		});
	});
});
