import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { PrismaPromise } from '@prisma/client';
import { paginationDefaultData } from '@cts-shared';
import type { ExtendedPrismaClient } from '../shared/prisma.extension';
import { PRISMA_CLIENT } from '../shared/prisma.extension';
import { StargazingService } from './stargazing.service';

describe('stargazingService', () => {
	let service: StargazingService;
	let _prisma: ExtendedPrismaClient;

	const mockStargazingData = {
		stargazingTitle: '合歡山觀星',
		stargazingAddress: '南投縣仁愛鄉合歡山',
		stargazingLatitude: '24.1828',
		stargazingLongitude: '121.2827',
		stargazingImage: 'test-image.jpg',
		stargazingDescription: '合歡山觀星點描述',
		stargazingNanoId: 'test-nano-id',
		stargazingOrderId: 1,
		published: true,
	};

type MockPrismaFunction<T> = jest.Mock<PrismaPromise<T>>;

const createMockPrismaFunction = <T>(): MockPrismaFunction<T> => {
	return jest.fn().mockImplementation(() => Promise.resolve({} as T));
};

const withPagesMock = jest.fn();
const paginateMock = jest.fn().mockReturnValue({ withPages: withPagesMock });

const mockStargazingList = {
	findMany: createMockPrismaFunction<typeof mockStargazingData[]>(),
	findFirst: createMockPrismaFunction<typeof mockStargazingData | null>(),
	create: createMockPrismaFunction<typeof mockStargazingData>(),
	updateMany: createMockPrismaFunction<{ count: number }>(),
	paginate: paginateMock,
};

const mockPrisma = {
	stargazingList: mockStargazingList,
	$transaction: jest.fn().mockImplementation(cb => cb(mockPrisma)),
	$extends: jest.fn().mockReturnThis(),
} as unknown as ExtendedPrismaClient;

beforeEach(async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [
			StargazingService,
			{
				provide: PRISMA_CLIENT,
				useValue: mockPrisma,
			},
		],
	}).compile();

	service = module.get<StargazingService>(StargazingService);
	_prisma = module.get(PRISMA_CLIENT);

	Object.values(mockStargazingList).forEach(mock => mock.mockReset());
	withPagesMock.mockReset();
	paginateMock.mockReset();
	paginateMock.mockReturnValue({ withPages: withPagesMock });
});

describe('查詢觀星地點列表', () => {
	it('地圖模式：回傳包含經緯度的完整資料', async () => {
		const mockPaginatedData = [[mockStargazingData], paginationDefaultData];
		withPagesMock.mockResolvedValue(mockPaginatedData);

		const result = await service.getStargazingQuery({
			data: { mode: 'map', page: '1', limit: '10' },
		});

		expect(result.list[0]).toEqual({
			stargazingTitle: mockStargazingData.stargazingTitle,
			stargazingAddress: mockStargazingData.stargazingAddress,
			stargazingNanoId: mockStargazingData.stargazingNanoId,
			stargazingImage: mockStargazingData.stargazingImage,
			stargazingDescription: mockStargazingData.stargazingDescription,
			stargazingLatitude: mockStargazingData.stargazingLatitude,
			stargazingLongitude: mockStargazingData.stargazingLongitude,
		});
		expect(result.meta).toEqual(paginationDefaultData);
	});

	it('列表模式：僅回傳基本資料', async () => {
		const mockPaginatedData = [[mockStargazingData], paginationDefaultData];
		withPagesMock.mockResolvedValue(mockPaginatedData);

		const result = await service.getStargazingQuery({
			data: { mode: 'list', page: '1', limit: '10' },
		});

		expect(result.list[0]).toEqual({
			stargazingTitle: mockStargazingData.stargazingTitle,
			stargazingAddress: mockStargazingData.stargazingAddress,
			stargazingNanoId: mockStargazingData.stargazingNanoId,
		});
		expect(result.meta).toEqual(paginationDefaultData);
	});

	it('使用 nanoId 查詢時，應加入對應條件', async () => {
		const mockPaginatedData = [[mockStargazingData], paginationDefaultData];
		withPagesMock.mockResolvedValue(mockPaginatedData);

		await service.getStargazingQuery({
			data: { mode: 'map', page: '1', limit: '10', nid: 'test-nano-id' },
		});

		expect(mockStargazingList.paginate).toHaveBeenCalledWith({
			where: {
				published: true,
				OR: [{ stargazingNanoId: 'test-nano-id' }],
			},
			orderBy: { stargazingOrderId: 'desc' },
		});
	});
});

