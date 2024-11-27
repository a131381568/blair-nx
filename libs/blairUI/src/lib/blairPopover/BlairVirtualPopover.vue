<script setup>
import { computed, ref, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';
import {
	arrow,
	autoUpdate,
	flip,
	offset,
	shift,
	useFloating,
} from '@floating-ui/vue';

const props = defineProps({
	popperClass: {
		type: String,
		default: 'z-[2] max-w-[150px] rounded-md bg-white p-0 shadow-tip xl:max-w-max',
	},
	visible: {
		type: Boolean,
		default: false,
	},
	arrowVisible: {
		type: Boolean,
		default: true,
	},
	placement: {
		type: String,
		default: 'bottom',
	},
	/**
	 * virtualEl: https://floating-ui.com/docs/virtual-elements#usage
	 * @namespace currentRef
	 * @returns {object}
	 *    getBoundingClientRect() {
	 *        x: Number
	 *        y: Number
	 *        top: Number
	 *        left: Number
	 *        bottom: Number
	 *        right: Number
	 *        witdth: Number
	 *        height: Number
	 *    }
	 */
	currentRef: {
		// SVGElement (currentTarget)
		type: Object,
		default: () => {},
	},
});
const emit = defineEmits(['emitClosePopover']);
const POPPER_OFFSET = 4;
const reference = ref(null);
const popoverBox = ref(null);
const arrowRef = ref(null);

const closePopover = () => {
	emit('emitClosePopover');
};

const {
	floatingStyles,
	middlewareData,
	placement,
} = useFloating(reference, popoverBox, {
	placement: props.placement,
	middleware: [
		offset(POPPER_OFFSET),
		flip({
			padding: 10,
		}),
		shift({
			padding: 10,
		}),
		arrow({
			element: arrowRef,
			padding: 5,
		}),
	],
	whileElementsMounted: autoUpdate,
});

const currentPlacement = computed(() => {
	const isLeft = /left/.test(placement.value);
	const isRight = /right/.test(placement.value);
	const isTop = /top/.test(placement.value);
	const isBottom = /bottom/.test(placement.value);

	return {
		isLeft,
		isRight,
		isTop,
		isBottom,
	};
});

const arrowStyle = computed(() => {
	const position = {
		left: '',
		right: '',
		top: '',
		bottom: '',
	};

	const isVertical = currentPlacement.value.isTop || currentPlacement.value.isBottom;
	const isHorizontal = currentPlacement.value.isLeft || currentPlacement.value.isRight;

	if (isVertical) {
		position.left = `${middlewareData.value.arrow?.x}px`;
		position.right = `${middlewareData.value.arrow?.x}px`;
	}
	else if (isHorizontal) {
		position.top = `${middlewareData.value.arrow?.y}px`;
		position.bottom = `${middlewareData.value.arrow?.y}px`;
	}

	if (currentPlacement.value.isRight)
		position.left = `-${POPPER_OFFSET}px`;
	if (currentPlacement.value.isLeft)
		position.right = `-${POPPER_OFFSET}px`;
	if (currentPlacement.value.isBottom)
		position.top = `-${POPPER_OFFSET}px`;
	if (currentPlacement.value.isTop)
		position.bottom = `-${POPPER_OFFSET}px`;

	return position;
});

const arrowClass = computed(() => {
	if (currentPlacement.value.isTop)
		return 'border-l-0 border-t-0';
	if (currentPlacement.value.isBottom)
		return 'border-b-0 border-r-0';
	if (currentPlacement.value.isLeft)
		return 'border-l-0 border-b-0';
	if (currentPlacement.value.isRight)
		return 'border-r-0 border-t-0';

	return '';
});

onClickOutside(popoverBox, () => {
	closePopover();
});

watch(() => props.currentRef, (newVal) => {
	reference.value = newVal;
});
</script>

<template>
	<transition name="fade">
		<div
			v-if="visible"
			ref="popoverBox"
			:style="floatingStyles"
			:class="popperClass"
			data-name="BlariVirtualPopover__tip"
			@click="closePopover"
		>
			<div
				v-if="arrowVisible"
				ref="arrowRef"
				class="border-secondary absolute size-2.5 origin-center rotate-45 rounded-sm border border-solid bg-white"
				:class="arrowClass"
				:style="arrowStyle"
			/>
			<slot />
		</div>
	</transition>
</template>
