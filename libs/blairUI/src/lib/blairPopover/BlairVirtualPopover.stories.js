import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import BlairVirtualPopover from './BlairVirtualPopover.vue';

const placementOptions = ['top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end'];

/**
 * 基底為 @floating-ui/vue<br>
 * <br>
 * 適用情境：當需要在多個地方觸發同一個 Popover，可以使用 BlairVirtualPopover 來取代 BlairVirtualPopover，效能會比建立多個 BlairVirtualPopover 來得好<br>
 * 因為只會建立一個 Popover，並且透過 currentRef 來決定 Popover 的位置
 * <br>
 * <br>
 * Popover 開啟的位置有時候不會按照 placement 的設定，這是因為 @floating-ui/vue 會自動調整位置，以避免 popover 超出畫面
 * <br>
 */

export default {
	component: BlairVirtualPopover,
	tags: ['autodocs'],
	argTypes: {
		popperClass: {
			control: 'text',
			description: 'popover 的 class',
		},
		visible: {
			control: 'boolean',
			description: '是否顯示 popover',
		},
		arrowVisible: {
			control: 'boolean',
			description: '是否顯示箭頭',
		},
		placement: {
			control: 'select',
			options: placementOptions,
			description: 'popover 的位置',
		},
		currentRef: {
			control: 'object',
			description: '觸發 popover 的元素',
		},
	},
};

const renderDefaultComponent = args => ({
	components: { BlairVirtualPopover },
	setup() {
		const openPopover = () => {
			args.visible = true;
		};

		const triggerRef = ref(null);
		const componentRef = ref(null);

		onClickOutside(componentRef, () => {
			args.visible = false;
		});

		return { args, openPopover, triggerRef, componentRef };
	},
	template: `
		<button
			ref="triggerRef"
			@click.stop="openPopover"
			class="p-2 shadow bg-main-color-middle text-white rounded"
		>popover trigger</button>
		<BlairVirtualPopover
			v-bind="args"
			ref="componentRef"
			:current-ref="triggerRef"
		>
			<div
				class="flex w-[9.375rem] flex-wrap items-center gap-y-2 px-0 py-4 xl:w-35"
			>
				<div
					class="flex h-8 w-full cursor-pointer items-center gap-x-2 pl-4"
				>
					<p
						class="text-base font-medium text-content-2"
					>
						編輯物件
					</p>
				</div>
				<div
					class="flex h-8 w-full cursor-pointer items-center gap-x-2 pl-4"
				>
					<p
						class="text-base font-medium text-content-2"
					>
						物件資訊
					</p>
				</div>
			</div>
		</BlairVirtualPopover>
	`,
});

/**
 * 到 Base 的 storybook 中測試，因為 placement 還沒有支援動態更新，所以切換 placement 後要重整頁面才會看到正確的結果
 */
export const Base = {
	render: renderDefaultComponent,
	decorators: [() => ({ template: `<div style=\"display: flex; justify-content: center; align-items: center; margin-top: 70px; height: 120px;\"><story /></div>` })],
	args: {
		visible: true,
	},
};

export const NoArrow = {
	render: renderDefaultComponent,
	decorators: [() => ({ template: `<div style=\"display: flex; justify-content: center; align-items: center; margin-top: 70px; height: 120px;\"><story /></div>` })],
	args: {
		arrowVisible: false,
		visible: true,
	},
};

export const AllPlacement = {
	render: args => ({
		components: { BlairVirtualPopover },
		setup() {
			const openPopover = () => {
				args.visible = true;
			};

			const triggerRef = ref(null);
			const componentRef = ref(null);

			onClickOutside(componentRef, () => {
				args.visible = true;
			});

			return { args, openPopover, triggerRef, componentRef, placementOptions };
		},
		template: `
			<button
				ref="triggerRef"
				class="w-[360px] h-[260px] shadow bg-main-color-middle text-white rounded"
			>popover trigger</button>
			<BlairVirtualPopover
				v-for="placement in placementOptions"
				:key="placement"
				v-bind="{...args, placement}"
				ref="componentRef"
				:current-ref="triggerRef"
			>
				<div class="px-4 py-3">{{ placement }}</div>
			</BlairVirtualPopover>
		`,
	}),
	args: {
		arrowVisible: true,
		visible: true,
	},
	decorators: [() => ({ template: '<div style="display: flex; justify-content: center; align-items: center; margin-top: 80px; margin-bottom: 80px; height: 200px;"><story /></div>' })],
};