describe('查詢單一觀星地點', () => {
	it('回傳正確格式的資料', async () => {
		mockStargazingList.findFirst.mockResolvedValue(mockStargazingData);

		const result = await service.getStargazingDetail({ id: 'test-nano-id' });

		expect(result).toEqual({
			stargazingTitle: mockStargazingData.stargazingTitle,
			stargazingAddress: mockStargazingData.stargazingAddress,
			stargazingNanoId: mockStargazingData.stargazingNanoId,
			stargazingImage: mockStargazingData.stargazingImage,
			stargazingDescription: mockStargazingData.stargazingDescription,
			stargazingLatitude: mockStargazingData.stargazingLatitude,
			stargazingLongitude: mockStargazingData.stargazingLongitude,
		});
	});

	it('找不到資料時回傳預設值', async () => {
		mockStargazingList.findFirst.mockResolvedValue(null);

		const result = await service.getStargazingDetail({ id: 'non-existent-id' });

		expect(result.stargazingTitle).toBe('');
		expect(result.stargazingAddress).toBe('');
		expect(result.stargazingNanoId).toBe('');
	});
});

describe('建立觀星地點', () => {
	it('建立成功應回傳 true', async () => {
		const createData = {
			stargazingTitle: '新觀星地點',
			stargazingAddress: '新地址',
			stargazingLatitude: '25.0330',
			stargazingLongitude: '121.5654',
			stargazingImage: 'new-image.jpg',
			stargazingDescription: '新描述',
		};

		mockStargazingList.create.mockResolvedValue({
			...createData,
			stargazingNanoId: 'new-nano-id',
			stargazingOrderId: 1,
			published: true,
		});

		const result = await service.createStargazingDetail({ data: createData });

		expect(result).toBe(true);
		expect(mockStargazingList.create).toHaveBeenCalledWith({
			data: {
				...createData,
				stargazingLatitude: String(createData.stargazingLatitude),
				stargazingLongitude: String(createData.stargazingLongitude),
				published: true,
			},
		});
	});
});

describe('更新觀星地點', () => {
	it('更新成功時回傳 true', async () => {
		const updateData = {
			stargazingTitle: '更新的標題',
			stargazingAddress: '更新的地址',
			stargazingLatitude: '23.5',
			stargazingLongitude: '120.5',
			stargazingImage: 'updated-image.jpg',
			stargazingDescription: '更新的描述',
		};

		mockStargazingList.updateMany.mockResolvedValue({ count: 1 });

		const result = await service.updateStargazingDetail({
			id: 'test-nano-id',
			data: updateData,
		});

		expect(result).toBe(true);
		expect(mockStargazingList.updateMany).toHaveBeenCalledWith({
			where: { stargazingNanoId: 'test-nano-id', published: true },
			data: {
				...updateData,
				stargazingLatitude: String(updateData.stargazingLatitude),
				stargazingLongitude: String(updateData.stargazingLongitude),
			},
		});
	});

	it('如果是不存在的 id 就回傳 false', async () => {
		mockStargazingList.updateMany.mockResolvedValue({ count: 0 });

		const result = await service.updateStargazingDetail({
			id: 'non-existent-id',
			data: {
				stargazingTitle: '更新的標題',
				stargazingLatitude: '23.5',
				stargazingLongitude: '120.5',
				stargazingAddress: '更新的地址',
				stargazingImage: 'updated-image.jpg',
				stargazingDescription: '更新的描述',
			},
		});

		expect(result).toBe(false);
	});
});

describe('刪除觀星地點', () => {
	it('刪除成功時回傳 true', async () => {
		mockStargazingList.updateMany.mockResolvedValue({ count: 1 });

		const result = await service.deleteStargazingDetail({ id: 'test-nano-id' });

		expect(result).toBe(true);
		expect(mockStargazingList.updateMany).toHaveBeenCalledWith({
			where: { stargazingNanoId: 'test-nano-id', published: true },
			data: { published: false },
		});
	});

	it('如果是不存在的 id 就回傳 false', async () => {
		mockStargazingList.updateMany.mockResolvedValue({ count: 0 });

		const result = await service.deleteStargazingDetail({ id: 'non-existent-id' });

		expect(result).toBe(false);
	});
});
});
