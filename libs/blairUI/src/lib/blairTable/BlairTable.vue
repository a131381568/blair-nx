<script setup>
import { useScroll, useThrottleFn } from '@vueuse/core';
import { pick } from 'radash';
import BlairCustomPagi from '../blairCustomPagi/BlairCustomPagi.vue';
import BlairTableTd from './BlairTableTd.vue';
import BlairTableTh from './BlairTableTh.vue';
import BlairModernPagi from './BlairModernPagi.vue';

const props = defineProps({
	headerData: {
		type: Array,
		required: true,
	},
	tableData: {
		type: Array,
		required: true,
	},
	totalCount: {
		type: Number,
		required: true,
	},
	pagiMode: {
		type: String,
		required: true,
	},
	pageCount: {
		type: Number,
		default: 10,
	},
	fieldfixedDirection: {
		type: String,
		default: 'left',
	},
	fixedHeader: {
		type: Boolean,
		default: false,
	},
	tableHeight: {
		type: String,
		default: 'auto',
	},
	emptyText: {
		type: String,
		default: '查無資料',
	},
	customThClass: {
		type: Array,
		default: () => [
			'h-10',
			'bg-white',
			'align-middle',
			'font-bold',
			'text-sm',
			'text-center',
			'border-b',
			'px-2',
		],
	},
	customTdClass: {
		type: Array,
		default: () => ['px-2'],
	},
	customTrClass: {
		type: Array,
		default: () => [],
	},
	currentPagi: {
		type: Number,
		required: true,
	},
});

const emit = defineEmits(['handleSearch', 'emitFullTrEvent']);
const THROTTLE_MS = 1000;
const tableWrapperEl = ref(null);
const tableEl = ref(null);
const { arrivedState } = useScroll(tableWrapperEl);
const { left: leftEnd, right: rightEnd } = toRefs(arrivedState);
const iconConfig = reactive({
	desc: {
		icon: 'solar:sort-vertical-line-duotone',
		verticalFlip: true,
		rotate: 2,
	},
	asc: {
		icon: 'solar:sort-vertical-line-duotone',
		verticalFlip: true,
		rotate: 0,
	},
	default: {
		icon: 'solar:sort-vertical-linear',
		verticalFlip: true,
		rotate: 2,
	},
});
const sortByConfig = reactive({
	default: 'desc',
	desc: 'asc',
	asc: 'default',
});
const tableColumns = ref([]);
const tableRows = ref([]);
const currentSortKey = ref('');
const currentOrderBy = ref('default');

const tableRect = ref(null);
const showColFixedShadow = ref(0);
const fixedInfo = computed(() => {
	const mapList = {
		fixedList: [],
		lastColId: '',
	};
	tableColumns.value.forEach(({ field, fixed, ...info }) => {
		fixed && (mapList.fixedList[field] = { ...info });
	});
	const lastOrder = props.fieldfixedDirection === 'left' ? Object.keys(mapList.fixedList).length - 1 : 0;
	mapList.lastColId = Object.keys(mapList.fixedList)[lastOrder];
	return mapList;
});
const totalCountVal = computed(() => Number(props.totalCount));
const pageCountVal = computed(() => Number(props.pageCount));
const fieldfixedDirectionVal = computed(() => String(props.fieldfixedDirection));

const tableClass = reactive({
	commonTable: true,
	fixed__header: false,
});

const emitSearchInfo = emitPagi =>
	emit('handleSearch', {
		currPagi: emitPagi,
		currId: currentSortKey.value,
		currOrderBy: currentOrderBy.value,
	});

const sortData = useThrottleFn(({ updateId, updateOrderBy }) => {
	let currOrderBy = 'default';
	tableColumns.value = tableColumns.value.map(({ field, orderBy, ...headInfo }) => {
		if (orderBy) {
			let updateVal = 'default';
			if (field === updateId) {
				updateVal = sortByConfig[updateOrderBy];
				currOrderBy = updateVal;
			}
			orderBy = updateVal;
		}
		return {
			field,
			orderBy,
			...headInfo,
		};
	});
	currentSortKey.value = updateId;
	currentOrderBy.value = currOrderBy;
	// 頁數歸 1
	emitSearchInfo(1);
}, THROTTLE_MS);

const handleContentTrEvent = ({ data, rowIndex }) => emit('emitFullTrEvent', { data, rowIndex });

// 跳到指定頁數
const jumpToNewPagi = pagiVal => emitSearchInfo(pagiVal);

