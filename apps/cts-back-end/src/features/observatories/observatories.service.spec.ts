import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { PrismaPromise } from '@prisma/client';
import type { ExtendedPrismaClient } from '../shared/prisma.extension';
import { PRISMA_CLIENT } from '../shared/prisma.extension';
import { ObservatoriesService } from './observatories.service';

describe('observatoriesService', () => {
	let service: ObservatoriesService;
	let _prisma: ExtendedPrismaClient;

	const mockObservatoryData = {
		observatoryNanoId: 'test-nano-id',
		observatoryCategoryName: 'Test Category',
		observatoryCategoryId: 'category-1',
		observatoryPostContent: 'Test Content',
		observatoryOrderId: 1,
		published: true,
	};

type MockPrismaFunction<T> = jest.Mock<PrismaPromise<T>>;

const createMockPrismaFunction = <T>(): MockPrismaFunction<T> => {
	return jest.fn().mockImplementation(() => Promise.resolve({} as T));
};

const mockObservatoriesList = {
	findMany: createMockPrismaFunction<typeof mockObservatoryData[]>(),
	findFirst: createMockPrismaFunction<typeof mockObservatoryData | null>(),
	create: createMockPrismaFunction<typeof mockObservatoryData>(),
	updateMany: createMockPrismaFunction<{ count: number }>(),
};

const mockPrisma = {
	observatoriesList: mockObservatoriesList,
	$transaction: jest.fn().mockImplementation(cb => cb(mockPrisma)),
	$extends: jest.fn().mockReturnThis(),
} as unknown as ExtendedPrismaClient;

beforeEach(async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [
			ObservatoriesService,
			{
				provide: PRISMA_CLIENT,
				useValue: mockPrisma,
			},
		],
	}).compile();

	service = module.get<ObservatoriesService>(ObservatoriesService);
	_prisma = module.get(PRISMA_CLIENT);

	Object.values(mockObservatoriesList).forEach(mock => mock.mockReset());
});

describe('查詢天文台列表', () => {
	it('確認是列表格式，並驗證資料結構', async () => {
		const mockData = [mockObservatoryData];
		mockObservatoriesList.findMany.mockResolvedValue(mockData);

		const result = await service.getObservatoriesList();

		expect(mockObservatoriesList.findMany).toHaveBeenCalled();
		expect(mockObservatoriesList.findMany).toHaveBeenCalledWith({
			orderBy: { observatoryOrderId: 'asc' },
			where: { published: true },
		});

		expect(result[0]).toEqual({
			observatoryNanoId: mockObservatoryData.observatoryNanoId,
			observatoryCategoryName: mockObservatoryData.observatoryCategoryName,
			observatoryCategoryId: mockObservatoryData.observatoryCategoryId,
			observatoryPostContent: mockObservatoryData.observatoryPostContent,
		});
	});

	it('如果沒有資料時應回傳空陣列', async () => {
		mockObservatoriesList.findMany.mockResolvedValue([]);

		const result = await service.getObservatoriesList();

		expect(result).toEqual([]);
	});
});

describe('查詢單一天文台', () => {
	it('回傳正確格式', async () => {
		mockObservatoriesList.findFirst.mockResolvedValue(mockObservatoryData);

		const result = await service.getObservatoryItem({ id: 'test-nano-id' });

		expect(result).toEqual({
			observatoryCategoryName: mockObservatoryData.observatoryCategoryName,
			observatoryCategoryId: mockObservatoryData.observatoryCategoryId,
			observatoryPostContent: mockObservatoryData.observatoryPostContent,
		});
	});

	it('如果是不存在的 id 就回傳 null', async () => {
		mockObservatoriesList.findFirst.mockResolvedValue(null);

		const result = await service.getObservatoryItem({ id: 'non-existent-id' });

		expect(result).toBeNull();
	});
});

describe('建立天文台', () => {
	it('建立成功應回傳 true', async () => {
		const createData = {
			observatoryCategoryName: 'New Category',
			observatoryCategoryId: 'New Id',
			observatoryPostContent: 'New Content',
		};

		const mockCreatedData = {
			...createData,
			observatoryNanoId: 'new-nano-id',
			observatoryOrderId: 2,
			published: true,
		};

		mockObservatoriesList.create.mockResolvedValue(mockCreatedData);

		const result = await service.createObservatoryItem({ data: createData });

		expect(result).toBe(true);
		expect(mockObservatoriesList.create).toHaveBeenCalledWith({
			data: { ...createData, published: true },
		});
	});
});

describe('更新天文台', () => {
	it('更新成功時回傳 true', async () => {
		const updateData = {
			observatoryCategoryName: 'Mock Category',
			observatoryCategoryId: 'Mock Id',
			observatoryPostContent: 'Mock Content',
		};

		mockObservatoriesList.updateMany.mockResolvedValue({ count: 1 });

		const result = await service.updateObservatoryItem({
			id: 'test-nano-id',
			data: updateData,
		});

		expect(result).toBe(true);
		expect(mockObservatoriesList.updateMany).toHaveBeenCalledWith({
			where: { observatoryNanoId: 'test-nano-id', published: true },
			data: updateData,
		});
	});

	it('如果是不存在的 id 就回傳 false', async () => {
		mockObservatoriesList.updateMany.mockResolvedValue({ count: 0 });

		const result = await service.updateObservatoryItem({
			id: 'non-existent-id',
			data: {
				observatoryCategoryName: 'Mock Category',
				observatoryCategoryId: 'Mock Id',
				observatoryPostContent: 'Mock Content',
			},
		});

		expect(result).toBe(false);
	});
});

describe('刪除天文台', () => {
	it('刪除成功時回傳 true', async () => {
		mockObservatoriesList.updateMany.mockResolvedValue({ count: 1 });

		const result = await service.deleteObservatoryItem({ id: 'test-nano-id' });

		expect(result).toBe(true);
		expect(mockObservatoriesList.updateMany).toHaveBeenCalledWith({
			where: { observatoryNanoId: 'test-nano-id', published: true },
			data: { published: false },
		});
	});

	it('如果是不存在的 id 就回傳 false', async () => {
		mockObservatoriesList.updateMany.mockResolvedValue({ count: 0 });

		const result = await service.deleteObservatoryItem({ id: 'non-existent-id' });

		expect(result).toBe(false);
	});
});
});
