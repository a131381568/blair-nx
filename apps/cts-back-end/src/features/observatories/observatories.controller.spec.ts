import { IncomingHttpHeaders } from 'node:http';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UpdateObservatoryItemDto } from '@cts-shared';
import { ObservatoriesController } from './observatories.controller';
import { ObservatoriesService } from './observatories.service';

// 定義請求類型接口
interface MockRequest {
	headers: IncomingHttpHeaders;
	params: Record<string, string>;
	query: Record<string, unknown>;
	body: Record<string, unknown>;
}

describe('observatoriesController', () => {
	let controller: ObservatoriesController;
	let _service: ObservatoriesService;

	const mockObservatoryData = {
		observatoryNanoId: 'test-nano-id',
		observatoryCategoryName: 'Test Category',
		observatoryCategoryId: 'category-1',
		observatoryPostContent: 'Test Content',
	};

	const mockObservatoriesService = {
		getObservatoriesList: jest.fn(),
		getObservatoryItem: jest.fn(),
		createObservatoryItem: jest.fn(),
		updateObservatoryItem: jest.fn(),
		deleteObservatoryItem: jest.fn(),
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
			controllers: [ObservatoriesController],
			providers: [
				{
					provide: ObservatoriesService,
					useValue: mockObservatoriesService,
				},
			],
		}).compile();

		controller = module.get<ObservatoriesController>(ObservatoriesController);
		_service = module.get<ObservatoriesService>(ObservatoriesService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('查詢天文台列表', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			mockObservatoriesService.getObservatoriesList.mockResolvedValue([mockObservatoryData]);

			const handler = controller.getObservatoriesList();
			const response = await handler(baseReqInfo);

			expect(response).toEqual({
				status: 200,
				body: [mockObservatoryData],
			});
		});
	});

	describe('查詢單一天文台', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			mockObservatoriesService.getObservatoryItem.mockResolvedValue(mockObservatoryData);

			const handler = controller.getObservatoryItem('test-nano-id');
			const response = await handler({
				...baseReqInfo,
				params: { id: 'test-nano-id' },
			});

			expect(response).toEqual({
				status: 200,
				body: mockObservatoryData,
			});
		});

		it('找不到 id 拋出 NotFoundException', async () => {
			mockObservatoriesService.getObservatoryItem.mockResolvedValue(null);

			const handler = controller.getObservatoryItem('non-existent-id');
			await expect(
				handler({
					...baseReqInfo,
					params: { id: 'non-existent-id' },
				}),
			).rejects.toThrow(NotFoundException);
		});
	});

	describe('建立天文台', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			const createData: UpdateObservatoryItemDto = {
				observatoryCategoryName: 'New Category',
				observatoryCategoryId: 'new-category',
				observatoryPostContent: 'New Content',
			};

			mockObservatoriesService.createObservatoryItem.mockResolvedValue(true);

			const handler = await controller.createObservatoryItem(createData);
			const response = await handler({
				...baseReqInfo,
				body: createData,
			});

			expect(response).toEqual({
				status: 200,
				body: 'Create success',
			});
			expect(mockObservatoriesService.createObservatoryItem).toHaveBeenCalledWith({
				data: createData,
			});
		});
	});

	describe('更新天文台', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			const updateData: UpdateObservatoryItemDto = {
				observatoryCategoryName: 'Mock Category',
				observatoryCategoryId: 'Mock Id',
				observatoryPostContent: 'Mock Content',
			};

			mockObservatoriesService.updateObservatoryItem.mockResolvedValue(true);

			const handler = controller.updateObservatoryItem('test-nano-id', updateData);
			const response = await handler({
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
			const updateData: UpdateObservatoryItemDto = {
				observatoryCategoryName: 'Mock Category',
				observatoryCategoryId: 'Mock Id',
				observatoryPostContent: 'Mock Content',
			};

			mockObservatoriesService.updateObservatoryItem.mockResolvedValue(false);

			const handler = controller.updateObservatoryItem('non-existent-id', updateData);
			await expect(
				handler({
					...baseReqInfo,
					params: { id: 'non-existent-id' },
					body: updateData,
				}),
			).rejects.toThrow(NotFoundException);
		});
	});

	describe('刪除天文台', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			mockObservatoriesService.deleteObservatoryItem.mockResolvedValue(true);

			const handler = controller.deleteObservatoryItem('test-nano-id');
			const response = await handler({
				...baseReqInfo,
				params: { id: 'test-nano-id' },
			});

			expect(response).toEqual({
				status: 200,
				body: 'Delete success',
			});
		});

		it('找不到 id 拋出 NotFoundException', async () => {
			mockObservatoriesService.deleteObservatoryItem.mockResolvedValue(false);

			const handler = controller.deleteObservatoryItem('non-existent-id');
			await expect(
				handler({
					...baseReqInfo,
					params: { id: 'non-existent-id' },
				}),
			).rejects.toThrow(NotFoundException);
		});
	});
});
