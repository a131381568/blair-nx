import { Buffer } from 'node:buffer';
import type { IncomingHttpHeaders } from 'node:http';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { FILE_CONFIG } from '@cts-shared';
import { FileController } from './file.controller';
import { FileService } from './file.service';

describe('fileController', () => {
	let controller: FileController;
	let _service: FileService;

	// 模擬檔案服務
	const mockFileService = {
		uploadFile: jest.fn(),
	};

	// 建立模擬的檔案物件
	const mockFile = {
		fieldname: 'file',
		originalname: 'test-image.jpg',
		encoding: '7bit',
		mimetype: 'image/jpeg',
		buffer: Buffer.from('test image content'),
		size: 1024,
		destination: '',
		filename: '',
		path: '',
	} satisfies Partial<Express.Multer.File>;

	// 建立基本請求資訊
	const baseReqInfo = {
		headers: {} as IncomingHttpHeaders,
		body: new FormData(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [FileController],
			providers: [
				{
					provide: FileService,
					useValue: mockFileService,
				},
			],
		}).compile();

		controller = module.get<FileController>(FileController);
		_service = module.get<FileService>(FileService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('上傳檔案', () => {
		it('成功上傳檔案時應該回傳檔案網址', async () => {
			const expectedUrl = 'https://test-bucket.s3.region.amazonaws.com/test-image.jpg';
			mockFileService.uploadFile.mockResolvedValue(expectedUrl);

			const handler = await controller.uploadFile(mockFile as Express.Multer.File);
			const response = await handler(baseReqInfo);

			expect(response).toEqual({
				status: 200,
				body: expectedUrl,
			});
			expect(mockFileService.uploadFile).toHaveBeenCalledWith(mockFile);
		});

		it('沒有檔案時應該拋出 BadRequestException', async () => {
			// 直接測試控制器內部的檢查邏輯
			const emptyFile = undefined as unknown as Express.Multer.File;
			const handler = await controller.uploadFile(emptyFile);

			await expect(handler(baseReqInfo)).rejects.toThrow(
				new BadRequestException('File is required'),
			);
		});

		it('上傳失敗時應該回傳空字串', async () => {
			mockFileService.uploadFile.mockResolvedValue('');

			const handler = await controller.uploadFile(mockFile as Express.Multer.File);
			const response = await handler(baseReqInfo);

			expect(response).toEqual({
				status: 200,
				body: '',
			});
		});
	});

	describe('檔案類型驗證', () => {
		const fileFilter = (req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
			if (!file.mimetype.match(`\\/(${FILE_CONFIG.ACCEPT_TYPE.join('|')})$`)) {
				return callback(new BadRequestException('Unsupported file type'), false);
			}
			callback(null, true);
		};

		it('應該接受合法的檔案類型', () => {
			const validFile = {
				mimetype: 'image/jpeg',
			} as Express.Multer.File;

			const callback = jest.fn();
			fileFilter({}, validFile, callback);
			expect(callback).toHaveBeenCalledWith(null, true);
		});

		it('應該拒絕不合法的檔案類型', () => {
			const invalidFile = {
				mimetype: 'application/pdf',
			} as Express.Multer.File;

			const callback = jest.fn();
			fileFilter({}, invalidFile, callback);
			expect(callback).toHaveBeenCalledWith(
				expect.any(BadRequestException),
				false,
			);
		});
	});
});
