import { Test } from '@nestjs/testing';
import { createFacilityItemSchema, getFacilitiesListBaseSchema, updateFacilityItemSchema } from '@cts-shared/schemas/facilities.schemas';
import { PrismaModule } from '../shared/prisma.module';
import { FacilitiesService } from './facilities.service';

describe('天文機構驗證', () => {
	let service: FacilitiesService;

	beforeAll(async () => {
		const app = await Test.createTestingModule({
			providers: [FacilitiesService],
			imports: [PrismaModule],
		}).compile();

		service = app.get<FacilitiesService>(FacilitiesService);
	});

	describe('get:取得機構資料', () => {
		it('不帶參數取得列表 (預設3筆)', async () => {
			const { data } = await service.getFacilitiesList();
			const { success } = getFacilitiesListBaseSchema.safeParse(data);
			expect(success).toBe(true);
			expect(data.length).toBe(3);
		});
	});

	describe('get:取得單筆機構資料', () => {
		it('正常取得指定 id 資料', async () => {
			const { data } = await service.getFacilityItem('0ApUBqhDRT');
			const { success } = createFacilityItemSchema.safeParse(data);
			expect(success).toBe(true);
		});

		// describe('路由帶文字參數(repeat)', () => {
		// 	it('aaa', async () => {
		// 		// @ts-expect-error -----
		// 		const { success, message } = await service.getFacilityItem('aaa');
		// 		expect(success).toBe(false);
		// 		expect(message).toContain('Validation error');
		// 	});

		// 	it('00000', async () => {
		// 		// @ts-expect-error -----
		// 		const { success, message } = await service.getFacilityItem('00000');
		// 		expect(success).toBe(false);
		// 		expect(message).toContain('Validation error');
		// 	});
		// });

		// describe('路由帶數字參數(repeat)', () => {
		// 	it('數值&字串:123456', async () => {
		// 		['123456', 123456].forEach(async (id) => {
		// 			// @ts-expect-error -----
		// 			const { success, message } = await service.getFacilityItem(id);
		// 			expect(success).toBe(false);
		// 			expect(message).toContain('Validation error');
		// 		});
		// 	});

		// 	it('數值&字串:1234', async () => {
		// 		['1234', 1234].forEach(async (id) => {
		// 			// @ts-expect-error -----
		// 			const { success, message } = await service.getFacilityItem(id);
		// 			expect(success).toBe(false);
		// 			expect(message).toContain('FacilityId not found');
		// 		});
		// 	});
		// });
	});

	describe('put:更新資料', () => {
		const INPUT_VAL = 'aaa台北市立天文科學教育館';
		const UPDATE_NID = 'sG7_EBNryv';
		it('正常更新指定 id:1 的單筆資料 facilitiesTitle', async () => {
			const { data } = await service.updateFacilityItem(UPDATE_NID, {
				facilitiesTitle: INPUT_VAL,
			});
			const { success } = updateFacilityItemSchema.safeParse(data);
			const { data: { facilitiesTitle } } = await service.getFacilityItem(UPDATE_NID);
			expect(success).toBe(true);
			expect(facilitiesTitle).toBe(INPUT_VAL);
		});

		// describe('路由帶文字參數(repeat)', () => {
		// 	it('aaa', async () => {
		// 		// @ts-expect-error -----
		// 		const { success, message } = await service.updateFacilityItem('aaa', {
		// 			facilitiesTitle: INPUT_VAL,
		// 		});
		// 		expect(success).toBe(false);
		// 		expect(message).toContain('Validation error');
		// 	});

		// 	it('00000', async () => {
		// 		// @ts-expect-error -----
		// 		const { success, message } = await service.updateFacilityItem('00000', {
		// 			facilitiesTitle: INPUT_VAL,
		// 		});
		// 		expect(success).toBe(false);
		// 		expect(message).toContain('Validation error');
		// 	});
		// });

		// describe('路由帶數字參數(repeat)', () => {
		// 	it('數值&字串:123456', async () => {
		// 		['123456', 123456].forEach(async (id) => {
		// 			// @ts-expect-error -----
		// 			const { success, message } = await service.updateFacilityItem(id, {
		// 				facilitiesTitle: INPUT_VAL,
		// 			});
		// 			expect(success).toBe(false);
		// 			expect(message).toContain('Validation error');
		// 		});
		// 	});

		// 	it('數值&字串:1234', async () => {
		// 		['1234', 1234].forEach(async (id) => {
		// 			// @ts-expect-error -----
		// 			const { success, message } = await service.updateFacilityItem(id, {
		// 				facilitiesTitle: INPUT_VAL,
		// 			});
		// 			expect(success).toBe(false);
		// 			expect(message).toContain('FacilityId not found');
		// 		});
		// 	});
		// });

		describe('body 帶值', () => {
			it('不存在的 key:aaa', async () => {
				const { success, message } = await service.updateFacilityItem(UPDATE_NID, {
					// @ts-expect-error -----
					aaa: INPUT_VAL,
				});
				expect(success).toBe(false);
				expect(message).toContain('Validation error');
			});

			it('不符合規定的值 111', async () => {
				const { success, message } = await service.updateFacilityItem(UPDATE_NID, {
					// @ts-expect-error -----
					facilitiesTitle: 111,
				});
				expect(success).toBe(false);
				expect(message).toContain('Validation error');
			});
		});
	});

	describe('post:新增資料', () => {
		// const INPUT_VAL = {
		// 	facilitiesTitle: 'a',
		// 	facilitiesDescription: 'b',
		// 	facilitiesImage: 'c',
		// 	facilitiesLink: 'd',
		// };

		// 待考慮要不要回傳 facilitiesNanoId
		// it('正常新增資料', async () => {
		// 	const { data } = await service.createFacilityItem(INPUT_VAL);
		// 	const { success: zodSuccess, data: zodData } = createFacilityItemFinishSchema.safeParse(data);
		// 	expect(zodSuccess).toBe(true);

		// 	if (zodSuccess) {
		// 		expect(zodData.facilitiesNanoId).toBeGreaterThan(1);
		// 		const { success: newItemSuccess, data: newItemData } = await service.getFacilityItem(zodData.facilitiesNanoId);
		// 		expect(newItemSuccess).toBe(true);
		// 		expect(newItemData).toEqual(INPUT_VAL);
		// 	}
		// });

		it('不存在的 key:aaa', async () => {
			const { success, message } = await service.createFacilityItem({
				// @ts-expect-error -----
				aaa: 'a',
			});
			expect(success).toBe(false);
			expect(message).toContain('Validation error');
		});

		it('不符合規定的值 111', async () => {
			const { success, message } = await service.createFacilityItem({
				// @ts-expect-error -----
				facilitiesTitle: 111,
			});
			expect(success).toBe(false);
			expect(message).toContain('Validation error');
		});
	});

	describe('delete:刪除資料', () => {
		const UPDATE_NID = 'sG7_EBNryv';
		it('正常刪除指定 id 的單筆資料', async () => {
			const { data: id } = await service.deleteFacilityItem(UPDATE_NID);
			expect(id).toEqual({ id: UPDATE_NID });

			const { success, message } = await service.getFacilityItem(UPDATE_NID);
			expect(success).toBe(false);
			expect(message).toContain('FacilityId not found');
		});

		// describe('路由帶文字參數(repeat)', () => {
		// 	it('aaa', async () => {
		// 		// @ts-expect-error -----
		// 		const { success, message } = await service.deleteFacilityItem('aaa');
		// 		expect(success).toBe(false);
		// 		expect(message).toContain('Validation error');
		// 	});

		// 	it('00000', async () => {
		// 		// @ts-expect-error -----
		// 		const { success, message } = await service.deleteFacilityItem('00000');
		// 		expect(success).toBe(false);
		// 		expect(message).toContain('Validation error');
		// 	});
		// });

		// describe('路由帶數字參數(repeat)', () => {
		// 	it('數值&字串:123456', async () => {
		// 		['123456', 123456].forEach(async (id) => {
		// 			// @ts-expect-error -----
		// 			const { success, message } = await service.deleteFacilityItem(id);
		// 			expect(success).toBe(false);
		// 			expect(message).toContain('Validation error');
		// 		});
		// 	});

		// 	it('數值&字串:1234', async () => {
		// 		['1234', 1234].forEach(async (id) => {
		// 			// @ts-expect-error -----
		// 			const { success, message } = await service.deleteFacilityItem(id);
		// 			expect(success).toBe(false);
		// 			expect(message).toContain('FacilityId not found');
		// 		});
		// 	});
		// });
	});

	describe('恢復原狀', () => {
		it('標題', async () => {
			const ORI_DATA = [
				{ title: '台北市天文科學教育館', nid: '0ApUBqhDRT' },
				{ title: '南瀛天文教育館', nid: 'sG7_EBNryv' },
				{ title: '國立臺中自然科學博物館', nid: 'ObtwZeLhTq' },
			];
			ORI_DATA.forEach(async ({ title, nid }) => {
				const { success } = await service.updateFacilityItem(nid, {
					facilitiesTitle: title,
				});
				expect(success).toBe(true);
			});
		});
	});
});
