import { IncomingHttpHeaders } from 'node:http';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, PostCategoryFitDto } from '@cts-shared';
import { PostCategoriesController } from './post-categories.controller';
import { PostCategoriesService } from './post-categories.service';

// 定義請求類型接口
interface MockRequest {
	headers: IncomingHttpHeaders;
	params: Record<string, string>;
	query: Record<string, unknown>;
	body: Record<string, unknown>;
}

describe('postCategoriesController', () => {
	let controller: PostCategoriesController;
	let _service: PostCategoriesService;

	const mockPostCategoryData = {
		postCategoryId: 'TESTID',
		postCategoryName: '測試分類名稱',
		postCategoryNanoId: 'abcdef1234',
	};

	const mockPostCategoriesService = {
		getPostCategories: jest.fn(),
		getPostCategory: jest.fn(),
		createPostCategory: jest.fn(),
		updatePostCategory: jest.fn(),
		deletePostCategory: jest.fn(),
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
			controllers: [PostCategoriesController],
			providers: [
				{
					provide: PostCategoriesService,
					useValue: mockPostCategoriesService,
				},
			],
		}).compile();

		controller = module.get<PostCategoriesController>(PostCategoriesController);
		_service = module.get<PostCategoriesService>(PostCategoriesService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('查詢文章分類列表', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			mockPostCategoriesService.getPostCategories.mockResolvedValue([mockPostCategoryData]);

			const response = await (await controller.getPostCategories())(baseReqInfo);

			expect(response).toEqual({
				status: 200,
				body: [mockPostCategoryData],
			});

			expect(mockPostCategoriesService.getPostCategories).toHaveBeenCalled();
		});
	});

	describe('查詢單一文章分類', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			mockPostCategoriesService.getPostCategory.mockResolvedValue(mockPostCategoryData);

			const response = await (await controller.getPostCategory('abcdef1234'))({
				...baseReqInfo,
				params: { id: 'abcdef1234' },
			});

			expect(response).toEqual({
				status: 200,
				body: mockPostCategoryData,
			});

			expect(mockPostCategoriesService.getPostCategory).toHaveBeenCalledWith({
				id: 'abcdef1234',
			});
		});

		it('找不到 id 拋出 NotFoundException', async () => {
			mockPostCategoriesService.getPostCategory.mockResolvedValue(null);

			await expect(
				(await controller.getPostCategory('abcdef1234'))({
					...baseReqInfo,
					params: { id: 'abcdef1234' },
				}),
			).rejects.toThrow(NotFoundException);

			expect(mockPostCategoriesService.getPostCategory).toHaveBeenCalledWith({
				id: 'abcdef1234',
			});
		});
	});

	describe('建立文章分類', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			const createData: CreateCategoryDto = {
				postCategoryId: 'NEWCATID',
				postCategoryName: '新分類名稱',
			};

			mockPostCategoriesService.createPostCategory.mockResolvedValue(true);

			const response = await (await controller.createPostCategory(createData))({
				...baseReqInfo,
				body: createData,
			});

			expect(response).toEqual({
				status: 200,
				body: 'Create success',
			});

			expect(mockPostCategoriesService.createPostCategory).toHaveBeenCalledWith({
				data: createData,
			});
		});
	});

	describe('更新文章分類', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			const updateData: PostCategoryFitDto = {
				postCategoryId: 'UPDATEDID',
				postCategoryName: '更新的分類名稱',
			};

			mockPostCategoriesService.updatePostCategory.mockResolvedValue(true);

			const response = await (await controller.updatePostCategory('abcdef1234', updateData))({
				...baseReqInfo,
				params: { id: 'abcdef1234' },
				body: updateData,
			});

			expect(response).toEqual({
				status: 200,
				body: 'Update success',
			});

			expect(mockPostCategoriesService.updatePostCategory).toHaveBeenCalledWith({
				id: 'abcdef1234',
				data: updateData,
			});
		});

		it('找不到 id 拋出 NotFoundException', async () => {
			const updateData: PostCategoryFitDto = {
				postCategoryId: 'UPDATEDID',
				postCategoryName: '更新的分類名稱',
			};

			mockPostCategoriesService.updatePostCategory.mockResolvedValue(false);

			await expect(
				(await controller.updatePostCategory('abcdef1234', updateData))({
					...baseReqInfo,
					params: { id: 'abcdef1234' },
					body: updateData,
				}),
			).rejects.toThrow(NotFoundException);

			expect(mockPostCategoriesService.updatePostCategory).toHaveBeenCalledWith({
				id: 'abcdef1234',
				data: updateData,
			});
		});
	});

	describe('刪除文章分類', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			mockPostCategoriesService.deletePostCategory.mockResolvedValue(true);

			const response = await (await controller.deletePostCategory('abcdef1234'))({
				...baseReqInfo,
				params: { id: 'abcdef1234' },
			});

			expect(response).toEqual({
				status: 200,
				body: 'Delete success',
			});

			expect(mockPostCategoriesService.deletePostCategory).toHaveBeenCalledWith({
				id: 'abcdef1234',
			});
		});

		it('找不到 id 拋出 NotFoundException', async () => {
			mockPostCategoriesService.deletePostCategory.mockResolvedValue(false);

			await expect(
				(await controller.deletePostCategory('abcdef1234'))({
					...baseReqInfo,
					params: { id: 'abcdef1234' },
				}),
			).rejects.toThrow(NotFoundException);

			expect(mockPostCategoriesService.deletePostCategory).toHaveBeenCalledWith({
				id: 'abcdef1234',
			});
		});
	});
});
