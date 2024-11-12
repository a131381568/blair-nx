<script setup>
const props = defineProps({
	field: {
		type: String,
	},
	content: {
		type: [String, Object],
	},
	customTdClass: {
		type: Array,
	},
});
const slots = useSlots();
const { fieldfixedDirectionVal, fixedInfo, calcInsetVal } = inject('commonTableInfo');
const tdRef = ref(null);
const stickyInset = ref('auto');

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

const tdClass = computed(() => {
	const classList = ['colCell', `colCell__${props.field}`, ...fixedClass.value];
	if (fixedInfo.value.fixedList[props.field] && fixedInfo.value.lastColId === props.field) {
		classList.push(`fixed__column__${fieldfixedDirectionVal.value}`);
	}
	return [...classList, ...props.customTdClass];
});

const haveSlot = computed(() => !!slots.default() && !!slots.default()[0] && !!slots.default()[0].children.length);

nextTick(() => {
	stickyInset.value = calcInsetVal({ colRef: tdRef.value });
});
</script>

<template>
	<!-- leading-[1.4375rem] -->
	<td
		ref="tdRef"
		:class="tdClass"
		class="border-secondary text-main-color-dark h-[4.875rem] w-auto border-b border-solid bg-white text-center align-middle text-sm font-normal leading-5 tracking-[0.01563rem] transition-all duration-300 ease-in"
		:style="{
			...fixedStyle,
		}"
	>
		<slot v-if="haveSlot" />
		<span v-else>{{ content }}</span>
	</td>
</template>
