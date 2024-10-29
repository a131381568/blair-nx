<script setup lang="ts">
import { computed } from 'vue';
import { VueFinalModal } from 'vue-final-modal';
import WarningIcon from '../../svg/WarningIcon.vue';
import CloseIcon from '../../svg/CloseIcon.vue';
import SuccessIcon from '../../svg/SuccessIcon.vue';

const props = defineProps({
	type: {
		type: String,
		default: 'success',
	},
	title: {
		type: String,
		default: '通知訊息',
	},
	content: {
		type: String,
		default: '',
	},
});

const typeIcon = computed(() => props.type === 'success' ? SuccessIcon : WarningIcon);
</script>

<template>
	<VueFinalModal
		class="fixed inset-0 z-50 overflow-y-auto"
		content-class="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0"
		:lock-scroll="false"
		:click-to-close="true"
		:z-index-fn="({ index }) => 3000 + 2 * index"
		content-transition="vfm-fade"
		overlay-transition="vfm-fade"
	>
		<div
			class="fixed inset-0 transition-opacity"
			aria-hidden="true"
		>
			<div class="absolute inset-0 bg-gray-500 opacity-75" />
		</div>
		<span
			class="hidden sm:inline-block sm:h-screen sm:align-middle"
			aria-hidden="true"
		>
			&#8203;
		</span>
		<div
			class="relative inline-block overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-headline"
		>
			<div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
				<button
					type="button"
					data-behavior="cancel"
					class="focus:ring-main-color-middle rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-0 focus:ring-offset-0"
				>
					<span class="sr-only">Close</span>
					<CloseIcon />
				</button>
			</div>
			<div class="sm:flex sm:items-center">
				<div class="bg-main-color-light mx-auto flex size-12 shrink-0 items-center justify-center rounded-full sm:mx-0 sm:size-10">
					<component :is="typeIcon" />
				</div>
				<div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
					<h3
						id="modal-headline"
						class="text-lg font-medium leading-6 text-gray-900"
					>
						{{ title }}
					</h3>
					<div class="mt-2">
						<p class="text-left text-sm text-gray-500">
							{{ content }}
						</p>
					</div>
				</div>
			</div>
			<div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
				<button
					type="button"
					data-behavior="confirm"
					class="bg-main-color-dark hover:bg-main-color-black focus:ring-main-color-middle inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-1 focus:ring-offset-0 sm:ml-3 sm:w-auto sm:text-sm"
				>
					了解
				</button>
				<button
					type="button"
					data-behavior="cancel"
					class="focus:ring-main-color-middle mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-1 focus:ring-offset-0 sm:mt-0 sm:w-auto sm:text-sm"
				>
					取消
				</button>
			</div>
		</div>
	</VueFinalModal>
</template>
