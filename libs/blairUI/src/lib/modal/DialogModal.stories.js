import CloseVector from '@bigfun-ui-src/components/icons/CloseVector.vue';
import DialogModal from './DialogModal.vue';

/**
 * - 用在許多客製化燈箱的外框容器
 * - 底層由 vue-final-modal 製作
 */
export default {
	component: DialogModal,
	tags: ['autodocs'],
	argTypes: {
		isVisable: {
			control: 'boolean',
			description: '顯示燈箱',
		},
		fullscreen: {
			control: 'boolean',
			description: '設置全螢幕',
		},
		widthStyle: {
			control: 'text',
			description: 'css width 寬度值，ex: `518px`',
		},
		modalContentAnimation: {
			control: 'object',
			description: '燈箱動畫 class',
		},
		clickToClose: {
			control: 'boolean',
			description: '啟用點擊遮罩關閉燈箱',
		},
		teleportTo: {
			control: 'boolean',
			description: '設置`null | false`來關閉客製化渲染位置',
		},
		overlayClass: {
			control: 'text',
			description: '遮罩的 class',
		},
	},
};

/**
 * 基本使用
 * - 通常會帶入 header 和 body 的 slot，並客製化關閉按鈕位置
 * - 因為開關燈箱是藉由 isVisable 傳進來的狀態，所以可以在上層處理開關事件
 */
export const Base = {
	render: args => ({
		components: { DialogModal, CloseVector },
		setup() {
			const customVisable = ref(false);
			const toggleModal = () => (customVisable.value = !customVisable.value);
			const closeModal = () => (customVisable.value = false);

			return { args, toggleModal, closeModal, customVisable };
		},
		template: `
			<div>
				<button @click="toggleModal">Open Dialog Modal</button>
				<DialogModal 
					class="tw-z-[1001] [&>div>div>div]:tw-relative [&>div>div>div]:tw-inset-0"
					:isVisable="customVisable"
					v-bind="args"
				>
					<template #header>
						<div class="tw-relative tw-flex tw-w-full tw-border-b tw-border-solid tw-border-gray-7 tw-px-7 tw-py-[1.375rem] tw-justify-between">
							<span>Info</span>	
							<CloseVector 
								class="tw-cursor-pointer"
								@click="closeModal"
							/>
						</div>
					</template>
					<template #body>
						<div class="tw-w-full tw-px-7 tw-py-5 tw-justify-start">
							<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In venenatis, metus vel accumsan congue, ipsum eros mollis magna, a viverra nisi nisl vitae magna</h4>
						</div>
					</template>
				</DialogModal>
			</div>
		`,
	}),
	args: {
		// isVisable: false,
		fullscreen: false,
		widthStyle: '480px',
	},
};

/**
 * 填滿參數
 * - header, body, footer 的 slot 皆設置
 * - 可以設置 modalContentAnimation 來客製化燈箱動畫的淡入淡出，但是是要遵從 vue 的`<Transition />`規範去設置
 * - 針對背景遮罩，客製化顏色；還有點擊後也不會關閉燈箱
 */
export const fillPayload = {
	render: args => ({
		components: { DialogModal, CloseVector },
		setup() {
			const customVisable = ref(false);
			const toggleModal = () => (customVisable.value = !customVisable.value);
			const closeModal = () => (customVisable.value = false);

			return { args, toggleModal, closeModal, customVisable };
		},
		template: `
			<div>
				<button @click="toggleModal">Open Dialog Modal</button>
				<DialogModal 
					class="tw-z-[1001] [&>div>div>div]:tw-relative [&>div>div>div]:tw-inset-0"
					:isVisable="customVisable"
					v-bind="args"
				>
					<template #header>
						<div class="tw-relative tw-flex tw-w-full tw-border-b tw-border-solid tw-border-gray-7 tw-px-7 tw-py-[1.375rem] tw-justify-between">
							<CloseVector 
								class="tw-cursor-pointer"
								@click="closeModal"
							/>
							<span>header 插槽區</span>
						</div>
					</template>
					<template #body>
						<div class="tw-w-full tw-px-7 tw-py-5 xl:tw-h-[calc(100%-3.3125rem-4.375rem)] xl:tw-overflow-auto xl:tw-px-5">
							body 插槽區
						</div>
					</template>
					<template #footer>
						<div class="tw-mt-0 tw-flex tw-h-[4.6875rem] tw-w-full tw-items-center tw-justify-center tw-gap-x-5 tw-bg-gray-4 xl:tw-h-[4.375rem]">
							footer 插槽區
						</div>
					</template>
				</DialogModal>
			</div>
		`,
	}),
	args: {
		// isVisable: false,
		fullscreen: false,
		widthStyle: '518px',
		modalContentAnimation: {
			'enter-active-class': 'tw-transition tw-duration-300 tw-ease-in-out-1 tw-transform',
			'enter-from-class': '-tw-translate-y-8 tw-opacity-0',
			'enter-to-class': 'tw-translate-y-0 tw-opacity-100',
			'leave-active-class': 'tw-transition tw-duration-300 tw-ease-in-out-1 tw-transform',
			'leave-to-class': '-tw-translate-y-8 tw-opacity-0',
			'leave-from-class': 'tw-translate-y-0 tw-opacity-100',
		},
		clickToClose: false,
		teleportTo: 'body',
		overlayClass: 'tw-bg-blueGreenOpacity1',
	},
};

/**
 * 手機版
 * - 通常在 footer 都會放互動按鈕
 * - 且會是全屏的狀態
 */
export const mobileFull = {
	render: args => ({
		components: { DialogModal, CloseVector },
		setup() {
			const customVisable = ref(false);
			const toggleModal = () => (customVisable.value = !customVisable.value);
			const closeModal = () => (customVisable.value = false);

			return { args, toggleModal, closeModal, customVisable };
		},
		template: `
			<div>
				<button @click="toggleModal">Open Dialog Modal</button>
				<DialogModal 
					class="tw-z-[1001] [&>div>div>div]:tw-relative [&>div>div>div]:tw-inset-0"
					:isVisable="customVisable"
					v-bind="args"
				>
					<template #header>
						<div class="tw-relative tw-flex tw-w-full tw-border-b tw-border-solid tw-border-gray-7 tw-px-7 tw-py-[1.375rem] tw-justify-between">
							<CloseVector 
								class="tw-cursor-pointer"
								@click="closeModal"
							/>
							<span>Duis fringilla</span>
						</div>
					</template>
					<template #body>
						<div class="tw-w-full tw-px-7 tw-py-5 tw-h-[calc(100%-3.3125rem-4.375rem)] tw-overflow-auto">
							Praesent finibus consectetur posuere. Morbi efficitur venenatis dignissim
						</div>
					</template>
					<template #footer>
						<div class="tw-mt-0 tw-px-6 tw-flex tw-h-[4.6875rem] tw-w-full tw-items-center tw-justify-between tw-gap-x-5 tw-bg-gray-4">
							<button>cancle</button>
							<button>next</button>
						</div>
					</template>
				</DialogModal>
			</div>
		`,
	}),
	args: {
		// isVisable: false,
		fullscreen: true,
		teleportTo: 'body',
	},
};
