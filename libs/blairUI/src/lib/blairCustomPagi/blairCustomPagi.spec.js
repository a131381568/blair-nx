import { mount } from '@vue/test-utils';
import BlairCustomPagi from './BlairCustomPagi.vue';

describe('blairCustomPagi', () => {
	let wrapper = null;
	const getPagiDom = activePage => wrapper.find(`[data-name="page-button-${activePage}"]`);

	beforeEach(() => {
		wrapper = mount(BlairCustomPagi, {
			// 使用店鋪樣式參數: 總是顯示『上一頁』和『下一頁』按鈕
			props: {
				total: 1,
				pageNum: 1,
				pageSize: 20,
				// ellipsisMode: true,
				alwayShowNexPreBtn: true,
				// borderStyle: false,
			},
		});
	});

	afterEach(() => {
		wrapper = null;
	});

	// --------------------------------------

	describe('total 資料多寡顯示', () => {
		it('多資料 (帶省略符)', async () => {
			const EXPECT_LIST = [
				{ dataName: 'page-button-1', classState: 'bg-main-color-middle' },
				{ dataName: 'page-button-2', classState: 'text-main-color-dark-color-black' },
				{ dataName: 'page-button-3', classState: 'text-main-color-dark-color-black' },
				{ dataName: 'page-button-4', classState: 'text-main-color-dark-color-black' },
				{ dataName: 'page-button-5', classState: 'text-main-color-dark-color-black' },
				{ dataName: 'page-button-6', classState: 'text-main-color-dark-color-black' },
				{ dataName: 'page-button-ellipsis', classState: 'text-main-color-dark-color-black' },
				{ dataName: 'page-button-131', classState: 'text-main-color-dark-color-black' },
				{ dataName: 'page-button-next', classState: 'text-main-color-dark' },
			];
			await wrapper.setProps({
				total: 2618,
				pageNum: 1,
				pageSize: 20,
				limitCount: 7,
				ellipsisMode: true,
				showFirstLastBtn: false,
				alwayShowNexPreBtn: false,
				borderStyle: false,
			});

			wrapper.findAll('li').forEach((item, index) => {
				expect(item.attributes('data-name')).toBe(EXPECT_LIST[index].dataName);
				expect(item.classes()).toContain(EXPECT_LIST[index].classState);
			});
		});

		it('少資料 (僅兩頁)', async () => {
			const EXPECT_LIST = [
				{ dataName: 'page-button-1', classState: 'bg-main-color-middle' },
				{ dataName: 'page-button-2', classState: 'text-main-color-dark-color-black' },
				{ dataName: 'page-button-next', classState: 'text-main-color-dark' },
			];
			await wrapper.setProps({
				total: 21,
				pageNum: 1,
				pageSize: 20,
				limitCount: 7,
				ellipsisMode: true,
				showFirstLastBtn: false,
				alwayShowNexPreBtn: false,
				borderStyle: false,
			});

			wrapper.findAll('li').forEach((item, index) => {
				expect(item.attributes('data-name')).toBe(EXPECT_LIST[index].dataName);
				expect(item.classes()).toContain(EXPECT_LIST[index].classState);
			});
		});

		it('無分頁', async () => {
			await wrapper.setProps({ total: 1 });
			expect(wrapper.find(`[data-name="pagination__list"]`).exists()).toBe(false);
		});
	});

	describe('依據當下 pageNum 來驗證顯示的按鈕與狀態', () => {
		describe('店鋪樣式 (無框線,省略符號)', () => {
			it('第一頁', async () => {
				const EXPECT_LIST = [
					{ dataName: 'page-button-prev', classState: 'cursor-not-allowed' },
					{ dataName: 'page-button-1', classState: 'bg-main-color-middle' },
					{ dataName: 'page-button-2', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-3', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-4', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-5', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-6', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-ellipsis', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-29', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-next', classState: 'text-main-color-dark' },
				];
				await wrapper.setProps({
					total: 568,
					pageNum: 1,
					pageSize: 20,
				});
				// 預期: <,1,2,3,4,5,6,...,29,>
				wrapper.findAll('li').forEach((item, index) => {
					expect(item.attributes('data-name')).toBe(EXPECT_LIST[index].dataName);
					expect(item.classes()).toContain(EXPECT_LIST[index].classState);
				});
			});

			it('第二頁', async () => {
				const EXPECT_LIST = [
					{ dataName: 'page-button-prev', classState: 'text-main-color-dark' },
					{ dataName: 'page-button-1', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-2', classState: 'bg-main-color-middle' },
					{ dataName: 'page-button-3', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-4', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-5', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-6', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-ellipsis', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-29', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-next', classState: 'text-main-color-dark' },
				];
				await wrapper.setProps({
					total: 568,
					pageNum: 2,
					pageSize: 20,
				});
				// 預期: <,1,2,3,4,5,6,...,29,>
				wrapper.findAll('li').forEach((item, index) => {
					expect(item.attributes('data-name')).toBe(EXPECT_LIST[index].dataName);
					expect(item.classes()).toContain(EXPECT_LIST[index].classState);
				});
			});

			it('中間', async () => {
				const EXPECT_LIST = [
					{ dataName: 'page-button-prev', classState: 'text-main-color-dark' },
					{ dataName: 'page-button-1', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-ellipsis', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-16', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-17', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-18', classState: 'bg-main-color-middle' },
					{ dataName: 'page-button-19', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-20', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-ellipsis', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-29', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-next', classState: 'text-main-color-dark' },
				];
				await wrapper.setProps({
					total: 568,
					pageNum: 18,
					pageSize: 20,
				});
				// 預期: <,1,...,16,17,18,19,20,...,29,>
				wrapper.findAll('li').forEach((item, index) => {
					expect(item.attributes('data-name')).toBe(EXPECT_LIST[index].dataName);
					expect(item.classes()).toContain(EXPECT_LIST[index].classState);
				});
			});

			it('倒數第二頁', async () => {
				const EXPECT_LIST = [
					{ dataName: 'page-button-prev', classState: 'text-main-color-dark' },
					{ dataName: 'page-button-1', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-ellipsis', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-24', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-25', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-26', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-27', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-28', classState: 'bg-main-color-middle' },
					{ dataName: 'page-button-29', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-next', classState: 'text-main-color-dark' },
				];
				await wrapper.setProps({
					total: 568,
					pageNum: 28,
					pageSize: 20,
				});
				// 預期: <,1,...,24,25,26,27,28,29,>
				wrapper.findAll('li').forEach((item, index) => {
					expect(item.attributes('data-name')).toBe(EXPECT_LIST[index].dataName);
					expect(item.classes()).toContain(EXPECT_LIST[index].classState);
				});
			});

			it('最後一頁', async () => {
				const EXPECT_LIST = [
					{ dataName: 'page-button-prev', classState: 'text-main-color-dark' },
					{ dataName: 'page-button-1', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-ellipsis', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-24', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-25', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-26', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-27', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-28', classState: 'text-main-color-dark-color-black' },
					{ dataName: 'page-button-29', classState: 'bg-main-color-middle' },
					{ dataName: 'page-button-next', classState: 'cursor-not-allowed' },
				];
				await wrapper.setProps({
					total: 568,
					pageNum: 29,
					pageSize: 20,
				});
				// 預期: <,1,...,24,25,26,27,28,29,>
				wrapper.findAll('li').forEach((item, index) => {
					expect(item.attributes('data-name')).toBe(EXPECT_LIST[index].dataName);
					expect(item.classes()).toContain(EXPECT_LIST[index].classState);
				});
			});
		});

		describe('傳統樣式 (有框線,無省略符號)', () => {
			it('第一頁', async () => {
				const EXPECT_LIST = [
					{ dataName: 'page-button-first', classState: 'text-secondary' },
					{ dataName: 'page-button-prev', classState: 'text-secondary' },
					{ dataName: 'page-button-1', classState: 'bg-main-color-middle-color-middle' },
					{ dataName: 'page-button-2', classState: 'text-main-color-dark-color-middle' },
					{ dataName: 'page-button-3', classState: 'text-main-color-dark-color-middle' },
					{ dataName: 'page-button-4', classState: 'text-main-color-dark-color-middle' },
					{ dataName: 'page-button-5', classState: 'text-main-color-dark-color-middle' },
					{ dataName: 'page-button-6', classState: 'text-main-color-dark-color-middle' },
					{ dataName: 'page-button-7', classState: 'text-main-color-dark-color-middle' },
					{ dataName: 'page-button-next', classState: 'text-main-color-dark-color-middle' },
					{ dataName: 'page-button-last', classState: 'text-main-color-dark-color-middle' },
				];
				await wrapper.setProps({
					total: 568,
					pageNum: 1,
					pageSize: 20,
					ellipsisMode: false,
					showFirstLastBtn: true,
					alwayShowNexPreBtn: true,
					borderStyle: true,
				});
				wrapper.findAll('li').forEach((item, index) => {
					expect(item.classes()).to.include('border-gray-1');
					expect(item.attributes('data-name')).toBe(EXPECT_LIST[index].dataName);
					expect(item.classes()).to.include(EXPECT_LIST[index].classState);
				});
			});

			it('中間', async () => {
				const EXPECT_LIST = [
					{ dataName: 'page-button-first', classState: 'text-main-color-dark-color-middle' },
					{ dataName: 'page-button-prev', classState: 'text-main-color-dark-color-middle' },
					{ dataName: 'page-button-15', classState: 'text-main-color-dark-color-middle' },
					{ dataName: 'page-button-16', classState: 'text-main-color-dark-color-middle' },
					{ dataName: 'page-button-17', classState: 'text-main-color-dark-color-middle' },
					{ dataName: 'page-button-18', classState: 'bg-main-color-middle-color-middle' },
					{ dataName: 'page-button-19', classState: 'text-main-color-dark-color-middle' },
					{ dataName: 'page-button-20', classState: 'text-main-color-dark-color-middle' },
					{ dataName: 'page-button-21', classState: 'text-main-color-dark-color-middle' },
					{ dataName: 'page-button-next', classState: 'text-main-color-dark-color-middle' },
					{ dataName: 'page-button-last', classState: 'text-main-color-dark-color-middle' },
				];
				await wrapper.setProps({
					total: 568,
					pageNum: 18,
					pageSize: 20,
					ellipsisMode: false,
					showFirstLastBtn: true,
					alwayShowNexPreBtn: true,
					borderStyle: true,
				});
				wrapper.findAll('li').forEach((item, index) => {
					expect(item.classes()).to.include('border-gray-1');
					expect(item.attributes('data-name')).toBe(EXPECT_LIST[index].dataName);
					expect(item.classes()).to.include(EXPECT_LIST[index].classState);
				});
			});

			it('最後一頁', async () => {
				const EXPECT_LIST = [
					{ dataName: 'page-button-first', classState: 'text-main-color-dark-color-middle' },
					{ dataName: 'page-button-prev', classState: 'text-main-color-dark-color-middle' },
					{ dataName: 'page-button-23', classState: 'text-main-color-dark-color-middle' },
					{ dataName: 'page-button-24', classState: 'text-main-color-dark-color-middle' },
					{ dataName: 'page-button-25', classState: 'text-main-color-dark-color-middle' },
					{ dataName: 'page-button-26', classState: 'text-main-color-dark-color-middle' },
					{ dataName: 'page-button-27', classState: 'text-main-color-dark-color-middle' },
					{ dataName: 'page-button-28', classState: 'text-main-color-dark-color-middle' },
					{ dataName: 'page-button-29', classState: 'bg-main-color-middle-color-middle' },
					{ dataName: 'page-button-next', classState: 'text-secondary' },
					{ dataName: 'page-button-last', classState: 'text-secondary' },
				];
				await wrapper.setProps({
					total: 568,
					pageNum: 29,
					pageSize: 20,
					ellipsisMode: false,
					showFirstLastBtn: true,
					alwayShowNexPreBtn: true,
					borderStyle: true,
				});
				wrapper.findAll('li').forEach((item, index) => {
					expect(item.classes()).to.include('border-gray-1');
					expect(item.attributes('data-name')).toBe(EXPECT_LIST[index].dataName);
					expect(item.classes()).to.include(EXPECT_LIST[index].classState);
				});
			});
		});
	});

	describe('計算頁碼數正確性', () => {
		it('能夠藉由總數來計算頁碼數', async () => {
			const TOTAL_PAGE_COUNT = 7;
			await wrapper.setProps({
				total: 61,
				pageNum: 1,
				pageSize: 15,
				alwayShowNexPreBtn: true,
			});
			// 驗證總頁碼數: <,1,2,3,4,5,>
			expect(wrapper.findAll('li').length).eq(TOTAL_PAGE_COUNT);

			wrapper.findAll('li').forEach((item, index) => {
				// 除了第一顆跟最後一顆, 剩餘都是頁碼
				if (item.text()) {
					expect(Number(item.text())).toBe(index);
					expect(item.attributes('data-name')).toBe(`page-button-${index}`);
				}
				else {
					expect(item.attributes('data-name')).to.be.oneOf(['page-button-prev', 'page-button-next']);
				}
			});
		});

		it('不管資料多大，預設最多顯示 7 個頁碼 (10 個按鈕)', async () => {
			const TOTAL_PAGE_COUNT = 10;
			await wrapper.setProps({
				total: 9999,
				pageNum: 1,
				pageSize: 15,
				alwayShowNexPreBtn: true,
			});
			const pageTotalCount = wrapper.findAll('li').length;
			const havePageList = wrapper.findAll('li').filter(item => item.text());
			// 驗證總按鈕數: <,1,2,3,4,5,6,...,667,>
			expect(pageTotalCount).eq(TOTAL_PAGE_COUNT);
			// 驗證除了頁碼以外的按鈕*3: 上一頁, 下一頁, 省略符
			expect(wrapper.findAll('li')[0].attributes('data-name')).toBe('page-button-prev');
			expect(wrapper.findAll('li')[TOTAL_PAGE_COUNT - 1].attributes('data-name')).toBe('page-button-next');
			expect(wrapper.findAll('li')[TOTAL_PAGE_COUNT - 3].attributes('data-name')).toBe('page-button-ellipsis');
			// 扣掉3個按鈕的實際頁碼數量
			expect(havePageList.length).eq(TOTAL_PAGE_COUNT - 3);
		});
	});

	describe('點擊後傳遞參數', () => {
		// 因為組件設計是藉由 emit 將點擊過後的數值傳出去
		// 再藉由 props 傳回來, 所以只能用 emitted 檢查傳出去的值, 並用 setProps 手動更新
		beforeEach(async () => {
			await wrapper.setProps({
				total: 568,
				pageNum: 1,
				pageSize: 20,
				alwayShowNexPreBtn: false,
			});
		});

		it('一般頁碼', async () => {
			const ORI_PAGE = 1;
			const ACTIVE_PAGE = 2;
			// 驗證原始狀態
			expect(getPagiDom(ORI_PAGE).classes()).to.include('bg-main-color-middle');
			expect(getPagiDom(ACTIVE_PAGE).classes()).not.to.include('bg-main-color-middle');
			// 點擊後驗證觸發, 並驗證 active 狀態
			await getPagiDom(ACTIVE_PAGE).trigger('click');
			expect(wrapper.emitted('pageChange')).toBeTruthy();
			expect(wrapper.emitted('pageChange')[0]).toEqual([ACTIVE_PAGE]);
			await wrapper.setProps({ pageNum: ACTIVE_PAGE });
			expect(getPagiDom(ACTIVE_PAGE).classes()).to.include('bg-main-color-middle');
		});

		it('上一頁', async () => {
			const PREV_PAGE = 14;
			// 先將頁碼移到中間, 並驗證原始狀態
			await wrapper.setProps({ pageNum: (PREV_PAGE + 1) });
			expect(getPagiDom(PREV_PAGE + 1).classes()).to.include('bg-main-color-middle');
			expect(getPagiDom(PREV_PAGE).classes()).not.to.include('bg-main-color-middle');
			// 點擊後驗證觸發, 並驗證 active 狀態
			await getPagiDom('prev').trigger('click');
			expect(wrapper.emitted('pageChange')).toBeTruthy();
			expect(wrapper.emitted('pageChange')[0]).toEqual([PREV_PAGE]);
			await wrapper.setProps({ pageNum: PREV_PAGE });
			expect(getPagiDom(PREV_PAGE).classes()).to.include('bg-main-color-middle');
		});

		it('下一頁', async () => {
			const NEXT_PAGE = 10;
			// 先將頁碼移到中間, 並驗證原始狀態
			await wrapper.setProps({ pageNum: (NEXT_PAGE - 1) });
			expect(getPagiDom(NEXT_PAGE - 1).classes()).to.include('bg-main-color-middle');
			expect(getPagiDom(NEXT_PAGE).classes()).not.to.include('bg-main-color-middle');
			// 點擊後驗證觸發, 並驗證 active 狀態
			await getPagiDom('next').trigger('click');
			expect(wrapper.emitted('pageChange')).toBeTruthy();
			expect(wrapper.emitted('pageChange')[0]).toEqual([NEXT_PAGE]);
			await wrapper.setProps({ pageNum: NEXT_PAGE });
			expect(getPagiDom(NEXT_PAGE).classes()).to.include('bg-main-color-middle');
		});

		it('省略符(前)', async () => {
			const JUMP_PAGE = 15;
			// 先將頁碼移到中間, 並驗證原始狀態
			await wrapper.setProps({ pageNum: (JUMP_PAGE + 5) });
			expect(getPagiDom(JUMP_PAGE + 5).classes()).to.include('bg-main-color-middle');
			// 點擊後驗證觸發, 並驗證 active 狀態
			await wrapper.findAll(`[data-name="page-button-ellipsis"]`)[0].trigger('click');
			expect(wrapper.emitted('pageChange')).toBeTruthy();
			expect(wrapper.emitted('pageChange')[0]).toEqual([JUMP_PAGE]);
			await wrapper.setProps({ pageNum: JUMP_PAGE });
			expect(getPagiDom(JUMP_PAGE).classes()).to.include('bg-main-color-middle');
		});

		it('省略符(後)', async () => {
			const JUMP_PAGE = 25;
			// 先將頁碼移到中間, 並驗證原始狀態
			await wrapper.setProps({ pageNum: (JUMP_PAGE - 5) });
			expect(getPagiDom(JUMP_PAGE - 5).classes()).to.include('bg-main-color-middle');
			await wrapper.findAll(`[data-name="page-button-ellipsis"]`)[1].trigger('click');
			// 點擊後驗證觸發, 並驗證 active 狀態
			expect(wrapper.emitted('pageChange')).toBeTruthy();
			expect(wrapper.emitted('pageChange')[0]).toEqual([JUMP_PAGE]);
			await wrapper.setProps({ pageNum: JUMP_PAGE });
			expect(getPagiDom(JUMP_PAGE).classes()).to.include('bg-main-color-middle');
		});

		it('返回第一頁', async () => {
			const ORI_PAGE = 6;
			const JUMP_PAGE = 1;
			// 先將頁碼移到中間, 並驗證原始狀態
			await wrapper.setProps({ pageNum: ORI_PAGE, showFirstLastBtn: true });
			expect(getPagiDom(JUMP_PAGE).classes()).not.to.include('bg-main-color-middle');
			expect(getPagiDom(ORI_PAGE).classes()).to.include('bg-main-color-middle');
			await getPagiDom('first').trigger('click');
			// 點擊後驗證觸發, 並驗證 active 狀態
			expect(wrapper.emitted('pageChange')).toBeTruthy();
			expect(wrapper.emitted('pageChange')[0]).toEqual([JUMP_PAGE]);
			await wrapper.setProps({ pageNum: JUMP_PAGE });
			expect(getPagiDom(JUMP_PAGE).classes()).to.include('bg-main-color-middle');
		});

		it('最後一頁', async () => {
			const ORI_PAGE = 6;
			const JUMP_PAGE = 29;
			// 先將頁碼移到中間, 並驗證原始狀態
			await wrapper.setProps({ pageNum: ORI_PAGE, showFirstLastBtn: true });
			expect(getPagiDom(JUMP_PAGE).classes()).not.to.include('bg-main-color-middle');
			expect(getPagiDom(ORI_PAGE).classes()).to.include('bg-main-color-middle');
			await getPagiDom('last').trigger('click');
			// 點擊後驗證觸發, 並驗證 active 狀態
			expect(wrapper.emitted('pageChange')).toBeTruthy();
			expect(wrapper.emitted('pageChange')[0]).toEqual([JUMP_PAGE]);
			await wrapper.setProps({ pageNum: JUMP_PAGE });
			expect(getPagiDom(JUMP_PAGE).classes()).to.include('bg-main-color-middle');
		});
	});
});
