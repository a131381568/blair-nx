import { ref } from 'vue';
import CloseVector from '../../svg/CloseVector.vue';
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
					class="z-[1001] [&>div>div>div]:relative [&>div>div>div]:inset-0"
					:isVisable="customVisable"
					v-bind="args"
				>
					<template #header>
						<div class="relative flex w-full border-b border-solid border-gray-7 px-7 py-[1.375rem] justify-between">
							<span>Info</span>	
							<CloseVector 
								class="cursor-pointer"
								@click="closeModal"
							/>
						</div>
					</template>
					<template #body>
						<div class="w-full px-7 py-5 justify-start">
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
					class="z-[1001] [&>div>div>div]:relative [&>div>div>div]:inset-0"
					:isVisable="customVisable"
					v-bind="args"
				>
					<template #header>
						<div class="relative flex w-full border-b border-solid border-gray-7 px-7 py-[1.375rem] justify-between">
							<CloseVector 
								class="cursor-pointer"
								@click="closeModal"
							/>
							<span>header 插槽區</span>
						</div>
					</template>
					<template #body>
						<div class="w-full px-7 py-5 xl:h-[calc(100%-3.3125rem-4.375rem)] xl:overflow-auto xl:px-5">
							body 插槽區
						</div>
					</template>
					<template #footer>
						<div class="mt-0 flex h-[4.6875rem] w-full items-center justify-center gap-x-5 bg-gray-4 xl:h-[4.375rem]">
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
			'enter-active-class': 'transition duration-300 ease-in-out-1 transform',
			'enter-from-class': '-translate-y-8 opacity-0',
			'enter-to-class': 'translate-y-0 opacity-100',
			'leave-active-class': 'transition duration-300 ease-in-out-1 transform',
			'leave-to-class': '-translate-y-8 opacity-0',
			'leave-from-class': 'translate-y-0 opacity-100',
		},
		clickToClose: false,
		teleportTo: 'body',
		overlayClass: 'bg-blueGreenOpacity1',
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
					class="z-[1001] [&>div>div>div]:relative [&>div>div>div]:inset-0"
					:isVisable="customVisable"
					v-bind="args"
				>
					<template #header>
						<div class="relative flex w-full border-b border-solid border-gray-7 px-7 py-[1.375rem] justify-between">
							<CloseVector 
								class="cursor-pointer"
								@click="closeModal"
							/>
							<span>Duis fringilla</span>
						</div>
					</template>
					<template #body>
						<div class="w-full px-7 py-5 h-[calc(100%-3.3125rem-4.375rem)] overflow-auto">
							Praesent finibus consectetur posuere. Morbi efficitur venenatis dignissim
						</div>
					</template>
					<template #footer>
						<div class="mt-0 px-6 flex h-[4.6875rem] w-full items-center justify-between gap-x-5 bg-gray-4">
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
