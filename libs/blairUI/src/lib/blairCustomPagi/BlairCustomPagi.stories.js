import BlairCustomPagi from './BlairCustomPagi.vue';

export default {
	component: BlairCustomPagi,
	tags: ['autodocs'],
	argTypes: {
		total: {
			control: 'number',
			description: '資料總筆數',
		},
		pageNum: {
			control: 'number',
			description: '當下頁碼',
		},
		pageSize: {
			control: 'select',
			options: [15, 20, 50, 100, 200, 300],
			// control: "number",
			description: '每頁顯示資料筆數',
		},
		limitCount: {
			control: 'number',
			description: '最多顯示的頁碼數量，需大於等於5且小於等於21的奇數',
		},
		ellipsisMode: {
			control: 'boolean',
			description: '開啟頁碼省略樣式',
		},
		showFirstLastBtn: {
			control: 'boolean',
			description: '顯示『第一頁』和『最後一頁』的按鈕',
		},
		alwayShowNexPreBtn: {
			control: 'boolean',
			description: '總是顯示『上一頁』和『下一頁』按鈕',
		},
		borderStyle: {
			control: 'boolean',
			description: '按鈕是否為框線樣式',
		},
	},
};

const renderDefaultComponent = args => ({
	components: { BlairCustomPagi },
	setup() {
		const currentPage = ref(1);
		const updateModel = num => currentPage.value = num;
		return { args, currentPage, updateModel };
	},
	template: '<BlairCustomPagi v-bind=\'args\' :pageNum=\'currentPage\' @pageChange=\'updateModel\' />',
});

/**
 * 以下為只填必填欄位的預設範例
 */
export const Default = {
	render: renderDefaultComponent,
	args: {
		total: 568,
		pageNum: 1,
		pageSize: 20,
	},
};

/**
 * - 按預設差別在於 alwayShowNexPreBtn 設置為`true`
 */
export const Shop = {
	render: renderDefaultComponent,
	args: {
		total: 568,
		pageNum: 1,
		pageSize: 20,
		alwayShowNexPreBtn: true,
	},
};

/**
 * - 和預設最大的差異是有框線
 * - 還有『第一頁』跟『最後一頁』的按鈕
 * - 不管資料多大，最多顯示七個頁碼
 * - 不會有省略符號
 */
export const Classic = {
	render: renderDefaultComponent,
	args: {
		total: 834,
		pageNum: 1,
		pageSize: 20,
		ellipsisMode: false,
		showFirstLastBtn: true,
		alwayShowNexPreBtn: true,
		borderStyle: true,
	},
};
