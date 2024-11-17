import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { PrismaPromise } from '@prisma/client';
import type { ExtendedPrismaClient } from '../shared/prisma.extension';
import { PRISMA_CLIENT } from '../shared/prisma.extension';
import { ScienceService } from './science.service';
import { ScienceSearchService } from './service/science-search.service';

describe('scienceService', () => {
	let service: ScienceService;
	let _searchService: ScienceSearchService;
	let _prisma: ExtendedPrismaClient;

	const mockScienceData = {
		title: 'Test Science',
		content: 'Test Content',
		image: 'test-image.jpg',
		postNanoId: 'test-nano-id',
		orderId: 1,
		published: true,
		updateTime: new Date('2024-01-01'),
		quoteCat: {
			postCategoryName: 'Test Category',
			postCategoryId: 'test-category-id',
		},
	};

type MockPrismaFunction<T> = jest.Mock<PrismaPromise<T>>;

const createMockPrismaFunction = <T>(): MockPrismaFunction<T> => {
	return jest.fn().mockImplementation(() => Promise.resolve({} as T));
};

const mockScience = {
	findMany: createMockPrismaFunction<typeof mockScienceData[]>(),
	findFirst: createMockPrismaFunction<typeof mockScienceData | null>(),
	create: createMockPrismaFunction<typeof mockScienceData>(),
	updateMany: createMockPrismaFunction<{ count: number }>(),
};

const mockPrisma = {
	science: mockScience,
	$transaction: jest.fn().mockImplementation(cb => cb(mockPrisma)),
	$extends: jest.fn().mockReturnThis(),
} as unknown as ExtendedPrismaClient;

const mockSearchService = {
	getScienceQuery: jest.fn(),
};

beforeEach(async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [
			ScienceService,
			{
				provide: PRISMA_CLIENT,
				useValue: mockPrisma,
			},
			{
				provide: ScienceSearchService,
				useValue: mockSearchService,
			},
		],
	}).compile();

	service = module.get<ScienceService>(ScienceService);
	_searchService = module.get<ScienceSearchService>(ScienceSearchService);
	_prisma = module.get(PRISMA_CLIENT);

	Object.values(mockScience).forEach(mock => mock.mockReset());
	mockSearchService.getScienceQuery.mockReset();
});

describe('查詢文章列表', () => {
	it('grid模式下回傳正確格式資料', async () => {
		const mockQueryResult = [[mockScienceData], { pageCount: 1, total: 1 }];
		mockSearchService.getScienceQuery.mockResolvedValue(mockQueryResult);

		const result = await service.getScienceList({
			data: {
				mode: 'grid',
				page: '1',
				limit: '10',
			},
		});

		expect(result).toEqual({
			list: [{
				title: mockScienceData.title,
				content: mockScienceData.content,
				image: mockScienceData.image,
				postNanoId: mockScienceData.postNanoId,
				updateTime: '2024-01-01',
				postCategoryName: mockScienceData.quoteCat.postCategoryName,
				postCategoryId: mockScienceData.quoteCat.postCategoryId,
			}],
			meta: {
				pageCount: 1,
				total: 1,
			},
		});
	});

	it('list模式下回傳正確格式資料', async () => {
		const mockQueryResult = [[mockScienceData], { pageCount: 1, total: 1 }];
		mockSearchService.getScienceQuery.mockResolvedValue(mockQueryResult);

		const result = await service.getScienceList({
			data: {
				mode: 'list',
				page: '1',
				limit: '10',
			},
		});

		expect(result).toEqual({
			list: [{
				title: mockScienceData.title,
				postNanoId: mockScienceData.postNanoId,
				updateTime: '2024-01-01',
				postCategoryName: mockScienceData.quoteCat.postCategoryName,
			}],
			meta: {
				pageCount: 1,
				total: 1,
			},
		});
	});
});

describe('查詢單一文章', () => {
	it('回傳正確格式資料', async () => {
		mockScience.findFirst.mockResolvedValue(mockScienceData);

		const result = await service.getScienceDetail({ id: 'test-nano-id' });

		expect(result).toEqual({
			title: mockScienceData.title,
			content: mockScienceData.content,
			image: mockScienceData.image,
			postNanoId: mockScienceData.postNanoId,
			updateTime: '2024-01-01',
			postCategoryId: mockScienceData.quoteCat.postCategoryId,
			postCategoryName: mockScienceData.quoteCat.postCategoryName,
		});

		expect(mockScience.findFirst).toHaveBeenCalledWith({
			where: { postNanoId: 'test-nano-id', published: true },
			include: {
				quoteCat: { select: { postCategoryName: true, postCategoryId: true } },
			},
		});
	});

	it('如果是不存在的 id 就回傳 null', async () => {
		mockScience.findFirst.mockResolvedValue(null);

		const result = await service.getScienceDetail({ id: 'non-existent-id' });

		expect(result).toBeNull();
	});
});

describe('建立文章', () => {
	it('建立成功應回傳 true', async () => {
		const createData = {
			title: 'New Science',
			content: 'New Content',
			image: 'new-image.jpg',
			postCategoryNanoId: 'category-id',
		};

		mockScience.create.mockResolvedValue({
			...createData,
			postNanoId: 'new-nano-id',
			published: true,
			updateTime: new Date(),
			orderId: 1,
			quoteCat: {
				postCategoryName: 'New Category',
				postCategoryId: 'new-category-id',
			},
		});

		const result = await service.createScienceDetail({ data: createData });

		expect(result).toBe(true);
		expect(mockScience.create).toHaveBeenCalledWith({
			data: {
				title: createData.title,
				content: createData.content,
				image: createData.image,
				published: true,
				updateTime: expect.any(Date),
				quoteCat: {
					connect: { postCategoryNanoId: createData.postCategoryNanoId },
				},
			},
		});
	});
});

describe('更新文章', () => {
	it('更新成功時回傳 true', async () => {
		const updateData = {
			title: 'Updated Science',
			content: 'Updated Content',
			image: 'updated-image.jpg',
			postCategoryNanoId: 'updated-category-id',
		};

		mockScience.updateMany.mockResolvedValue({ count: 1 });

		const result = await service.updateScienceDetail({
			id: 'test-nano-id',
			data: updateData,
		});

		expect(result).toBe(true);
		expect(mockScience.updateMany).toHaveBeenCalledWith({
			where: { postNanoId: 'test-nano-id', published: true },
			data: { ...updateData, updateTime: expect.any(Date) },
		});
	});

	it('如果是不存在的 id 就回傳 false', async () => {
		mockScience.updateMany.mockResolvedValue({ count: 0 });

		const result = await service.updateScienceDetail({
			id: 'non-existent-id',
			data: {
				title: 'Updated Science',
				content: 'Updated Content',
				image: 'updated-image.jpg',
				postCategoryNanoId: 'updated-category-id',
			},
		});

		expect(result).toBe(false);
	});
});

describe('刪除文章', () => {
	it('刪除成功時回傳 true', async () => {
		mockScience.updateMany.mockResolvedValue({ count: 1 });

		const result = await service.deleteScienceDetail({ id: 'test-nano-id' });

		expect(result).toBe(true);
		expect(mockScience.updateMany).toHaveBeenCalledWith({
			where: { postNanoId: 'test-nano-id', published: true },
			data: { published: false },
		});
	});

	it('如果是不存在的 id 就回傳 false', async () => {
		mockScience.updateMany.mockResolvedValue({ count: 0 });

		const result = await service.deleteScienceDetail({ id: 'non-existent-id' });

		expect(result).toBe(false);
	});
});
});
