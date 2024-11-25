import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { PrismaPromise } from '@prisma/client';
import type { ExtendedPrismaClient } from '../shared/prisma.extension';
import { PRISMA_CLIENT } from '../shared/prisma.extension';
import { UsersService } from './users.service';

// Mock bcrypt module
jest.mock('bcrypt', () => ({
	hashSync: jest.fn().mockReturnValue('hashedPassword123'),
}));

describe('usersService', () => {
	let service: UsersService;
	let _prisma: ExtendedPrismaClient;

	const mockUserData = {
		name: 'Test User',
		email: 'test@example.com',
		password: 'hashedPassword123',
		nanoId: 'test-nano-id',
		orderId: 1,
	};

type MockPrismaFunction<T> = jest.Mock<PrismaPromise<T>>;

const createMockPrismaFunction = <T>(): MockPrismaFunction<T> => {
	return jest.fn().mockImplementation(() => Promise.resolve({} as T));
};

const mockUsers = {
	findMany: createMockPrismaFunction<typeof mockUserData[]>(),
	findFirst: createMockPrismaFunction<typeof mockUserData | null>(),
	create: createMockPrismaFunction<typeof mockUserData>(),
};

const mockPrisma = {
	users: mockUsers,
	$transaction: jest.fn().mockImplementation(cb => cb(mockPrisma)),
	$extends: jest.fn().mockReturnThis(),
} as unknown as ExtendedPrismaClient;

beforeEach(async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [
			UsersService,
			{
				provide: PRISMA_CLIENT,
				useValue: mockPrisma,
			},
		],
	}).compile();

	service = module.get<UsersService>(UsersService);
	_prisma = module.get(PRISMA_CLIENT);

	Object.values(mockUsers).forEach(mock => mock.mockReset());
});

describe('查詢使用者列表', () => {
	it('確認是列表格式，並驗證返回資料結構', async () => {
		const mockData = [mockUserData];
		mockUsers.findMany.mockResolvedValue(mockData);

		const result = await service.getUserList();

		expect(mockUsers.findMany).toHaveBeenCalled();
		expect(mockUsers.findMany).toHaveBeenCalledWith({
			orderBy: { orderId: 'asc' },
		});

		expect(result[0]).toEqual({
			name: mockUserData.name,
			email: mockUserData.email,
			nanoId: mockUserData.nanoId,
		});
	});
});

describe('根據 Email 查詢使用者密碼', () => {
	it('找到使用者時回傳完整資料', async () => {
		mockUsers.findFirst.mockResolvedValue(mockUserData);

		const result = await service.getPassByEmail({
			data: { email: 'test@example.com' },
		});

		expect(result.success).toBe(true);
		expect(result.data).toEqual({
			email: mockUserData.email,
			name: mockUserData.name,
			nanoId: mockUserData.nanoId,
			password: mockUserData.password,
		});
	});

	it('找不到使用者時回傳錯誤訊息', async () => {
		mockUsers.findFirst.mockResolvedValue(null);

		const result = await service.getPassByEmail({
			data: { email: 'nonexistent@example.com' },
		});

		expect(result.success).toBe(false);
		expect(result.message).toBe('User not found');
		expect(result.data).toBeNull();
	});
});

describe('註冊新使用者', () => {
	const registerData = {
		name: 'New User',
		email: 'new@example.com',
		password: 'password123',
	};

	it('註冊成功時回傳成功訊息', async () => {
		mockUsers.findFirst.mockResolvedValue(null);
		mockUsers.create.mockResolvedValue({
			...mockUserData,
			...registerData,
			password: 'hashedPassword123',
		});

		const result = await service.registerUser({ data: registerData });

		expect(result.result).toBe(true);
		expect(result.msg).toBe('註冊成功');
		expect(mockUsers.create).toHaveBeenCalledWith({
			data: {
				name: registerData.name,
				email: registerData.email,
				password: 'hashedPassword123',
			},
		});
	});

	it('電子郵件已存在時回傳錯誤訊息', async () => {
		mockUsers.findFirst.mockResolvedValue(mockUserData);

		const result = await service.registerUser({ data: registerData });

		expect(result.result).toBe(false);
		expect(result.msg).toBe('此信箱已經註冊');
		expect(mockUsers.create).not.toHaveBeenCalled();
	});
});
});
