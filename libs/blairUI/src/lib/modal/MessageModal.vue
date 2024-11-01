<script setup lang="ts">
import { computed } from 'vue';
import { VueFinalModal } from 'vue-final-modal';
import WarningIcon from '../../svg/WarningIcon.vue';
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
		content-class="pointer-events-none flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0"
		:lock-scroll="false"
		:z-index-fn="({ index }) => 3000 + 2 * index"
		content-transition="vfm-fade"
		overlay-transition="vfm-fade"
	>
		<div
			class="fixed inset-0 transition-opacity"
			aria-hidden="true"
		>
			<div class="absolute inset-0 opacity-0" />
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
		</div>
	</VueFinalModal>
</template>
