import {
	MOCK_BASIC_TABLE_DATA,
	MOCK_BASIC_TABLE_HEADER,
	MOCK_CUSTOM_TD_TABLE_DATA,
	MOCK_CUSTOM_TD_TABLE_HEADER,
	MOCK_FIXED_COL_TABLE_DATA,
	MOCK_FIXED_COL_TABLE_HEADER,
	MOCK_SORTABLE_TABLE_DATA,
	MOCK_SORTABLE_TABLE_HEADER,
} from '@storybook-src/constants/blairTable/mockBasicTableData.js';
import BlairTable from './BlairTable.vue';

/**
 * BlairTable 僅單純呈現 UI，操作時會回傳相對應的 key，再由開發者整理 key 組成對應的 payload，請求後端 API，由後端組資料來達成查詢功能
 */
export default {
	component: BlairTable,
	tags: ['autodocs'],
	argTypes: {
		headerData: {
			control: 'array',
			description: '第一列表頭資料來源，陣列中的物件 field, label 為必填',
			table: {
				type: {
					summary: `Array<{ 
            field: string,
            label: string,
            width: string,
            fixed: boolean,
            sortable: boolean,
          }>
          field 欄位 ID、label 欄位名稱、width 欄位寬度 預設值 = 'auto'｜fixed 是否固定 預設值 = false｜sortable 是否可排序 預設值 = false
          `,
				},
			},
		},
		tableData: {
			control: 'array',
			description: '內容資料來源',
		},
		totalCount: {
			control: 'number',
			description: '資料總數量',
		},
		pagiMode: {
			control: 'select',
			options: ['classic', 'modern', 'none'],
			description: '分頁模式',
		},
		pageCount: {
			control: 'number',
			description: '一頁顯示數量',
		},
		fieldfixedDirection: {
			control: 'select',
			options: ['left', 'right'],
			description: 'headerData 內設置了fixed:true，該欄位固定至左側或至右側',
		},
		fixedHeader: {
			control: 'boolean',
			description: '第一列表頭資料固定至上方',
		},
		tableHeight: {
			control: 'text',
			description: '表格最外層固定高度，須包含字串px',
		},
	},
};

export const Base = {
	render: args => ({
		components: { BlairTable },
		setup() {
			return { args };
		},
		template: '<BlairTable v-bind=\'args\' />',
	}),
	args: {
		headerData: MOCK_BASIC_TABLE_HEADER,
		tableData: MOCK_BASIC_TABLE_DATA,
		pagiMode: 'classic',
		currentPagi: 1,
		totalCount: 30,
	},
};

/**
 * 支援 slot 來自定義列顯示，作用域參數分別是該欄的：
 * - rowIndex：順序
 * - content：值
 * - tdData：所有相關資料
 */
export const CustomTd = {
	render: args => ({
		components: { BlairTable },
		setup() {
			return { args };
		},
		template: `
	<BlairTable v-bind="args">
		<template #cell(country)="{ rowIndex, content, tdData }">
			<ul>
				<li>順序: {{ rowIndex }}</li>
				<li>值: {{ content }}</li>
			</ul>
			<h6>其他: {{ tdData.name }} / {{ tdData.phone }} / {{ tdData.country }}</h6>
			<span>額外查詢: {{  args['tableData'][rowIndex]['email'] }}</span>
		</template>
	</BlairTable>
`,
	}),
	args: {
		headerData: MOCK_CUSTOM_TD_TABLE_HEADER,
		tableData: MOCK_CUSTOM_TD_TABLE_DATA,
		totalCount: 5,
		pagiMode: 'classic',
		pageCount: 2,
		currentPagi: 1,
	},
};

/**
 * 固定列（切換成手機版或把視窗尺寸縮小，在 Table 元素上往左滑看效果）
 */
export const FixedCol = {
	render: args => ({
		components: { BlairTable },
		setup() {
			return { args };
		},
		template: `
      <BlairTable v-bind="args" />`,
	}),
	args: {
		headerData: MOCK_FIXED_COL_TABLE_HEADER,
		tableData: MOCK_FIXED_COL_TABLE_DATA,
		totalCount: 5,
		pagiMode: 'classic',
		pageCount: 2,
		fieldfixedDirection: 'left',
		currentPagi: 1,
	},
};

/**
 * 排序
 * - TODO：在 tailwind 中，svg 預設是 display: block，造成排序 icon 在 storybook 跑版。而在店鋪有用到 css reset，所以不會跑版
 */
export const Sort = {
	render: args => ({
		components: { BlairTable },
		setup() {
			return { args };
		},
		template: `
      <BlairTable v-bind="args" />
    `,
	}),
	args: {
		headerData: MOCK_SORTABLE_TABLE_HEADER,
		tableData: MOCK_SORTABLE_TABLE_DATA,
		totalCount: 6,
		pagiMode: 'classic',
		pageCount: 2,
		currentPagi: 1,
	},
};
