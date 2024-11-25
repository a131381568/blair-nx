import { IncomingHttpHeaders } from 'node:http';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CreateScienceDto, ScienceQueryPartialDto } from '@cts-shared';
import { ScienceController } from './science.controller';
import { ScienceService } from './science.service';

interface MockRequest {
	headers: IncomingHttpHeaders;
	params: Record<string, string>;
	query: Record<string, unknown>;
	body: Record<string, unknown>;
}

describe('scienceController', () => {
	let controller: ScienceController;
	let _service: ScienceService;

	const mockScienceData = {
		title: 'Test Science',
		content: 'Test Content',
		image: 'test-image.jpg',
		postNanoId: 'test-nano-id',
		updateTime: '2024-01-01',
		postCategoryName: 'Test Category',
		postCategoryId: 'test-category-id',
	};

	const mockScienceService = {
		getScienceList: jest.fn(),
		getScienceDetail: jest.fn(),
		createScienceDetail: jest.fn(),
		updateScienceDetail: jest.fn(),
		deleteScienceDetail: jest.fn(),
	};

	const baseReqInfo: MockRequest = {
		headers: {} as IncomingHttpHeaders,
		params: {},
		query: {},
		body: {},
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ScienceController],
			providers: [
				{
					provide: ScienceService,
					useValue: mockScienceService,
				},
			],
		}).compile();

		controller = module.get<ScienceController>(ScienceController);
		_service = module.get<ScienceService>(ScienceService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('查詢文章列表', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			const queryData: ScienceQueryPartialDto = {
				keyword: 'test',
				category: 'all',
				page: '1',
				limit: '10',
			};

			const mockResponse = {
				list: [mockScienceData],
				meta: {
					pageCount: 1,
					total: 1,
				},
			};

			mockScienceService.getScienceList.mockResolvedValue(mockResponse);

			const response = await controller.getScienceList(queryData)(baseReqInfo);

			expect(response).toEqual({
				status: 200,
				body: mockResponse,
			});
		});
	});

	describe('查詢單一文章', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			mockScienceService.getScienceDetail.mockResolvedValue(mockScienceData);

			const response = await controller.getScienceDetail('test-nano-id')({
				...baseReqInfo,
				params: { id: 'test-nano-id' },
			});

			expect(response).toEqual({
				status: 200,
				body: mockScienceData,
			});
		});

		it('找不到 id 拋出 NotFoundException', async () => {
			mockScienceService.getScienceDetail.mockResolvedValue(null);

			await expect(
				controller.getScienceDetail('non-existent-id')({
					...baseReqInfo,
					params: { id: 'non-existent-id' },
				}),
			).rejects.toThrow(NotFoundException);
		});
	});

	describe('建立文章', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			const createData: CreateScienceDto = {
				title: 'New Science',
				content: 'New Content',
				image: 'new-image.jpg',
				postCategoryNanoId: 'category-id',
			};

			mockScienceService.createScienceDetail.mockResolvedValue(true);

			const response = await controller.createScienceDetail(createData)({
				...baseReqInfo,
				body: createData,
			});

			expect(response).toEqual({
				status: 200,
				body: 'Create success',
			});
		});
	});

	describe('更新文章', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			const updateData: CreateScienceDto = {
				title: 'Updated Science',
				content: 'Updated Content',
				image: 'updated-image.jpg',
				postCategoryNanoId: 'updated-category-id',
			};

			mockScienceService.updateScienceDetail.mockResolvedValue(true);

			const response = await controller.updateScienceDetail('test-nano-id', updateData)({
				...baseReqInfo,
				params: { id: 'test-nano-id' },
				body: updateData,
			});

			expect(response).toEqual({
				status: 200,
				body: 'Update success',
			});
		});

		it('找不到 id 拋出 NotFoundException', async () => {
			const updateData: CreateScienceDto = {
				title: 'Updated Science',
				content: 'Updated Content',
				image: 'updated-image.jpg',
				postCategoryNanoId: 'updated-category-id',
			};

			mockScienceService.updateScienceDetail.mockResolvedValue(false);

			await expect(
				controller.updateScienceDetail('non-existent-id', updateData)({
					...baseReqInfo,
					params: { id: 'non-existent-id' },
					body: updateData,
				}),
			).rejects.toThrow(NotFoundException);
		});
	});

	describe('刪除文章', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			mockScienceService.deleteScienceDetail.mockResolvedValue(true);

			const response = await controller.deleteScienceDetail('test-nano-id')({
				...baseReqInfo,
				params: { id: 'test-nano-id' },
			});

			expect(response).toEqual({
				status: 200,
				body: 'Delete success',
			});
		});

		it('找不到 id 拋出 NotFoundException', async () => {
			mockScienceService.deleteScienceDetail.mockResolvedValue(false);

			await expect(
				controller.deleteScienceDetail('non-existent-id')({
					...baseReqInfo,
					params: { id: 'non-existent-id' },
				}),
			).rejects.toThrow(NotFoundException);
		});
	});
});