const calcInsetVal = ({ colRef }) => {
	if (props.fieldfixedDirection === 'right') {
		return {
			top: 'auto',
			right: `${Math.abs(colRef?.getBoundingClientRect()?.right - tableRect.value?.width - tableRect.value?.x)}px`,
			bottom: 'auto',
			left: 'auto',
		};
	}

	return {
		top: 'auto',
		right: 'auto',
		bottom: 'auto',
		left: `${colRef?.getBoundingClientRect()?.left - tableRect.value?.left}px`,
	};
};

nextTick(() => {
	tableRect.value = tableEl.value.getBoundingClientRect();
	tableClass.fixed__header = props.fixedHeader;
	props.fieldfixedDirection === 'right' && (showColFixedShadow.value = 1);
});

provide('commonTableInfo', {
	iconConfig,
	fieldfixedDirectionVal,
	totalCountVal,
	pageCountVal,
	sortData,
	emitSearchInfo,
	fixedInfo,
	calcInsetVal,
});

const tableHeaderWatcher = watch(
	() => props.headerData,
	(newHead) => {
		tableColumns.value = newHead.map(({ sortable, ...info }) => ({
			...info,
			orderBy: sortable ? 'default' : '',
		}));
	},
	{ deep: true, immediate: true },
);

const tableScrollWatcher = watch(
	() => [leftEnd.value, rightEnd.value],
	([newLeftVal, newRightVal], [oldLeftVal, oldRightVal]) => {
		const actShadow = props.fieldfixedDirection === 'right' ? oldRightVal : oldLeftVal;
		const closeShadow = props.fieldfixedDirection === 'right' ? newRightVal : newLeftVal;
		actShadow && (showColFixedShadow.value = 1);
		closeShadow && (showColFixedShadow.value = 0);
	},
);

const tableDataWatcher = watch(
	() => props.tableData,
	(newContent) => {
		const headerKey = props.headerData.map(({ field }) => field);
		tableRows.value = newContent.map(item => pick(item, headerKey));
	},
	{ immediate: true },
);

onBeforeUnmount(() => {
	tableScrollWatcher();
	tableDataWatcher();
	tableHeaderWatcher();
});
</script>

<template>
	<div
		ref="tableWrapperEl"
		:style="{ height: tableHeight }"
		class="table-scrollbar flex w-full flex-col"
		:class="[props.fixedHeader ? 'overflow-visible	' : 'overflow-auto']"
	>
		<table
			ref="tableEl"
			class="blairTable grow"
			:class="tableClass"
		>
			<thead>
				<tr>
					<BlairTableTh
						v-for="({ field, label, orderBy, width, minWidth }, rowIndex) in tableColumns"
						:key="field"
						:field="field"
						:label="label"
						:order-by="orderBy"
						:width="width"
						:min-width="minWidth"
						:custom-th-class="customThClass"
					>
						<template #thContent>
							<slot
								:name="`cellTh(${field})`"
								:field="field"
								:content="label"
								:row-index="rowIndex"
							/>
						</template>
					</BlairTableTh>
				</tr>
			</thead>
			<tbody v-if="tableData.length">
				<tr
					v-for="(data, rowIndex) in tableRows"
					:key="rowIndex"
					:class="customTrClass"
					@click="handleContentTrEvent({ data, rowIndex })"
				>
					<BlairTableTd
						v-for="(value, key) in data"
						:key="key"
						:content="value"
						:field="key"
						:custom-td-class="customTdClass"
					>
						<slot
							:name="`cell(${key})`"
							:field="key"
							:content="value"
							:td-data="data"
							:row-index="rowIndex"
						/>
					</BlairTableTd>
				</tr>
			</tbody>
		</table>
		<div
			v-if="!tableData.length"
			class="text-main-color-black flex h-[9.75rem] w-full items-center justify-center text-sm tracking-[0.00375rem]"
		>
			<slot name="empty">
				<div>
					{{ emptyText }}
				</div>
			</slot>
		</div>
	</div>
	<BlairModernPagi
		v-if="pagiMode === 'modern'"
		:page-num="currentPagi"
		@page-change="jumpToNewPagi"
	/>
	<BlairCustomPagi
		v-if="pagiMode === 'classic'"
		:total="totalCountVal"
		:page-num="currentPagi"
		:page-size="pageCountVal"
		:ellipsis-mode="false"
		:show-first-last-btn="true"
		:alway-show-nex-pre-btn="true"
		:border-style="true"
		class="mt-9"
		@page-change="jumpToNewPagi"
	/>
</template>

<style lang="scss" scoped>
.blairTable {
	&.commonTable {
		.fixed__column__left,
		.fixed__column__right {
			&::after {
				opacity: v-bind(showColFixedShadow);
			}
		}
	}
}

.table-scrollbar::-webkit-scrollbar {
	height: 0.4375rem;
}
</style>
