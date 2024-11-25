import { IncomingHttpHeaders } from 'node:http';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { StargazingController } from './stargazing.controller';
import { StargazingService } from './stargazing.service';

// 定義請求類型接口
interface MockRequest {
	headers: IncomingHttpHeaders;
	params: Record<string, string>;
	query: Record<string, unknown>;
	body: Record<string, unknown>;
}

describe('stargazingController', () => {
	let controller: StargazingController;
	let _service: StargazingService;

	const mockStargazingData = {
		stargazingTitle: '合歡山觀星',
		stargazingAddress: '南投縣仁愛鄉合歡山',
		stargazingLatitude: '24.1828',
		stargazingLongitude: '121.2827',
		stargazingImage: 'test-image.jpg',
		stargazingDescription: '合歡山觀星點描述',
		stargazingNanoId: 'test-nano-id',
	};

	const mockStargazingService = {
		getStargazingQuery: jest.fn(),
		getStargazingDetail: jest.fn(),
		createStargazingDetail: jest.fn(),
		updateStargazingDetail: jest.fn(),
		deleteStargazingDetail: jest.fn(),
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
			controllers: [StargazingController],
			providers: [
				{
					provide: StargazingService,
					useValue: mockStargazingService,
				},
			],
		}).compile();

		controller = module.get<StargazingController>(StargazingController);
		_service = module.get<StargazingService>(StargazingService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('查詢觀星地點列表', () => {
		const mockPagination = {
			list: [mockStargazingData],
			meta: {
				isFirstPage: true,
				isLastPage: true,
				currentPage: 1,
				previousPage: null,
				nextPage: null,
				pageCount: 1,
				totalCount: 1,
			},
		};

		it('地圖模式：服務能夠正常運作，並回傳對應資料', async () => {
			mockStargazingService.getStargazingQuery.mockResolvedValue(mockPagination);

			const getStargazingQueryHandler = await controller.getStargazingQuery({
				mode: 'map',
				page: '1',
				limit: '10',
			});
			const response = await getStargazingQueryHandler({
				...baseReqInfo,
				query: { mode: 'map', page: '1', limit: '10' },
			});

			expect(response).toEqual({
				status: 200,
				body: mockPagination,
			});
		});

		it('列表模式：服務能夠正常運作，並回傳對應資料', async () => {
			mockStargazingService.getStargazingQuery.mockResolvedValue(mockPagination);

			const getStargazingQueryHandler = await controller.getStargazingQuery({
				mode: 'list',
				page: '1',
				limit: '10',
			});
			const response = await getStargazingQueryHandler({
				...baseReqInfo,
				query: { mode: 'list', page: '1', limit: '10' },
			});

			expect(response).toEqual({
				status: 200,
				body: mockPagination,
			});
		});
	});

	describe('查詢單一觀星地點', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			mockStargazingService.getStargazingDetail.mockResolvedValue(mockStargazingData);

			const getStargazingDetailHandler = await controller.getStargazingDetail('test-nano-id');
			const response = await getStargazingDetailHandler({
				...baseReqInfo,
				params: { id: 'test-nano-id' },
			});

			expect(response).toEqual({
				status: 200,
				body: mockStargazingData,
			});
		});

		it('找不到 id 拋出 NotFoundException', async () => {
			mockStargazingService.getStargazingDetail.mockResolvedValue(null);

			const getStargazingDetailHandler = await controller.getStargazingDetail('non-existent-id');
			await expect(
				getStargazingDetailHandler({
					...baseReqInfo,
					params: { id: 'non-existent-id' },
				}),
			).rejects.toThrow(NotFoundException);
		});
	});

	describe('建立觀星地點', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			const createData = {
				stargazingTitle: '新觀星地點',
				stargazingAddress: '新地址',
				stargazingLatitude: '25.0330',
				stargazingLongitude: '121.5654',
				stargazingImage: 'new-image.jpg',
				stargazingDescription: '新描述',
			};

			mockStargazingService.createStargazingDetail.mockResolvedValue(true);

			const createStargazingDetailHandler = await controller.createStargazingDetail(createData);
			const response = await createStargazingDetailHandler({
				...baseReqInfo,
				body: createData,
			});

			expect(response).toEqual({
				status: 200,
				body: 'Create success',
			});
			expect(mockStargazingService.createStargazingDetail).toHaveBeenCalledWith({
				data: createData,
			});
		});
	});

	describe('更新觀星地點', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			const updateData = {
				stargazingTitle: '更新的標題',
				stargazingAddress: '更新的地址',
				stargazingLatitude: '23.5',
				stargazingLongitude: '120.5',
				stargazingImage: 'updated-image.jpg',
				stargazingDescription: '更新的描述',
			};

			mockStargazingService.updateStargazingDetail.mockResolvedValue(true);

			const updateStargazingDetailHandler = await controller.updateStargazingDetail('test-nano-id', updateData);
			const response = await updateStargazingDetailHandler({
				...baseReqInfo,
				params: { id: 'test-nano-id' },
				body: updateData,
			});

			expect(response).toEqual({
				status: 200,
				body: 'Update success',
			});
			expect(mockStargazingService.updateStargazingDetail).toHaveBeenCalledWith({
				id: 'test-nano-id',
				data: updateData,
			});
		});

		it('找不到 id 拋出 NotFoundException', async () => {
			const updateData = {
				stargazingTitle: '更新的標題',
				stargazingAddress: '更新的地址',
				stargazingLatitude: '23.5',
				stargazingLongitude: '120.5',
				stargazingImage: 'updated-image.jpg',
				stargazingDescription: '更新的描述',
			};

			mockStargazingService.updateStargazingDetail.mockResolvedValue(false);

			const updateStargazingDetailHandler = await controller.updateStargazingDetail('non-existent-id', updateData);
			await expect(
				updateStargazingDetailHandler({
					...baseReqInfo,
					params: { id: 'non-existent-id' },
					body: updateData,
				}),
			).rejects.toThrow(NotFoundException);
		});
	});

	describe('刪除觀星地點', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			mockStargazingService.deleteStargazingDetail.mockResolvedValue(true);

			const deleteStargazingDetailHandler = await controller.deleteStargazingDetail('test-nano-id');
			const response = await deleteStargazingDetailHandler({
				...baseReqInfo,
				params: { id: 'test-nano-id' },
			});

			expect(response).toEqual({
				status: 200,
				body: 'Delete success',
			});
			expect(mockStargazingService.deleteStargazingDetail).toHaveBeenCalledWith({
				id: 'test-nano-id',
			});
		});

		it('找不到 id 拋出 NotFoundException', async () => {
			mockStargazingService.deleteStargazingDetail.mockResolvedValue(false);

			const deleteStargazingDetailHandler = await controller.deleteStargazingDetail('non-existent-id');
			await expect(
				deleteStargazingDetailHandler({
					...baseReqInfo,
					params: { id: 'non-existent-id' },
				}),
			).rejects.toThrow(NotFoundException);
		});
	});
});
