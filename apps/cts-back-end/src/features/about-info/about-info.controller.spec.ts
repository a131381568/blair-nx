import { IncomingHttpHeaders } from 'node:http';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateAboutInfoDto } from '@cts-shared';
import { AboutInfoController } from './about-info.controller';
import { AboutInfoService } from './about-info.service';

// 定義請求類型接口
interface MockRequest {
	headers: IncomingHttpHeaders;
	params: Record<string, string>;
	query: Record<string, unknown>;
	body: Record<string, unknown>;
}

describe('aboutInfoController', () => {
	let controller: AboutInfoController;
	let _service: AboutInfoService;

	const mockAboutInfoData = {
		visual: 'test-visual.jpg',
		slogan: 'Test Slogan',
		philosophy: 'Test Philosophy',
		quote: 'Test Quote',
		epilogue: 'Test Epilogue',
	};

	const mockAboutInfoService = {
		getAboutInfo: jest.fn(),
		updateAboutInfo: jest.fn(),
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
			controllers: [AboutInfoController],
			providers: [
				{
					provide: AboutInfoService,
					useValue: mockAboutInfoService,
				},
			],
		}).compile();

		controller = module.get<AboutInfoController>(AboutInfoController);
		_service = module.get<AboutInfoService>(AboutInfoService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('查詢關於資訊', () => {
		it('服務能夠正常運作，並回傳對應資料', async () => {
			mockAboutInfoService.getAboutInfo.mockResolvedValue(mockAboutInfoData);

			const handler = await controller.getAboutInfo();
			const response = await handler(baseReqInfo);

			expect(response).toEqual({
				status: 200,
				body: mockAboutInfoData,
			});
		});
	});

	describe('更新關於資訊', () => {
		it('服務能夠正常運作，並回傳成功訊息', async () => {
			const updateData: UpdateAboutInfoDto = {
				visual: 'updated-visual.jpg',
				slogan: 'Updated Slogan',
				philosophy: 'Updated Philosophy',
			};

			mockAboutInfoService.updateAboutInfo.mockResolvedValue({
				success: true,
				data: null,
				message: 'Update success',
			});

			const handler = await controller.updateAboutInfo(updateData);
			const response = await handler({
				...baseReqInfo,
				body: updateData,
			});

			expect(response).toEqual({
				status: 200,
				body: 'Update success',
			});

			expect(mockAboutInfoService.updateAboutInfo).toHaveBeenCalledWith({
				data: updateData,
			});
		});
	});
});
