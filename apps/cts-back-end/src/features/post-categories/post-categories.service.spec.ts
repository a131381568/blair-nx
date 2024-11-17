import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { PrismaPromise } from '@prisma/client';
import type { CreateCategoryDto, PostCategoryFitDto } from '@cts-shared';
import type { ExtendedPrismaClient } from '../shared/prisma.extension';
import { PRISMA_CLIENT } from '../shared/prisma.extension';
import { PostCategoriesService } from './post-categories.service';

describe('postCategoriesService', () => {
	let service: PostCategoriesService;
	let _prisma: ExtendedPrismaClient;

	// 測試資料
	const mockPostCategoryData = {
		postCategoryId: 'TESTID',
		postCategoryName: '測試分類名稱',
		postCategoryNanoId: 'abcdef1234', // 10 characters
		postCategoryOrderId: 1,
		published: true,
	};

type MockPrismaFunction<T> = jest.Mock<PrismaPromise<T>>;

const createMockPrismaFunction = <T>(): MockPrismaFunction<T> => {
	return jest.fn().mockImplementation(() => Promise.resolve({} as T));
};

const mockPostCategories = {
	findMany: createMockPrismaFunction<typeof mockPostCategoryData[]>(),
	findFirst: createMockPrismaFunction<typeof mockPostCategoryData | null>(),
	create: createMockPrismaFunction<typeof mockPostCategoryData>(),
	updateMany: createMockPrismaFunction<{ count: number }>(),
};

const mockPrisma = {
	postCategories: mockPostCategories,
	$transaction: jest.fn().mockImplementation(cb => cb(mockPrisma)),
	$extends: jest.fn().mockReturnThis(),
} as unknown as ExtendedPrismaClient;

beforeEach(async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [
			PostCategoriesService,
			{
				provide: PRISMA_CLIENT,
				useValue: mockPrisma,
			},
		],
	}).compile();

	service = module.get<PostCategoriesService>(PostCategoriesService);
	_prisma = module.get(PRISMA_CLIENT);

	Object.values(mockPostCategories).forEach(mock => mock.mockReset());
});

describe('查詢文章分類列表', () => {
	it('確認是列表格式，並驗證資料結構', async () => {
		const mockData = [mockPostCategoryData];
		mockPostCategories.findMany.mockResolvedValue(mockData);

		const result = await service.getPostCategories();

		expect(mockPostCategories.findMany).toHaveBeenCalledWith({
			orderBy: { postCategoryOrderId: 'asc' },
			where: { published: true },
		});

		expect(result[0]).toEqual({
			postCategoryId: mockPostCategoryData.postCategoryId,
			postCategoryName: mockPostCategoryData.postCategoryName,
			postCategoryNanoId: mockPostCategoryData.postCategoryNanoId,
		});
	});
});

describe('查詢單一文章分類', () => {
	it('回傳正確格式', async () => {
		mockPostCategories.findFirst.mockResolvedValue(mockPostCategoryData);

		const result = await service.getPostCategory({ id: 'abcdef1234' });

		expect(result).toEqual({
			postCategoryId: mockPostCategoryData.postCategoryId,
			postCategoryName: mockPostCategoryData.postCategoryName,
		});

		expect(mockPostCategories.findFirst).toHaveBeenCalledWith({
			where: {
				postCategoryNanoId: 'abcdef1234',
				published: true,
			},
		});
	});

	it('如果是不存在的 id 就回傳預設值', async () => {
		mockPostCategories.findFirst.mockResolvedValue(null);

		const result = await service.getPostCategory({ id: 'abcdef1234' });

		expect(result).toEqual({
			postCategoryId: '',
			postCategoryName: '',
		});
	});
});

describe('建立文章分類', () => {
	it('建立成功應回傳 true', async () => {
		const createData: CreateCategoryDto = {
			postCategoryId: 'NEWCATID',
			postCategoryName: '新分類名稱',
		};

		const mockCreatedData = {
			...createData,
			postCategoryNanoId: 'abcdef1234',
			postCategoryOrderId: 2,
			published: true,
		};

		mockPostCategories.create.mockResolvedValue(mockCreatedData);

		const result = await service.createPostCategory({ data: createData });

		expect(result).toBe(true);
		expect(mockPostCategories.create).toHaveBeenCalledWith({
			data: { ...createData, published: true },
		});
	});
});

describe('更新文章分類', () => {
	it('更新成功時回傳 true', async () => {
		const updateData: PostCategoryFitDto = {
			postCategoryId: 'UPDATEDID',
			postCategoryName: '更新的分類名稱',
		};

		mockPostCategories.updateMany.mockResolvedValue({ count: 1 });

		const result = await service.updatePostCategory({
			id: 'abcdef1234',
			data: updateData,
		});

		expect(result).toBe(true);
		expect(mockPostCategories.updateMany).toHaveBeenCalledWith({
			where: {
				postCategoryNanoId: 'abcdef1234',
				published: true,
			},
			data: updateData,
		});
	});

	it('如果是不存在的 id 就回傳 false', async () => {
		mockPostCategories.updateMany.mockResolvedValue({ count: 0 });

		const result = await service.updatePostCategory({
			id: 'abcdef1234',
			data: {
				postCategoryId: 'UPDATEDID',
				postCategoryName: '更新的分類名稱',
			},
		});

		expect(result).toBe(false);
	});
});

describe('刪除文章分類', () => {
	it('刪除成功時回傳 true', async () => {
		mockPostCategories.updateMany.mockResolvedValue({ count: 1 });

		const result = await service.deletePostCategory({ id: 'abcdef1234' });

		expect(result).toBe(true);
		expect(mockPostCategories.updateMany).toHaveBeenCalledWith({
			where: {
				postCategoryNanoId: 'abcdef1234',
				published: true,
			},
			data: { published: false },
		});
	});

	it('如果是不存在的 id 就回傳 false', async () => {
		mockPostCategories.updateMany.mockResolvedValue({ count: 0 });

		const result = await service.deletePostCategory({ id: 'abcdef1234' });

		expect(result).toBe(false);
	});
});
});
