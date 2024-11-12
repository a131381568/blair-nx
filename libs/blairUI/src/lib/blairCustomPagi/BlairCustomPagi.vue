<script setup>
import PagiBtn from './PagiBtn.vue';

const props = defineProps({
	total: {
		type: Number,
		required: true,
	},
	pageNum: {
		type: Number,
		required: true,
	},
	pageSize: {
		type: Number,
		required: true,
	},
	limitCount: {
		type: Number,
		default: 7,
		validator: (val) => {
			const num = Number(val);
			if (!(num % 2) || num < 5 || num > 21) {
				// 需大於等於5且小於等於21的奇數
				return false;
			}
			return true;
		},
	},
	ellipsisMode: {
		type: Boolean,
		default: true,
	},
	showFirstLastBtn: {
		type: Boolean,
		default: false,
	},
	alwayShowNexPreBtn: {
		type: Boolean,
		default: false,
	},
	borderStyle: {
		type: Boolean,
		default: false,
	},
});
const emit = defineEmits(['pageChange']);
const pageList = ref([]);
const otherBtns = reactive({
	disabled: {
		first: false,
		prev: false,
		next: false,
		last: false,
	},
	show: {
		first: true,
		prev: true,
		next: true,
		last: true,
	},
});
const totalPagesNum = computed(() => Math.ceil(props.total / props.pageSize));
const omitNum = computed(() => Number((props.limitCount / 2 + 1).toFixed()));
const isFrontOmit = computed(() => props.pageNum >= omitNum.value);
const isEndOmit = computed(() => props.pageNum <= Number(totalPagesNum.value - omitNum.value));
const middlePageCount = computed(() => props.limitCount - 2);

const setCurrentPage = ({ type, pageNum }) => {
	let num = props.pageNum;
	let currentPage = 1;
	if (type === 'first') {
		num = 1;
	}
	else if (type === 'prev') {
		num--;
	}
	else if (type === 'next') {
		num++;
	}
	else if (type === 'last') {
		num = totalPagesNum.value;
	}
	else {
		num = Number(pageNum);
	}

	if (num < 1) {
		currentPage = 1;
	}
	else if (num > totalPagesNum.value) {
		currentPage = totalPagesNum.value;
	}
	else {
		currentPage = num;
	}

	emit('pageChange', currentPage);
};

const clearPageList = () => (pageList.value = []);

const addPageByType = ({ addType, textVal }) => {
	const pageInfo = {
		disabled: props.pageNum === textVal,
		type: addType,
	};
	['number', 'ellipsis'].includes(addType) && (pageInfo.text = textVal);
	pageList.value.push(pageInfo);
};

const updateNormalList = () => {
	for (let i = 1; i < totalPagesNum.value + 1; i++) {
		addPageByType({ addType: 'number', textVal: i });
	}
};

const updateEllipsisList = () => {
	let start_index = 1;
	addPageByType({ addType: 'number', textVal: 1 });

	if (isFrontOmit.value) {
		addPageByType({ addType: 'ellipsis', textVal: props.pageNum - middlePageCount.value });
	}
	else {
		start_index = 2;
	}

	if (isFrontOmit.value && isEndOmit.value) {
		start_index = props.pageNum - Number((middlePageCount.value / 2).toFixed()) + 1;
	}

	!isEndOmit.value && (start_index = totalPagesNum.value - middlePageCount.value);

	for (let i = start_index; i < middlePageCount.value + start_index; i++) {
		addPageByType({ addType: 'number', textVal: i });
	}

	isEndOmit.value && addPageByType({ addType: 'ellipsis', textVal: props.pageNum + middlePageCount.value });
	addPageByType({ addType: 'number', textVal: totalPagesNum.value });
};

const updateSpreadList = () => {
	let start_index = 1;
	let end_index = props.limitCount;
	const aroundCount = Number((middlePageCount.value / 2).toFixed());

	if (isFrontOmit.value && isEndOmit.value) {
		start_index = props.pageNum - aroundCount;
		end_index = props.pageNum + aroundCount;
	}

	if (!isEndOmit.value && props.pageNum >= totalPagesNum.value - props.limitCount) {
		start_index = totalPagesNum.value - props.limitCount + 1;
		end_index = totalPagesNum.value;
	}

	for (let i = start_index; i < end_index + 1; i++) {
		addPageByType({ addType: 'number', textVal: i });
	}
};

const initOtherBtns = ({ pageNum }) => {
	if (props.alwayShowNexPreBtn) {
		otherBtns.show.prev = true;
		otherBtns.show.next = true;
	}
	else {
		otherBtns.show.prev = pageNum !== 1;
		otherBtns.show.next = pageNum !== totalPagesNum.value;
	}
	otherBtns.show.first = props.showFirstLastBtn;
	otherBtns.show.last = props.showFirstLastBtn;
	otherBtns.disabled.first = pageNum === 1;
	otherBtns.disabled.prev = pageNum === 1;
	otherBtns.disabled.next = pageNum === totalPagesNum.value;
	otherBtns.disabled.last = pageNum === totalPagesNum.value;

	['prev', 'first', 'next', 'last'].forEach((btnType) => {
		if (otherBtns.show[btnType]) {
			const actionName = ['prev', 'first'].includes(btnType) ? 'unshift' : 'push';
			pageList.value[actionName]({
				type: btnType,
				disabled: otherBtns.disabled[btnType],
			});
		}
	});
};

watch(
	() => [props.pageNum, totalPagesNum.value],
	([newCurrPage]) => {
		clearPageList();
		if (totalPagesNum.value < props.limitCount + 1) {
			updateNormalList();
		}
		else {
			props.ellipsisMode ? updateEllipsisList() : updateSpreadList();
		}
		initOtherBtns({ pageNum: newCurrPage });
	},
	{
		immediate: true,
	},
);
</script>

<template>
	<div
		v-if="totalPagesNum !== 1 && total"
		id="paginationRef"
		class="mx-auto flex w-full items-center justify-center"
	>
		<ul
			class="m-0 flex select-none list-none items-center p-0 text-[0]"
			data-name="blair__pagination__list"
		>
			<PagiBtn
				v-for="({ text, disabled, type }, index) in pageList"
				:key="index"
				:text="text"
				:type="type"
				:disabled="disabled"
				:border-style="borderStyle"
				:is-first="!index"
				:is-last="index === (pageList.length - 1)"
				@emit-pagi-search="setCurrentPage({ type, pageNum: text })"
			/>
		</ul>
	</div>
</template>
