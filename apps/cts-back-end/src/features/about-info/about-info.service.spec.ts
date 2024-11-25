import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { PrismaPromise } from '@prisma/client';
import { defaultAboutInfoData } from '@cts-shared';
import type { ExtendedPrismaClient } from '../shared/prisma.extension';
import { PRISMA_CLIENT } from '../shared/prisma.extension';
import { AboutInfoService } from './about-info.service';

describe('aboutInfoService', () => {
	let service: AboutInfoService;
	let _prisma: ExtendedPrismaClient;

	const mockAboutInfoData = {
		aboutId: 1,
		visual: 'test-visual.jpg',
		slogan: 'Test Slogan',
		philosophy: 'Test Philosophy',
		quote: 'Test Quote',
		epilogue: 'Test Epilogue',
	};

type MockPrismaFunction<T> = jest.Mock<PrismaPromise<T>>;

const createMockPrismaFunction = <T>(): MockPrismaFunction<T> => {
	return jest.fn().mockImplementation(() => Promise.resolve({} as T));
};

const mockAboutInfo = {
	findFirst: createMockPrismaFunction<typeof mockAboutInfoData | null>(),
	update: createMockPrismaFunction<typeof mockAboutInfoData>(),
};

const mockPrisma = {
	aboutInfo: mockAboutInfo,
	$transaction: jest.fn().mockImplementation(cb => cb(mockPrisma)),
	$extends: jest.fn().mockReturnThis(),
} as unknown as ExtendedPrismaClient;

beforeEach(async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [
			AboutInfoService,
			{
				provide: PRISMA_CLIENT,
				useValue: mockPrisma,
			},
		],
	}).compile();

	service = module.get<AboutInfoService>(AboutInfoService);
	_prisma = module.get(PRISMA_CLIENT);

	// Reset all mocks before each test
	Object.values(mockAboutInfo).forEach(mock => mock.mockReset());
});

describe('getAboutInfo', () => {
	it('應該回傳正確的資料格式', async () => {
		mockAboutInfo.findFirst.mockResolvedValue(mockAboutInfoData);

		const result = await service.getAboutInfo();

		expect(mockAboutInfo.findFirst).toHaveBeenCalledWith({
			where: { aboutId: 1 },
		});

		expect(result).toEqual({
			visual: mockAboutInfoData.visual,
			slogan: mockAboutInfoData.slogan,
			philosophy: mockAboutInfoData.philosophy,
			quote: mockAboutInfoData.quote,
			epilogue: mockAboutInfoData.epilogue,
		});
	});

	it('當找不到資料時應該回傳預設值', async () => {
		mockAboutInfo.findFirst.mockResolvedValue(null);

		const result = await service.getAboutInfo();

		expect(result).toEqual(defaultAboutInfoData);
	});
});

describe('updateAboutInfo', () => {
	it('更新成功時應該回傳成功訊息', async () => {
		const updateData = {
			visual: 'updated-visual.jpg',
			slogan: 'Updated Slogan',
			philosophy: 'Updated Philosophy',
		};

		mockAboutInfo.update.mockResolvedValue({
			...mockAboutInfoData,
			...updateData,
		});

		const result = await service.updateAboutInfo({ data: updateData });

		expect(mockAboutInfo.update).toHaveBeenCalledWith({
			where: { aboutId: 1 },
			data: updateData,
		});

		expect(result).toEqual({
			success: true,
			data: null,
			message: 'Update success',
		});
	});
});
});
