<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
	disabled: { type: Boolean, default: false },
	text: { type: Number, default: null },
	type: { type: String, default: '' },
	borderStyle: { type: Boolean, default: false },
	isFirst: { type: Boolean, default: false },
	isLast: { type: Boolean, default: false },
});

const emit = defineEmits(['emitPagiSearch']);

const MODE_STYLE = {
	normal: 'rounded h-7 w-7 ',
	bordered: 'h-8 w-8 border-solid border-gray-1',
};

const STYLE_LIST = {
	prev: 'text-xl mx-[0.313rem] text-main',
	next: 'text-xl mx-[0.313rem] text-main',
	number: 'text-xss mx-[0.625rem]',
	ellipsis: 'text-[1.063rem] m-0 min-w-0 content-1',
};

const BORDER_STYLE_LIST = {
	first: 'text-xs border-t border-b border-r',
	last: 'text-xs border',
	prev: 'text-xs border-t border-b text-main-color-middle',
	next: 'text-xs border-t border-b border-l text-main-color-middle',
	number: 'text-sm border-t border-b border-l',
};

const generateIcon = computed(() => {
	switch (props.type) {
		case 'first':
			return 'ic:round-keyboard-double-arrow-left';
		case 'last':
			return 'ic:round-keyboard-double-arrow-right';
		case 'prev':
			return 'ic:round-keyboard-arrow-left';
		case 'next':
			return 'ic:round-keyboard-arrow-right';
		case 'ellipsis':
			return 'gridicons:ellipsis';
		default:
			return '';
	}
});

const dataName = computed(() => {
	// 寫測試用 dataName 標記
	if (props.type !== 'number')
		return `page-button-${props.type}`;

	return `page-button-${props.text}`;
});

const classList = computed(() => {
	const defaultStyle = props.borderStyle ? MODE_STYLE.bordered : MODE_STYLE.normal;
	const addStyle = [];

	if (props.borderStyle) {
		addStyle.push(BORDER_STYLE_LIST[props.type]);
		if (props.type === 'number') {
			addStyle.push(
				props.disabled
					? 'text-white bg-main-color-middle'
					: 'text-main-color-middle cursor-pointer hover:bg-gray-2 hover:text-content-1',
			);
		}
		else {
			addStyle.push(props.disabled ? 'text-gray-19' : 'text-main-color-middle cursor-pointer');
			props.isFirst && addStyle.push('rounded-l border-l');
			props.isLast && addStyle.push('rounded-r border-r');
		}
		addStyle.push(props.disabled ? 'font-bold' : 'font-normal');
	}
	else {
		addStyle.push(STYLE_LIST[props.type]);
		if (['prev', 'next'].includes(props.type)) {
			addStyle.push(props.disabled ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer');
		}
		else {
			addStyle.push(
				props.disabled
					? 'text-white bg-main-color-middle'
					: 'text-content-1 cursor-pointer desktop:hover:text-main',
			);
		}
	}

	return [defaultStyle, addStyle];
});

const onClick = () => {
	!props.disabled && emit('emitPagiSearch', props.text);
};
</script>

<template>
	<li
		:data-name="dataName"
		class="flex items-center justify-center font-bold outline-none"
		:class="classList"
		@click="onClick"
	>
		<Icon
			v-if="generateIcon"
			:icon="generateIcon"
		/>
		<span
			v-else
			class="text-[length:initial]"
		>{{ text }}</span>
	</li>
</template>
