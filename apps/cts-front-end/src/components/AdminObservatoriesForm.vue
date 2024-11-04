<script setup lang="ts">
import { computed } from 'vue';
import { COMMON_ID_MAX_LENGTH } from '@cts-shared';

const props = defineProps({
	observatoriesTitle: {
		type: String,
		default: '',
	},
	observatoriesSaveBtn: {
		type: String,
		default: '',
	},
	observatoryCategoryNameVal: {
		type: String,
		default: '',
	},
	observatoryCategoryNameError: {
		type: String,
		default: '',
	},
	observatoryCategoryIdVal: {
		type: String,
		default: '',
	},
	observatoryCategoryIdError: {
		type: String,
		default: '',
	},
	observatoryPostContentVal: {
		type: String,
		default: '',
	},
	observatoryPostContentError: {
		type: String,
		default: '',
	},
	confirmEvent: {
		type: Function,
		default: null,
	},
	deleteEvent: {
		type: Function,
		default: null,
	},
});

const emit = defineEmits(['updateObservatoryCategoryNameVal', 'updateObservatoryCategoryIdVal', 'updateObservatoryPostContentVal']);

const isAddMode = computed(() => props.observatoriesSaveBtn === '儲存新增');

const updateObservatoryCategoryNameVal = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('updateObservatoryCategoryNameVal', target.value);
};

const updateObservatoryCategoryIdVal = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('updateObservatoryCategoryIdVal', target.value);
};

const updateObservatoryPostContentVal = (text: string) => {
	emit('updateObservatoryPostContentVal', text);
};
</script>

<template>
	<div class="relative left-7 w-full flex-wrap content-start items-start justify-center px-8 pb-52 mobile:left-11 mobile:w-admin-m-content mobile:pt-32 h-table:flex h-table:px-6 h-table:pt-32 laptop:left-0 laptop:w-4/5 middle-pc:px-20 middle-pc:pt-36">
		<div class="single-obs-title-box mb-20 flex w-9/12 flex-wrap justify-between mobile:mx-auto mobile:mb-9 mobile:block mobile:w-11/12">
			<h1 class="relative -left-2 -top-2 mb-5 w-full text-white mobile:w-full mobile:text-5xl w-table:m-0 w-table:w-3/4">
				{{ observatoriesTitle }}
			</h1>
			<button
				class="btn draw meet flex h-12 w-2/12 items-center justify-center p-0 text-center text-lg mobile:mt-6 mobile:w-full"
				@click.prevent="confirmEvent()"
			>
				{{ observatoriesSaveBtn }}
			</button>
		</div>
		<div class="table-container flex w-9/12 flex-wrap justify-between mobile:m-auto mobile:w-11/12">
			<div class="w-full w-table:w-5/12">
				<div class="input-group mb-14">
					<h4 class="font-normal text-main-color-light">
						天文台分類
					</h4>
					<input
						:value="observatoryCategoryNameVal"
						type="text"
						autocomplete="off"
						class="bottom-line-input m-auto block h-16 text-lg"
						:class="{ 'border-sp-color-dark': observatoryCategoryNameError }"
						@input="updateObservatoryCategoryNameVal"
					>
					<span
						v-show="observatoryCategoryNameError"
						class="mt-2 block h-5 text-xs text-sp-color-dark"
					>
						{{ observatoryCategoryNameError }}
					</span>
				</div>
			</div>
			<div class="w-full w-table:w-5/12">
				<div class="input-group mb-14">
					<h4 class="font-normal text-main-color-light">
						分類 ID
					</h4>
					<input
						:value="observatoryCategoryIdVal"
						type="text"
						autocomplete="off"
						:maxlength="COMMON_ID_MAX_LENGTH"
						class="bottom-line-input m-auto block h-16 text-lg"
						:class="{ 'border-sp-color-dark': observatoryCategoryIdError }"
						@input="updateObservatoryCategoryIdVal"
					>
					<span
						v-show="observatoryCategoryIdError"
						class="obs-cat-id-error-tip m-auto mt-2 block h-5 w-full text-xs text-sp-color-dark"
					>
						{{ observatoryCategoryIdError }}
					</span>
				</div>
			</div>
			<div class="editer-container w-full">
				<div class="editer-inner edit-mode md-container w-full">
					<h4 class="font-normal text-main-color-light">
						表格內容
					</h4>
					<v-md-editor
						:model-value="observatoryPostContentVal"
						class="markdown-body"
						height="550px"
						@change="updateObservatoryPostContentVal"
					/>
					<span
						v-show="observatoryPostContentError"
						class="m-auto mt-2 block h-5 w-full text-xs text-sp-color-dark"
					>
						{{ observatoryPostContentError }}
					</span>
				</div>
			</div>
			<div
				v-if="!isAddMode"
				class="mt-16 w-full w-table:w-10/12"
			>
				<button
					class="admin-delete-sbtn"
					@click.prevent="deleteEvent()"
				>
					刪除
				</button>
			</div>
		</div>
		<slot />
	</div>
</template>
