import { IncomingHttpHeaders } from 'node:http';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UpdatePageItemDto } from '@cts-shared';
import { PageInfoController } from './page-info.controller';
import { PageInfoService } from './page-info.service';

// 定義請求類型接口
interface MockRequest {
	headers: IncomingHttpHeaders;
	params: Record<string, string>;
	query: Record<string, unknown>;
	body: Record<string, unknown>;
}

describe('pageInfoController', () => {
	let controller: PageInfoController;
	let _service: PageInfoService;

	const mockPageData = {
		pageTitle: '測試頁面',
		subPageTitle: '測試子標題',
		pageRoute: '/test-route',
		pageNanoId: 'test-nano-id',
	};

	const mockPageInfoService = {
		getPageInfoList: jest.fn(),
		updatePageItem: jest.fn(),
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
			controllers: [PageInfoController],
			providers: [
				{
					provide: PageInfoService,
					useValue: mockPageInfoService,
				},
			],
		}).compile();

		controller = module.get<PageInfoController>(PageInfoController);
		_service = module.get<PageInfoService>(PageInfoService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('查詢頁面列表', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			mockPageInfoService.getPageInfoList.mockResolvedValue([mockPageData]);

			const getPageInfoListHandler = await controller.getPageInfoList();
			const response = await getPageInfoListHandler(baseReqInfo);

			expect(response).toEqual({
				status: 200,
				body: [mockPageData],
			});

			expect(mockPageInfoService.getPageInfoList).toHaveBeenCalled();
		});
	});

	describe('更新頁面', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			const updateData: UpdatePageItemDto = {
				pageTitle: 'MockPageTitle',
				subPageTitle: 'MockSubPageTitle',
				pageRoute: 'MockRouteName',
			};

			mockPageInfoService.updatePageItem.mockResolvedValue(true);

			const updateItemHandler = await controller.updatePageItem('test-nano-id', updateData);
			const response = await updateItemHandler({
				...baseReqInfo,
				params: { id: 'test-nano-id' },
				body: updateData,
			});

			expect(response).toEqual({
				status: 200,
				body: 'Update success',
			});

			expect(mockPageInfoService.updatePageItem).toHaveBeenCalledWith({
				id: 'test-nano-id',
				data: updateData,
			});
		});

		it('找不到 id 拋出 NotFoundException', async () => {
			const updateData: UpdatePageItemDto = {
				pageTitle: 'MockPageTitle',
				subPageTitle: 'MockSubPageTitle',
				pageRoute: 'MockRouteName',
			};

			mockPageInfoService.updatePageItem.mockResolvedValue(false);

			const updateItemHandler = await controller.updatePageItem('non-existent-id', updateData);
			await expect(
				updateItemHandler({
					...baseReqInfo,
					params: { id: 'non-existent-id' },
					body: updateData,
				}),
			).rejects.toThrow(NotFoundException);

			expect(mockPageInfoService.updatePageItem).toHaveBeenCalledWith({
				id: 'non-existent-id',
				data: updateData,
			});
		});
	});
});
