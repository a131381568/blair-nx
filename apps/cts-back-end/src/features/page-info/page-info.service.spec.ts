import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { PrismaPromise } from '@prisma/client';
import type { ExtendedPrismaClient } from '../shared/prisma.extension';
import { PRISMA_CLIENT } from '../shared/prisma.extension';
import { PageInfoService } from './page-info.service';

describe('pageInfoService', () => {
	let service: PageInfoService;
	let _prisma: ExtendedPrismaClient;

	const mockPageData = {
		pageTitle: '測試頁面',
		subPageTitle: '測試子標題',
		pageRoute: '/test-route',
		pageNanoId: 'test-nano-id',
		pageId: 1,
	};

type MockPrismaFunction<T> = jest.Mock<PrismaPromise<T>>;

const createMockPrismaFunction = <T>(): MockPrismaFunction<T> => {
	return jest.fn().mockImplementation(() => Promise.resolve({} as T));
};

const mockPageInfo = {
	findMany: createMockPrismaFunction<typeof mockPageData[]>(),
	updateMany: createMockPrismaFunction<{ count: number }>(),
};

const mockPrisma = {
	pageInfo: mockPageInfo,
	$transaction: jest.fn().mockImplementation(cb => cb(mockPrisma)),
	$extends: jest.fn().mockReturnThis(),
} as unknown as ExtendedPrismaClient;

beforeEach(async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [
			PageInfoService,
			{
				provide: PRISMA_CLIENT,
				useValue: mockPrisma,
			},
		],
	}).compile();

	service = module.get<PageInfoService>(PageInfoService);
	_prisma = module.get(PRISMA_CLIENT);

	Object.values(mockPageInfo).forEach(mock => mock.mockReset());
});

describe('查詢頁面列表', () => {
	it('確認是列表格式，並驗證第一筆資料', async () => {
		const mockData = [mockPageData];
		mockPageInfo.findMany.mockResolvedValue(mockData);

		const result = await service.getPageInfoList();

		expect(mockPageInfo.findMany).toHaveBeenCalled();
		expect(mockPageInfo.findMany).toHaveBeenCalledWith({
			orderBy: { pageId: 'asc' },
		});

		expect(result[0]).toEqual({
			pageTitle: mockPageData.pageTitle,
			subPageTitle: mockPageData.subPageTitle,
			pageRoute: mockPageData.pageRoute,
			pageNanoId: mockPageData.pageNanoId,
		});
	});
});

describe('更新頁面', () => {
	it('更新成功時回傳 true', async () => {
		const updateData = {
			pageTitle: 'MockPageTitle',
			subPageTitle: 'MockSubPageTitle',
			pageRoute: 'MockRouteName',
		};

		mockPageInfo.updateMany.mockResolvedValue({ count: 1 });

		const result = await service.updatePageItem({
			id: 'test-nano-id',
			data: updateData,
		});

		expect(result).toBe(true);
		expect(mockPageInfo.updateMany).toHaveBeenCalledWith({
			where: { pageNanoId: 'test-nano-id' },
			data: updateData,
		});
	});

	it('如果是不存在的 id 就回傳 false', async () => {
		const updateData = {
			pageTitle: 'MockPageTitle',
			subPageTitle: 'MockSubPageTitle',
			pageRoute: 'MockRouteName',
		};

		mockPageInfo.updateMany.mockResolvedValue({ count: 0 });

		const result = await service.updatePageItem({
			id: 'non-existent-id',
			data: updateData,
		});

		expect(result).toBe(false);
	});
});
});
