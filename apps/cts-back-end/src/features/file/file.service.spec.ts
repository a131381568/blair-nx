import { Buffer } from 'node:buffer';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { FileService } from './file.service';

// Mock S3 Client
jest.mock('@aws-sdk/client-s3', () => ({
	S3Client: jest.fn().mockImplementation(() => ({
		send: jest.fn(),
	})),
	PutObjectCommand: jest.fn(),
}));

describe('fileService', () => {
	let service: FileService;
	let configService: ConfigService;
	let s3ClientMock: jest.Mocked<S3Client>;

	const mockConfig = {
		AWS_REGION: 'ap-northeast-1',
		AWS_ACCESS_KEY_ID: 'test-access-key',
		AWS_SECRET_ACCESS_KEY: 'test-secret-key',
		AWS_S3_BUCKET_NAME: 'test-bucket',
	} as const;

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

	beforeEach(async () => {
		const mockConfigService = {
			get: jest.fn((key: keyof typeof mockConfig) => mockConfig[key]),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				FileService,
				{
					provide: ConfigService,
					useValue: mockConfigService,
				},
			],
		}).compile();

		service = module.get<FileService>(FileService);
		configService = module.get<ConfigService>(ConfigService);
		s3ClientMock = new S3Client({}) as jest.Mocked<S3Client>;

		// 使用 mock 替換 S3 client 端
		(service as any).s3Client = s3ClientMock;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('constructor', () => {
		it('配置 AWS 正確初始化', () => {
			expect(configService.get).toHaveBeenCalledWith('AWS_REGION');
			expect(configService.get).toHaveBeenCalledWith('AWS_ACCESS_KEY_ID');
			expect(configService.get).toHaveBeenCalledWith('AWS_SECRET_ACCESS_KEY');
		});
	});

	describe('上傳檔案', () => {
		it('成功上傳檔案，並回傳 URL', async () => {
			const mockResponse = {
				$metadata: {
					httpStatusCode: 200,
				},
			};

			s3ClientMock.send = jest.fn().mockResolvedValueOnce(mockResponse);

			const result = await service.uploadFile(mockFile as Express.Multer.File);

			// 驗證使用正確的參數呼叫 S3 client 端
			expect(PutObjectCommand).toHaveBeenCalledWith(expect.objectContaining({
				Bucket: mockConfig.AWS_S3_BUCKET_NAME,
				ContentType: mockFile.mimetype,
				Body: mockFile.buffer,
			}));

			// 驗證傳回的URL格式
			expect(result).toMatch(
				new RegExp(
					`^https://${mockConfig.AWS_S3_BUCKET_NAME}.s3.${mockConfig.AWS_REGION}.amazonaws.com/.*-test-image.jpg$`,
				),
			);
		});

		it('上傳回應不是 200 時應該回空字串', async () => {
			const mockResponse = {
				$metadata: {
					httpStatusCode: 400,
				},
			};

			s3ClientMock.send = jest.fn().mockResolvedValueOnce(mockResponse);

			const result = await service.uploadFile(mockFile as Express.Multer.File);
			expect(result).toBe('');
		});

		it('當 S3 上傳失敗時應該拋出錯誤', async () => {
			s3ClientMock.send = jest.fn().mockRejectedValueOnce(new Error('Upload failed'));

			const mockLogger = { error: jest.fn() };
			(service as any).logger = mockLogger;

			await expect(service.uploadFile(mockFile as Express.Multer.File))
				.rejects.toThrow('File upload failed');

			expect(mockLogger.error).toHaveBeenCalledWith(
				'Error uploading file to S3',
				expect.any(Error),
			);
		});

		it('應該處理非緩衝區文件內容', async () => {
			const nonBufferFile = {
				...mockFile,
				buffer: new Uint8Array([1, 2, 3]),
			};

			const mockResponse = {
				$metadata: {
					httpStatusCode: 200,
				},
			};

			s3ClientMock.send = jest.fn().mockResolvedValueOnce(mockResponse);

			const result = await service.uploadFile(nonBufferFile as Express.Multer.File);

			expect(PutObjectCommand).toHaveBeenCalledWith(
				expect.objectContaining({
					Body: expect.any(Buffer),
				}),
			);
			expect(result).toBeTruthy();
		});
	});
});
