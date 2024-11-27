import IconCalendar from '../../svg/IconCalendar.vue';
import BlairPopover from './BlairPopover.vue';

/**
 * 基底為 @floating-ui/vue<br>
 * 需要的話可以參考 BlairPopover.vue 中 useFloating 參數的設定來擴充 props
 */
export default {
	component: BlairPopover,
	tags: ['autodocs'],
	argTypes: {
		dataGa: {
			control: 'text',
			description: '設定 ga name',
		},
		popperClass: {
			control: 'text',
			description: 'popover 的 class',
		},
		btnContainerClass: {
			control: 'text',
			description: '觸發 popover 按鈕的 class',
		},
	},
};

/**
 * 不使用 button slot，會有預設的問號 icon
 */
export const Base = {
	render: args => ({
		components: { BlairPopover },
		setup() {
			return { args };
		},
		template: `
			<BlairPopover>
				<p class="text-sm xl:text-xl smp:text-base">
					因介面尺寸不同，兩種方式都須分別上傳<span class="font-bold text-main">網頁版</span>及<span
						class="font-bold text-main"
					>手機版</span>形象圖。
				</p>
			</BlairPopover>
		`,
	}),
	decorators: [() => ({ template: '<div style="height: 100px;"><story /></div>' })],
};

/**
 * 客製化 button，透過 button slot 傳入不同的 button 樣式
 */
export const CustomTriggerButton = {
	render: args => ({
		components: { BlairPopover, IconCalendar },
		setup() {
			return { args };
		},
		template: `
			<BlairPopover>
				<template #button>
					<IconCalendar />
				</template>
				<p class="mt-2 text-sm xl:text-xl smp:text-base">
					設定好<span class="font-bold text-main">簽名檔</span>，即可在分享時<span
						class="font-bold text-main"
					>自動帶入</span>，省去重複作業的流程~
				</p>
			</BlairPopover>
		`,
	}),
	decorators: [() => ({ template: '<div style="height: 100px;"><story /></div>' })],
};
