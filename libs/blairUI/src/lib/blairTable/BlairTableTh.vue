<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
	field: {
		type: String,
		required: true,
	},
	label: {
		type: String,
		required: true,
	},
	orderBy: {
		type: String,
		required: true,
	},
	width: {
		type: String,
		default: 'auto',
	},
	minWidth: {
		type: String,
		default: 'unset',
	},
	customThClass: {
		type: Array,
	},
});
const { iconConfig, sortData, fieldfixedDirectionVal, fixedInfo, calcInsetVal } = inject('commonTableInfo');
const thRef = ref(null);
const stickyInset = ref('auto');

const isSortable = computed(() => Boolean(props.orderBy));
const sortableClass = computed(() => {
	if (!isSortable.value)
		return [];
	return ['cursor-pointer pointer-events-auto'];
});
const fixedStyle = computed(() => {
	const isFixed = fixedInfo.value.fixedList[props.field];
	if (!isFixed)
		return {};
	return {
		top: stickyInset.value.top,
		right: stickyInset.value.right,
		bottom: stickyInset.value.bottom,
		left: stickyInset.value.left,
	};
});

const fixedClass = computed(() => {
	const isFixed = fixedInfo.value.fixedList[props.field];
	if (!isFixed)
		return [];
	return ['sticky', 'z-[2]'];
});

const thClass = computed(() => {
	const classList = ['headerCell', `headerCell__${props.field}`, ...sortableClass.value, ...fixedClass.value];
	if (fixedInfo.value.fixedList[props.field] && fixedInfo.value.lastColId === props.field) {
		classList.push(`fixed__column__${fieldfixedDirectionVal.value}`);
	}

	return [...classList, ...props.customThClass];
});

const sortableIconClass = computed(() => {
	if (!isSortable.value)
		return [];
	return ['text-lg', 'text-main-color-middle', 'align-middle', 'ml-0.5'];
});
const iconClass = computed(() => [
	...sortableIconClass.value,
	{
		'opacity-50': props.orderBy === 'default',
	},
]);

nextTick(() => {
	stickyInset.value = calcInsetVal({ colRef: thRef.value });
});
</script>

<template>
	<th
		ref="thRef"
		:class="thClass"
		class="border-main-color-middle pointer-events-none border-solid text-sm font-medium leading-5 tracking-[0.00938rem]"
		:style="{
			width,
			minWidth,
			...fixedStyle,
		}"
		@click="sortData({ updateId: field, updateOrderBy: orderBy })"
	>
		<slot name="thContent">
			<span class="text-main-color-black text-sm">{{ label }}</span>
		</slot>
		<Icon
			v-if="isSortable"
			:class="iconClass"
			v-bind="iconConfig[orderBy]"
		/>
	</th>
</template>
