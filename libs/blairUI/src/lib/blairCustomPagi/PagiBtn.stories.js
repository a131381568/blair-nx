import PagiBtn from './PagiBtn.vue';

/**
 * - borderStyle 的設置框線樣式，必須要在完整的分頁組件下才有效
 */
export default {
	component: PagiBtn,
	tags: ['autodocs'],
	argTypes: {
		disabled: {
			control: 'boolean',
			description: '其實這是 active，但狀態為凍結',
		},
		text: {
			control: 'number',
			description: '按鈕顯示文字',
		},
		type: {
			control: 'select',
			options: ['', 'first', 'prev', 'next', 'last', 'ellipsis'],
			description: '按鈕類型',
		},
		borderStyle: {
			control: 'boolean',
			description: '是否為框線樣式',
		},
	},
};

const renderDefaultComponent = args => ({
	components: { PagiBtn },
	setup() {
		return { args };
	},
	template: '<PagiBtn v-bind=\'args\' />',
});

/**
 * 只塞頁碼數字
 */
export const Default = {
	render: renderDefaultComponent,
	args: {
		text: 1,
	},
};

/**
 * 頁碼點擊過後
 */
export const Active = {
	render: renderDefaultComponent,
	args: {
		disabled: true,
		text: 2,
	},
};

/**
 * 返回第一頁按鈕
 */
export const First = {
	render: renderDefaultComponent,
	args: {
		type: 'first',
	},
};

/**
 * 上一頁按鈕
 */
export const Prev = {
	render: renderDefaultComponent,
	args: {
		type: 'prev',
	},
};

/**
 * 下一頁按鈕
 */
export const Next = {
	render: renderDefaultComponent,
	args: {
		type: 'next',
	},
};

/**
 * 最後一頁按鈕
 */
export const Last = {
	render: renderDefaultComponent,
	args: {
		type: 'last',
	},
};

/**
 * 省略按鈕
 * - 在完整的分頁組件中，點擊後的效果是到下 10 頁或上 10 頁
 */
export const Ellipsis = {
	render: renderDefaultComponent,
	args: {
		type: 'ellipsis',
	},
};
