<script setup>
import { Icon } from '@iconify/vue';
import { useThrottleFn } from '@vueuse/core';

const props = defineProps({
	pageNum: {
		type: Number,
		required: true,
	},
});
const { totalCountVal, pageCountVal, emitSearchInfo } = inject('commonTableInfo');
const DEBOUNCE_MS = 1000;

const totalInfo = computed(() => {
	return `${totalCountVal.value > 0 ? (props.pageNum - 1) * pageCountVal.value + 1 : 0}-${
		totalCountVal.value > props.pageNum * 6 ? props.pageNum * pageCountVal.value : totalCountVal.value
	}筆(共${totalCountVal.value}筆)`;
});

const changePagiIsDisable = (direction) => {
	return direction === 'prev' ? props.pageNum === 1 : props.pageNum * pageCountVal.value >= totalCountVal.value;
};

const renderPagiBtnAttr = direction => ({
	class: [
		'commonTable__pagination__control__icon',
		{
			'commonTable__pagination__control__icon-disable opacity-30 cursor-not-allowed':
				changePagiIsDisable(direction),
		},
	],
	icon: `ri:arrow-${direction === 'prev' ? 'left' : 'right'}-s-line`,
});

const changePage = useThrottleFn((direction) => {
	if (!changePagiIsDisable(direction)) {
		// updateCurrPagi({ direction });
		const updateVal = direction === 'next' ? props.pageNum + 1 : props.pageNum - 1;
		emitSearchInfo(updateVal);
	}
}, DEBOUNCE_MS);
</script>

<template>
	<div class="flex h-[2.625rem] w-full select-none items-center justify-end">
		<div
			class="text-main-color-middle flex w-[33%] items-center justify-center gap-x-10 text-[1.438rem]"
		>
			<button
				v-for="direction in ['prev', 'next']"
				:key="direction"
				class="text-[1.438rem]"
			>
				<Icon
					v-bind="renderPagiBtnAttr(direction)"
					@click="changePage(direction)"
				/>
			</button>
		</div>
		<div
			class="text-secondary w-[33%] text-right text-sm"
			data-name="pagination__info"
		>
			{{ totalInfo }}
		</div>
	</div>
</template>
