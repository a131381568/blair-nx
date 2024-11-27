import { mount } from '@vue/test-utils';
import BigfunTable from './BigfunTable.vue';

const MOCK_HEADER_DATA = [
	{ field: 'community_name', label: '社區名稱', fixed: false, sortable: false, width: '20%', minWidth: '15rem' },
	{ field: 'district', label: '區域', fixed: false, sortable: false, width: '10%', minWidth: '6.375rem' },
	{ field: 'age', label: '屋齡', fixed: false, sortable: false, width: '10%', minWidth: '6.375rem' },
	{ field: 'household', label: '戶數', fixed: false, sortable: false, width: '8%', minWidth: '6.375rem' },
	{ field: 'floor', label: '總樓層', fixed: false, sortable: false, width: '10%', minWidth: '6.375rem' },
	{ field: 'public_ratio', label: '公設比', fixed: false, sortable: false, width: '10%', minWidth: '6.375rem' },
	{ field: 'building_type', label: '型態', fixed: false, sortable: false, width: '10%', minWidth: '6.375rem' },
	{ field: 'price', label: '近一年成交價', fixed: false, sortable: false, width: '14%', minWidth: '7.875rem' },
	{ field: 'sale_count', label: '待售中', fixed: false, sortable: false, width: '8%', minWidth: '6.375rem' },
];
const MOCK_TABLE_DATA = [
	{ age: '4', sale_count: '0', id: 'L8091014111bc63', community_name: '彩葉山漆莖', district: '文山區', household: '36戶', floor: '7F~15F', public_ratio: '0.00%', building_type: '大樓', price: '99.99萬', community_state: 'new' },
	{ age: '25', sale_count: '1', id: 'L72d347582161', community_name: '仁愛新城己區', district: '中正區', household: '132戶', floor: '10F~16F', public_ratio: '0.00%', building_type: '大樓', price: '99.98萬', community_state: '' },
	{ age: '47', sale_count: '0', id: 'L96a387c9d5f', community_name: '香苑大廈', district: '大安區', household: '96戶', floor: '12F', public_ratio: '0.00%', building_type: '大樓', price: '99.98萬', community_state: '' },
	{ age: '35', sale_count: '0', id: 'L4e62142b05bf', community_name: '師大名園', district: '大安區', household: '22戶', floor: '12F', public_ratio: '0.00%', building_type: '大樓', price: '99.96萬', community_state: '' },
	{ age: '21', sale_count: '0', id: 'L5c144287f453', community_name: '將捷金鑽捷運大樓/U-PARTY', district: '文山區', household: '40戶', floor: '10F', public_ratio: '0.00%', building_type: '大樓', price: '99.66萬', community_state: '' },
	{ age: '45', sale_count: '1', id: 'L058801960654b', community_name: '健康華廈', district: '大安區', household: '77戶', floor: '7F', public_ratio: '14.80%-15.20%', building_type: '大樓', price: '99.65萬', community_state: '' },
	{ age: '8', sale_count: '99', id: 'L0e499350d2108', community_name: '敦年博愛凱旋', district: '中正區', household: '54戶', floor: '15F', public_ratio: '0.00%', building_type: '大樓', price: '99.62萬', community_state: '' },
	{ age: '34', sale_count: '3', id: 'Le3b51029b75dd', community_name: '松福大樓', district: '中正區', household: '16戶', floor: '12F', public_ratio: '0.00%', building_type: '大樓', price: '99.58萬', community_state: '' },
	{ age: '38', sale_count: '0', id: 'L8c4582241acf6', community_name: '金品大樓', district: '松山區', household: '49戶', floor: '12F', public_ratio: '0.00%', building_type: '商辦', price: '99.55萬', community_state: '' },
	{ age: '35', sale_count: '0', id: 'L7b62240203a5', community_name: '敦化林園', district: '松山區', household: '71戶', floor: '17F', public_ratio: '10.30%-11.40%', building_type: '大樓', price: '99.54萬', community_state: '' },
	{ age: '7', sale_count: '77', id: 'L2ee101469c5a0d', community_name: '威堡今綻', district: '中山區', household: '39戶', floor: '12F', public_ratio: '0.00%', building_type: '大樓', price: '99.5萬', community_state: '' },
	{ age: '29', sale_count: '9', id: 'L3e027631fbe8', community_name: '凱廈社區大樓', district: '信義區', household: '297戶', floor: '23F', public_ratio: '0.00%', building_type: '大樓', price: '99.5萬', community_state: '' },
	{ age: '5', sale_count: '99', id: 'Lba595939170a', community_name: '巨流河/翠堤灣', district: '中正區', household: '27戶', floor: '15F', public_ratio: '35.00%-36.00%', building_type: '大樓', price: '99.49萬', community_state: 'new' },
	{ age: '10', sale_count: '49', id: 'Lf459383703a19', community_name: '威尼斯商人', district: '信義區', household: '37戶', floor: '9F', public_ratio: '0.00%', building_type: '大樓', price: '99.48萬', community_state: '' },
	{ age: '11', sale_count: '3', id: 'Le6387838cc845', community_name: '正隆晶鑽', district: '南港區', household: '71戶', floor: '11F', public_ratio: '0.00%', building_type: '大樓', price: '99.45萬', community_state: '' },
	{ age: '30', sale_count: '2', id: 'Lfd82655dc766', community_name: '典藏大直', district: '中山區', household: '101戶', floor: '13F', public_ratio: '0.00%', building_type: '大樓', price: '99.38萬', community_state: '' },
	{ age: '7', sale_count: '3', id: 'L90410144593a3b', community_name: '興富發雙美館/双美舘', district: '南港區', household: '130戶', floor: '22F~24F', public_ratio: '32.00%-33.00%', building_type: '大樓', price: '99.34萬', community_state: '' },
	{ age: '18', sale_count: '36', id: 'Le6a48646d0a1', community_name: '歐夏蕾', district: '中山區', household: '242戶', floor: '14F', public_ratio: '0.00%', building_type: '大樓', price: '99.3萬', community_state: '' },
	{ age: '-1', sale_count: '0', id: 'L2961367993c90d', community_name: '南海1號苑', district: '中正區', household: '12戶', floor: '7F', public_ratio: '0.00%', building_type: '大樓', price: '99.2萬', community_state: 'pre' },
	{ age: '18', sale_count: '30', id: 'L839498316997', community_name: '花漾社區', district: '萬華區', household: '223戶', floor: '11F', public_ratio: '0.00%', building_type: '大樓', price: '99.19萬', community_state: '' },
];

