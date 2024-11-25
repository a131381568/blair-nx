import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { PrismaPromise } from '@prisma/client';
import type { ExtendedPrismaClient } from '../shared/prisma.extension';
import { PRISMA_CLIENT } from '../shared/prisma.extension';
import { FacilitiesService } from './facilities.service';

describe('facilitiesService', () => {
	let service: FacilitiesService;
	let _prisma: ExtendedPrismaClient;

	const mockFacilityData = {
		facilitiesTitle: 'Test Facility',
		facilitiesDescription: 'Test Description',
		facilitiesImage: 'test-image.jpg',
		facilitiesLink: 'test-link',
		facilitiesNanoId: 'test-nano-id',
		facilitiesOrderId: 1,
		published: true,
	};

type MockPrismaFunction<T> = jest.Mock<PrismaPromise<T>>;

const createMockPrismaFunction = <T>(): MockPrismaFunction<T> => {
	return jest.fn().mockImplementation(() => Promise.resolve({} as T));
};

const mockFacilitiesList = {
	findMany: createMockPrismaFunction<typeof mockFacilityData[]>(),
	findFirst: createMockPrismaFunction<typeof mockFacilityData | null>(),
	create: createMockPrismaFunction<typeof mockFacilityData>(),
	updateMany: createMockPrismaFunction<{ count: number }>(),
};

const mockPrisma = {
	facilitiesList: mockFacilitiesList,
	$transaction: jest.fn().mockImplementation(cb => cb(mockPrisma)),
	$extends: jest.fn().mockReturnThis(),
} as unknown as ExtendedPrismaClient;

beforeEach(async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [
			FacilitiesService,
			{
				provide: PRISMA_CLIENT,
				useValue: mockPrisma,
			},
		],
	}).compile();

	service = module.get<FacilitiesService>(FacilitiesService);
	_prisma = module.get(PRISMA_CLIENT);

	Object.values(mockFacilitiesList).forEach(mock => mock.mockReset());
});

describe('查詢設施列表', () => {
	it('確認是列表格式，並驗證第一筆資料', async () => {
		const mockData = [mockFacilityData];
		mockFacilitiesList.findMany.mockResolvedValue(mockData);

		const result = await service.getFacilitiesList();

		expect(mockFacilitiesList.findMany).toHaveBeenCalled();

		expect(mockFacilitiesList.findMany).toHaveBeenCalledWith({
			orderBy: { facilitiesOrderId: 'asc' },
			where: { published: true },
			take: 3,
		});

		expect(result[0]).toEqual({
			facilitiesTitle: mockFacilityData.facilitiesTitle,
			facilitiesDescription: mockFacilityData.facilitiesDescription,
			facilitiesImage: mockFacilityData.facilitiesImage,
			facilitiesLink: mockFacilityData.facilitiesLink,
			facilitiesNanoId: mockFacilityData.facilitiesNanoId,
		});
	});
});

describe('查詢單一設施', () => {
	it('回傳正確格式', async () => {
		mockFacilitiesList.findFirst.mockResolvedValue(mockFacilityData);

		const result = await service.getFacilityItem({ id: 'test-nano-id' });

		expect(result).toEqual({
			facilitiesTitle: mockFacilityData.facilitiesTitle,
			facilitiesDescription: mockFacilityData.facilitiesDescription,
			facilitiesImage: mockFacilityData.facilitiesImage,
			facilitiesLink: mockFacilityData.facilitiesLink,
		});
	});

	it('如果是不存在的 id 就回傳 null', async () => {
		mockFacilitiesList.findFirst.mockResolvedValue(null);

		const result = await service.getFacilityItem({ id: 'non-existent-id' });

		expect(result).toBeNull();
	});
});

describe('建立設施', () => {
	it('建立成功應回傳 true', async () => {
		const createData = {
			facilitiesTitle: 'New Facility',
			facilitiesDescription: 'New Description',
			facilitiesImage: 'new-image.jpg',
			facilitiesLink: 'new-link',
		};

		const mockCreatedData = {
			...createData,
			facilitiesNanoId: 'new-nano-id',
			facilitiesOrderId: 2,
			published: true,
		};

		mockFacilitiesList.create.mockResolvedValue(mockCreatedData);

		const result = await service.createFacilityItem({ data: createData });

		expect(result).toBe(true);
		expect(mockFacilitiesList.create).toHaveBeenCalledWith({
			data: { ...createData, published: true },
		});
	});
});

describe('更新設施', () => {
	it('更新成功時回傳 true', async () => {
		const updateData = {
			facilitiesTitle: 'Updated Title',
		};

		mockFacilitiesList.updateMany.mockResolvedValue({ count: 1 });

		const result = await service.updateFacilityItem({
			id: 'test-nano-id',
			data: updateData,
		});

		expect(result).toBe(true);
		expect(mockFacilitiesList.updateMany).toHaveBeenCalledWith({
			where: { facilitiesNanoId: 'test-nano-id' },
			data: updateData,
		});
	});

	it('如果是不存在的 id 就回傳 false', async () => {
		mockFacilitiesList.updateMany.mockResolvedValue({ count: 0 });

		const result = await service.updateFacilityItem({
			id: 'non-existent-id',
			data: { facilitiesTitle: 'Updated Title' },
		});

		expect(result).toBe(false);
	});
});

describe('刪除設施', () => {
	it('刪除成功時回傳 true', async () => {
		mockFacilitiesList.updateMany.mockResolvedValue({ count: 1 });

		const result = await service.deleteFacilityItem({ id: 'test-nano-id' });

		expect(result).toBe(true);
		expect(mockFacilitiesList.updateMany).toHaveBeenCalledWith({
			where: { facilitiesNanoId: 'test-nano-id', published: true },
			data: { published: false },
		});
	});

	it('如果是不存在的 id 就回傳 false', async () => {
		mockFacilitiesList.updateMany.mockResolvedValue({ count: 0 });

		const result = await service.deleteFacilityItem({ id: 'non-existent-id' });

		expect(result).toBe(false);
	});
});
});
