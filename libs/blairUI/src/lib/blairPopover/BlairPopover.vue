<script setup>
import { computed, ref, useSlots } from 'vue';
import { onClickOutside } from '@vueuse/core';
import {
	arrow,
	autoUpdate,
	flip,
	offset,
	shift,
	useFloating,
} from '@floating-ui/vue';
import HelperIcon from '../../svg/HelperIcon.vue';

defineProps({
	popperClass: {
		type: String,
		default: 'shadow-xl z-[2] max-w-max rounded-xl bg-white px-5 py-4 shadow-popover xl:max-w-[calc(100%-2rem)]',
	},
	btnContainerClass: {
		type: String,
		default: 'flex h-4.5 w-4.5 items-center justify-end overflow-hidden align-top xl:h-[0.938rem] xl:w-3.7 xl:justify-center',
	},
});
const POPPER_OFFSET = 5;
const slots = useSlots();
const isVisible = ref(false);
const reference = ref(null);
const floating = ref(null);
const floatingArrow = ref(null);

const openPopover = () => (isVisible.value = true);

const {
	floatingStyles,
	middlewareData,
} = useFloating(reference, floating, {
	placement: 'bottom',
	middleware: [
		offset(POPPER_OFFSET),
		flip({
			padding: 10,
		}),
		shift({
			padding: 10,
		}),
		arrow({
			element: floatingArrow,
		}),
	],
	whileElementsMounted: autoUpdate,
});

const placementVal = computed(() => {
	return middlewareData.value.offset?.placement ? middlewareData.value.offset.placement : 'top';
});

const arrowStyle = computed(() => ({
	position: 'absolute',
	left: middlewareData.value.arrow?.x ? `${middlewareData.value.arrow.x}px` : '',
	top: placementVal.value === 'top' ? 'auto' : `-${POPPER_OFFSET}px`,
	bottom: placementVal.value === 'bottom' ? 'auto' : `-${POPPER_OFFSET}px`,
}));

onClickOutside(floating, () => {
	isVisible.value = false;
});
</script>

<template>
	<button
		ref="reference"
		:class="btnContainerClass"
		:data-ga="dataGa"
		data-name="blariPopover__button"
		@click.stop="openPopover"
	>
		<template v-if="slots.button">
			<slot name="button" />
		</template>
		<HelperIcon v-else />
	</button>
	<transition name="fade">
		<div
			v-if="isVisible"
			ref="floating"
			:class="popperClass"
			:style="floatingStyles"
			data-name="blariPopover__tip"
		>
			<div
				ref="floatingArrow"
				class="border-main-color-light size-2.5 origin-center rotate-45 rounded-sm border border-solid bg-white"
				:class="[placementVal === `bottom` ? `border-b-0 border-r-0` : `border-l-0 border-t-0`]"
				:style="arrowStyle"
			/>
			<slot name="default" />
		</div>
	</transition>
</template>
