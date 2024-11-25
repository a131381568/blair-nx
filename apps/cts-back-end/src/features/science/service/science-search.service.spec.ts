import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { PrismaPromise } from '@prisma/client';
import { defaultScienceQueryData } from '@cts-shared';
import type { ExtendedPrismaClient } from '../../shared/prisma.extension';
import { PRISMA_CLIENT } from '../../shared/prisma.extension';
import { ScienceSearchService } from './science-search.service';

describe('scienceSearchService', () => {
	let service: ScienceSearchService;
	let _prisma: ExtendedPrismaClient;

	const mockScienceData = {
		title: 'Test Science',
		content: 'Test Content',
		orderId: 1,
		postNanoId: 'test-nano-id',
		published: true,
		quoteCat: {
			postCategoryName: 'Test Category',
			postCategoryId: 'test-category-id',
		},
	};

type MockPrismaFunction<T> = jest.Mock<PrismaPromise<T>>;

const createMockPrismaFunction = <T>(): MockPrismaFunction<T> => {
	return jest.fn().mockImplementation(() => Promise.resolve({} as T));
};

const mockPaginate = createMockPrismaFunction<typeof mockScienceData[]>();
const mockWithPages = jest.fn();

const mockScience = {
	paginate: mockPaginate,
};

const mockPrisma = {
	science: mockScience,
	$extends: jest.fn().mockReturnThis(),
} as unknown as ExtendedPrismaClient;

beforeEach(async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [
			ScienceSearchService,
			{
				provide: PRISMA_CLIENT,
				useValue: mockPrisma,
			},
		],
	}).compile();

	service = module.get<ScienceSearchService>(ScienceSearchService);
	_prisma = module.get(PRISMA_CLIENT);

	mockPaginate.mockReset();
	mockWithPages.mockReset();

	// 返回符合 PrismaPromise 的物件
	mockPaginate.mockImplementation(() => {
		const promise = Promise.resolve([]) as PrismaPromise<typeof mockScienceData[]>;
		// 將 withPages 方法添加到 promise 物件
		Object.assign(promise, {
			withPages: mockWithPages,
		});
		return promise;
	});
});

describe('查詢文章', () => {
	it('使用預設值查詢時，應該使用正確的參數', async () => {
		const mockResult = [[mockScienceData], { pageCount: 1, total: 1 }];
		mockWithPages.mockResolvedValue(mockResult);

		const result = await service.getScienceQuery({
			page: defaultScienceQueryData.page,
			limit: defaultScienceQueryData.limit,
			// 單元 science 下，需要填的參數
			mode: 'grid',
			category: 'all',
		});

		expect(result).toEqual(mockResult);
		expect(mockPaginate).toHaveBeenCalledWith({
			where: {
				published: true,
				OR: undefined,
			},
			orderBy: { orderId: 'desc' },
			include: {
				quoteCat: {
					select: {
						postCategoryName: true,
						postCategoryId: true,
					},
				},
			},
		});
		expect(mockWithPages).toHaveBeenCalledWith({
			limit: Number(defaultScienceQueryData.limit),
			page: Number(defaultScienceQueryData.page),
			includePageCount: true,
		});
	});

	it('使用關鍵字搜尋時，應該正確構建搜尋條件', async () => {
		const mockResult = [[mockScienceData], { pageCount: 1, total: 1 }];
		mockWithPages.mockResolvedValue(mockResult);

		const keyword = 'test';
		await service.getScienceQuery({
			keyword,
			page: defaultScienceQueryData.page,
			limit: defaultScienceQueryData.limit,
			mode: 'grid',
		});

		expect(mockPaginate).toHaveBeenCalledWith({
			where: {
				published: true,
				OR: [
					{ title: { contains: keyword, mode: 'insensitive' } },
					{ content: { contains: keyword, mode: 'insensitive' } },
					{
						quoteCat: {
							postCategoryName: { contains: keyword, mode: 'insensitive' },
							postCategoryId: undefined,
						},
					},
					{ postCategoryNanoId: undefined },
				],
			},
			orderBy: { orderId: 'desc' },
			include: {
				quoteCat: {
					select: {
						postCategoryName: true,
						postCategoryId: true,
					},
				},
			},
		});
	});

	it('使用分類搜尋時，應該正確構建搜尋條件', async () => {
		const mockResult = [[mockScienceData], { pageCount: 1, total: 1 }];
		mockWithPages.mockResolvedValue(mockResult);

		const category = 'test-category';
		await service.getScienceQuery({
			category,
			page: defaultScienceQueryData.page,
			limit: defaultScienceQueryData.limit,
			mode: 'grid',
		});

		expect(mockPaginate).toHaveBeenCalledWith({
			where: {
				published: true,
				OR: [
					{ title: undefined },
					{ content: undefined },
					{
						quoteCat: {
							postCategoryName: undefined,
							postCategoryId: category,
						},
					},
					{ postCategoryNanoId: undefined },
				],
			},
			orderBy: { orderId: 'desc' },
			include: {
				quoteCat: {
					select: {
						postCategoryName: true,
						postCategoryId: true,
					},
				},
			},
		});
	});

	it('使用 cnid 搜尋時，應該正確構建搜尋條件', async () => {
		const mockResult = [[mockScienceData], { pageCount: 1, total: 1 }];
		mockWithPages.mockResolvedValue(mockResult);

		const cnid = 'test-cnid';
		await service.getScienceQuery({
			cnid,
			page: defaultScienceQueryData.page,
			limit: defaultScienceQueryData.limit,
			mode: 'grid',
		});

		expect(mockPaginate).toHaveBeenCalledWith({
			where: {
				published: true,
				OR: [
					{ title: undefined },
					{ content: undefined },
					{
						quoteCat: {
							postCategoryName: undefined,
							postCategoryId: undefined,
						},
					},
					{ postCategoryNanoId: cnid },
				],
			},
			orderBy: { orderId: 'desc' },
			include: {
				quoteCat: {
					select: {
						postCategoryName: true,
						postCategoryId: true,
					},
				},
			},
		});
	});

	it('組合搜尋條件時，應該正確構建搜尋條件', async () => {
		const mockResult = [[mockScienceData], { pageCount: 1, total: 1 }];
		mockWithPages.mockResolvedValue(mockResult);

		const keyword = 'test';
		const category = 'test-category';
		const cnid = 'test-cnid';
		await service.getScienceQuery({
			keyword,
			category,
			cnid,
			page: defaultScienceQueryData.page,
			limit: defaultScienceQueryData.limit,
			mode: 'grid',
		});

		expect(mockPaginate).toHaveBeenCalledWith({
			where: {
				published: true,
				OR: [
					{ title: { contains: keyword, mode: 'insensitive' } },
					{ content: { contains: keyword, mode: 'insensitive' } },
					{
						quoteCat: {
							postCategoryName: { contains: keyword, mode: 'insensitive' },
							postCategoryId: category,
						},
					},
					{ postCategoryNanoId: cnid },
				],
			},
			orderBy: { orderId: 'desc' },
			include: {
				quoteCat: {
					select: {
						postCategoryName: true,
						postCategoryId: true,
					},
				},
			},
		});
	});
});
});
