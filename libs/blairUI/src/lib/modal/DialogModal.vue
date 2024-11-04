<script setup lang="ts">
import { ref, watch } from 'vue';
import { VueFinalModal } from 'vue-final-modal';

const props = defineProps({
	isVisable: {
		type: Boolean,
	},
	fullscreen: {
		type: Boolean,
	},
	widthStyle: {
		type: String,
	},
	modalContentAnimation: {
		type: [String, Object],
		default: 'vfm-fade',
	},
	clickToClose: {
		type: Boolean,
		default: true,
	},
	overlayClass: {
		type: [Object, Array, String],
		default: undefined,
	},
});

const emit = defineEmits(['beforeClose', 'emitOpened', 'emitClosed']);

const modalValue = ref(false);

const emitBeforeClose = () => {
	modalValue.value = false;
	emit('beforeClose');
};

const emitOpened = () => emit('emitOpened');

const emitClosed = () => emit('emitClosed');

const handleBackgroundClick = () => {
	if (props.clickToClose)
		emitBeforeClose();
};

watch(
	() => props.isVisable,
	(newVal) => {
		modalValue.value = newVal;
	},
	{ immediate: true },
);
</script>

<template>
	<VueFinalModal
		v-model="modalValue"
		content-class="absolute inset-0 overflow-auto"
		:content-transition="modalContentAnimation"
		:overlay-class="overlayClass"
		overlay-transition="vfm-fade"
		@before-close="emitBeforeClose"
		@opened="emitOpened"
		@on-closed="emitClosed"
	>
		<div
			class="absolute inset-0 flex h-full items-center justify-center overflow-auto"
			@click.self="handleBackgroundClick"
		>
			<div
				class="m-auto flex flex-col items-center overflow-auto rounded-lg bg-white py-8 text-center text-lg leading-normal"
				:class="{ 'lg: h-full rounded-none': fullscreen }"
				:style="{ width: !fullscreen ? widthStyle : '100%' }"
			>
				<slot name="header" />
				<slot name="icon" />
				<slot name="body" />
				<slot name="footer" />
			</div>
		</div>
	</VueFinalModal>
</template>
