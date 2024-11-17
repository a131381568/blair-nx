import { IncomingHttpHeaders } from 'node:http';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CreateFacilityItemDto, UpdateFacilityItemDto } from '@cts-shared';
import { FacilitiesController } from './facilities.controller';
import { FacilitiesService } from './facilities.service';

// 定義請求類型接口
interface MockRequest {
	headers: IncomingHttpHeaders;
	params: Record<string, string>;
	query: Record<string, unknown>;
	body: Record<string, unknown>;
}

describe('facilitiesController', () => {
	let controller: FacilitiesController;
	let _service: FacilitiesService;

	const mockFacilityData = {
		facilitiesTitle: 'Test Facility',
		facilitiesDescription: 'Test Description',
		facilitiesImage: 'test-image.jpg',
		facilitiesLink: 'test-link',
		facilitiesNanoId: 'test-nano-id',
	};

	const mockFacilitiesService = {
		getFacilitiesList: jest.fn(),
		getFacilityItem: jest.fn(),
		createFacilityItem: jest.fn(),
		updateFacilityItem: jest.fn(),
		deleteFacilityItem: jest.fn(),
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
			controllers: [FacilitiesController],
			providers: [
				{
					provide: FacilitiesService,
					useValue: mockFacilitiesService,
				},
			],
		}).compile();

		controller = module.get<FacilitiesController>(FacilitiesController);
		_service = module.get<FacilitiesService>(FacilitiesService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('查詢設施列表', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			mockFacilitiesService.getFacilitiesList.mockResolvedValue([mockFacilityData]);

			const response = await controller.getFacilitiesList()(baseReqInfo);

			expect(response).toEqual({
				status: 200,
				body: [mockFacilityData],
			});
		});
	});

	describe('查詢單一設施', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			mockFacilitiesService.getFacilityItem.mockResolvedValue(mockFacilityData);

			const response = await controller.getFacilityItem('test-nano-id')({
				...baseReqInfo,
				params: { id: 'test-nano-id' },
			});

			expect(response).toEqual({
				status: 200,
				body: mockFacilityData,
			});
		});

		it('找不到 id 拋出 NotFoundException', async () => {
			mockFacilitiesService.getFacilityItem.mockResolvedValue(null);

			await expect(
				controller.getFacilityItem('non-existent-id')({
					...baseReqInfo,
					params: { id: 'non-existent-id' },
				}),
			).rejects.toThrow(NotFoundException);
		});
	});

	describe('建立設施', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			const createData: CreateFacilityItemDto = {
				facilitiesTitle: 'New Facility',
				facilitiesDescription: 'New Description',
				facilitiesImage: 'new-image.jpg',
				facilitiesLink: 'new-link',
			};

			mockFacilitiesService.createFacilityItem.mockResolvedValue(true);

			const response = await controller.createFacilityItem(createData)({
				...baseReqInfo,
				body: createData,
			});

			expect(response).toEqual({
				status: 200,
				body: 'Create success',
			});
			expect(mockFacilitiesService.createFacilityItem).toHaveBeenCalledWith({
				data: createData,
			});
		});
	});

	describe('更新設施', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			const updateData: UpdateFacilityItemDto = {
				facilitiesTitle: 'Updated Title',
			};

			mockFacilitiesService.updateFacilityItem.mockResolvedValue(true);

			const response = await controller.updateFacilityItem('test-nano-id', updateData)({
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
			const updateData: UpdateFacilityItemDto = {
				facilitiesTitle: 'Updated Title',
			};

			mockFacilitiesService.updateFacilityItem.mockResolvedValue(false);

			await expect(
				controller.updateFacilityItem('non-existent-id', updateData)({
					...baseReqInfo,
					params: { id: 'non-existent-id' },
					body: updateData,
				}),
			).rejects.toThrow(NotFoundException);
		});
	});

	describe('刪除設施', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			mockFacilitiesService.deleteFacilityItem.mockResolvedValue(true);

			const response = await controller.deleteFacilityItem('test-nano-id')({
				...baseReqInfo,
				params: { id: 'test-nano-id' },
			});

			expect(response).toEqual({
				status: 200,
				body: 'Delete success',
			});
		});

		it('找不到 id 拋出 NotFoundException', async () => {
			mockFacilitiesService.deleteFacilityItem.mockResolvedValue(false);

			await expect(
				controller.deleteFacilityItem('non-existent-id')({
					...baseReqInfo,
					params: { id: 'non-existent-id' },
				}),
			).rejects.toThrow(NotFoundException);
		});
	});
});
