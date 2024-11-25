import { IncomingHttpHeaders } from 'node:http';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { RegisterPayloadDto } from '@cts-shared';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

// 定義請求類型接口
interface MockRequest {
	headers: IncomingHttpHeaders;
	params: Record<string, string>;
	query: Record<string, unknown>;
	body: Record<string, unknown>;
}

describe('usersController', () => {
	let controller: UsersController;
	let _service: UsersService;

	const mockUserData = {
		name: 'Test User',
		email: 'test@example.com',
		nanoId: 'test-nano-id',
	};

	const mockUsersService = {
		getUserList: jest.fn(),
		registerUser: jest.fn(),
	};

	// 基本請求對象
	const baseReqInfo: MockRequest = {
		headers: {} as IncomingHttpHeaders,
		params: {},
		query: {},
		body: {},
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [
				{
					provide: UsersService,
					useValue: mockUsersService,
				},
			],
		}).compile();

		controller = module.get<UsersController>(UsersController);
		_service = module.get<UsersService>(UsersService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('查詢使用者列表', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			mockUsersService.getUserList.mockResolvedValue([mockUserData]);

			const getUserListHandler = await controller.getUserList();
			const response = await getUserListHandler(baseReqInfo);

			expect(response).toEqual({
				status: 200,
				body: [mockUserData],
			});
			expect(mockUsersService.getUserList).toHaveBeenCalled();
		});
	});

	describe('註冊使用者', () => {
		const registerData: RegisterPayloadDto = {
			name: 'New User',
			email: 'new@example.com',
			password: 'password123',
		};

		it('註冊成功時回傳成功訊息', async () => {
			mockUsersService.registerUser.mockResolvedValue({
				result: true,
				msg: '註冊成功',
			});

			const registerUserHandler = await controller.registerUser(registerData);
			const response = await registerUserHandler({
				...baseReqInfo,
				body: registerData,
			});

			expect(response).toEqual({
				status: 200,
				body: 'Successfully registered',
			});
			expect(mockUsersService.registerUser).toHaveBeenCalledWith({
				data: registerData,
			});
		});

		it('註冊失敗時拋出 BadRequestException', async () => {
			mockUsersService.registerUser.mockResolvedValue({
				result: false,
				msg: '此信箱已經註冊',
			});

			const registerUserHandler = await controller.registerUser(registerData);

			await expect(
				registerUserHandler({
					...baseReqInfo,
					body: registerData,
				}),
			).rejects.toThrow(BadRequestException);

			expect(mockUsersService.registerUser).toHaveBeenCalledWith({
				data: registerData,
			});
		});

		it('註冊失敗時回傳正確的錯誤訊息', async () => {
			const errorMessage = '此信箱已經註冊';
			mockUsersService.registerUser.mockResolvedValue({
				result: false,
				msg: errorMessage,
			});

			const registerUserHandler = await controller.registerUser(registerData);

			try {
				await registerUserHandler({
					...baseReqInfo,
					body: registerData,
				});
				// 如果沒有拋出錯誤，這個測試應該失敗
				fail('應該要拋出 BadRequestException');
			}
			catch (error) {
				if (error instanceof BadRequestException) {
					expect(error.message).toBe(errorMessage);
				}
				else {
					throw error;
				}
			}
		});
	});
});