const MOCK_PROPS_DATA = {
	headerData: MOCK_HEADER_DATA,
	tableData: MOCK_TABLE_DATA,
	totalCount: 10392,
	pagiMode: 'classic',
	pageCount: 20,
	customThClass: ['h-[2.5rem]', 'text-content-1', 'text-center', 'border-b-2', 'h-[2.5rem]'],
	customTdClass: ['h-[3.25rem]'],
	customTrClass: ['[&>td]:odd:bg-gray-4'],
	currentPagi: 1,
};

const MOCK_SLOT_DATA = `
	<div data-name="communityNameSlot">
		<span data-name="rowIndexVal">{{rowIndex}}</span>
		<span data-name="contentVal">{{content}}</span>
		<span data-name="tdDataVal">{{tdData}}</span>
	</div>
`;

describe('bigfunTable', () => {
	let wrapper = null;

	beforeEach(() => {
		wrapper = mount(BigfunTable, {
			props: MOCK_PROPS_DATA,
		});
	});

	afterEach(() => {
		wrapper = null;
	});

	// ------------------------------------------------------

	describe('藉由 header 結構生出相對應的 table', () => {
		it('比對 header 欄位', async () => {
			wrapper.findAll('thead th').forEach((item, index) => {
				expect(item.text()).toBe(MOCK_HEADER_DATA[index].label);
			});
		});

		it('table 資料能夠對齊 header col', async () => {
			const firstCommunityTr = wrapper.findAll('tbody tr')[1];
			firstCommunityTr.findAll('td span').forEach((item, index) => {
				const fieldName = MOCK_HEADER_DATA[index].field;
				// 查詢到該欄位的 key 後去找對應的資料是對齊的
				expect(item.text()).toBe(MOCK_TABLE_DATA[1][fieldName]);
			});
		});
	});

	it('支援 slot 來自定義列顯示', async () => {
		// 作用域參數分別是該欄的：
		// 1. rowIndex：順序
		// 2. content：值
		// 3. tdData：所有相關資料
		wrapper = mount(BigfunTable, {
			props: MOCK_PROPS_DATA,
			slots: { 'cell(community_name)': MOCK_SLOT_DATA },
		});
		const EXPECT_DATA_ORDER = 12;
		const firstCommunityTr = wrapper.findAll('tbody tr')[EXPECT_DATA_ORDER];
		const customSlotDom = firstCommunityTr.find(`[data-name="communityNameSlot"]`);
		// 驗證客製化欄位印出來的 rowIndex, content, tdData; 是否和資料符合
		expect(customSlotDom.find(`[data-name="rowIndexVal"]`).text()).toBe(String(EXPECT_DATA_ORDER));
		expect(customSlotDom.find(`[data-name="contentVal"]`).text()).toBe(MOCK_TABLE_DATA[EXPECT_DATA_ORDER].community_name);
		// 因為完整資料會多兩個 key(id,community_state); 所以斷言比對用部分符合: toMatchObject
		expect(MOCK_TABLE_DATA[EXPECT_DATA_ORDER]).toMatchObject(JSON.parse(customSlotDom.find(`[data-name="tdDataVal"]`).text()));
	});

	describe('能夠正確切換分頁模組', () => {
		it('分頁模組: classic', async () => {
			await wrapper.setProps({ pagiMode: 'classic' });
			const paginationDom = wrapper.find(`[data-name="bigfun__pagination__list"]`);
			expect(paginationDom.exists()).toBe(true);
		});

		it('分頁模組: modern', async () => {
			const EXPECT_BTN_COUNT = 2;
			const EXPECT_INFO = '1-20筆(共10392筆)';
			await wrapper.setProps({ pagiMode: 'modern' });
			const classicPagiDom = wrapper.find(`[data-name="bigfun__pagination__list"]`);
			const haveBtnLen = wrapper.findAll('button').length;
			const pageInfoDom = wrapper.find('.commonTable__pagination__info');
			// 驗證 modern 樣式: 兩顆左右按鈕, 右下角的字串
			expect(classicPagiDom.exists()).not.toBe(true);
			expect(haveBtnLen).toBe(EXPECT_BTN_COUNT);
			expect(pageInfoDom.text()).toBe(EXPECT_INFO);
		});
	});

	it('無資料時能夠顯示對應文字模組', async () => {
		const EXPECT_EMPTY_TEXT = '無相關資訊';
		await wrapper.setProps({ tableData: [], emptyText: EXPECT_EMPTY_TEXT });
		const tbodyDom = wrapper.find('tbody');
		expect(tbodyDom.exists()).not.toBe(true);
		expect(wrapper.text()).toContain(EXPECT_EMPTY_TEXT);
	});

	it('第一列表頭資料固定至上方', async () => {
		wrapper = mount(BigfunTable, {
			props: { ...MOCK_PROPS_DATA, fixedHeader: true },
		});
		await nextTick();
		// overflow 必須要變成預設值 sticky 才會生效
		expect(wrapper.find('.table-scrollbar').classes()).toContain('overflow-visible');
		expect(wrapper.find('table').classes()).toContain('fixed__header');
		// fixed__header 會去把 th 都加上 sticky
	});

	it.skip('欄位固定至左側或至右側', async () => {
		// 這個在單元測試沒辦法:觸發複數與子組件有關聯的 watcher 跟 nextTick, 只能去 e2e 測
		// const DATA_INFO = MOCK_HEADER_DATA.map(({ field, otherInfo }) => ({
		// 	...otherInfo,
		// 	fixed: field === "community_name",
		// }));
		// await wrapper.setProps(Object.assign({}, MOCK_PROPS_DATA, { headerData: DATA_INFO }));
	});

	it.skip('開啟排序功能時預期', async () => {
		// 一樣的理由沒辦法測
		// 連續點擊會依據順序顯示: 降冪 -> 升冪 -> 取消
		// https://staging.ibigfun.com/pages/house/0938168671/244ee64b-3da1-11ef-9564-0a84bab091bd
	});
});
