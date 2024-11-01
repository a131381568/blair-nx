<script setup lang="ts">
import { COMMON_ID_MAX_LENGTH } from '@cts-shared';

defineProps({
	isAddMode: {
		type: Boolean,
		default: true,
	},
	categoriesTitle: {
		type: String,
		default: '',
	},
	categoriesSaveBtn: {
		type: String,
		default: '',
	},
	postCategoryNameTitle: {
		type: String,
		default: '',
	},
	postCategoryNameVal: {
		type: String,
		default: '',
	},
	postCategoryNameError: {
		type: String,
		default: '',
	},
	postCategoryIdTitle: {
		type: String,
		default: '',
	},
	postCategoryIdVal: {
		type: String,
		default: '',
	},
	postCategoryIdError: {
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
const emit = defineEmits(['updatePostCategoryNameVal', 'updatePostCategoryIdVal']);

const updatePostCategoryNameVal = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('updatePostCategoryNameVal', target.value);
};

const updatePostCategoryIdVal = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('updatePostCategoryIdVal', target.value);
};
</script>

<template>
	<div
		class="relative left-7 w-full flex-wrap content-start items-start justify-center px-8 pb-52 mobile:left-11 mobile:w-admin-m-content mobile:pt-32 h-table:flex h-table:px-6 h-table:pt-32 laptop:left-0 laptop:w-4/5 middle-pc:px-20 middle-pc:pt-36"
	>
		<!-- 標題區塊 -->
		<div
			class="category-layout-title-box mb-20 flex w-9/12 flex-wrap justify-between mobile:mx-auto mobile:mb-9 mobile:block mobile:w-11/12"
		>
			<h1
				class="relative -left-2 -top-2 mb-5 w-full text-white mobile:w-full mobile:text-5xl w-table:m-0 w-table:w-3/4"
			>
				{{ categoriesTitle }}
			</h1>
			<button
				class="btn draw meet btn flex h-12 w-2/12 items-center justify-center p-0 text-center text-lg mobile:mt-6 mobile:w-full"
				@click.prevent="confirmEvent()"
			>
				{{ categoriesSaveBtn }}
			</button>
		</div>
		<!-- 表單區塊 -->
		<div class="table-container flex w-9/12 flex-wrap justify-between mobile:m-auto mobile:w-11/12">
			<div class="w-full w-table:w-5/12">
				<div class="input-group mb-14">
					<h4 class="font-normal text-main-color-light">
						{{ postCategoryNameTitle }}
					</h4>
					<input
						:value="postCategoryNameVal"
						type="text"
						:maxlength="COMMON_ID_MAX_LENGTH"
						class="category-name-input bottom-line-input m-auto block h-16 text-lg"
						:class="{ 'border-sp-color-dark': postCategoryNameError }"
						@input="updatePostCategoryNameVal"
					>
					<span
						v-show="postCategoryNameError"
						class="mt-2 block h-5 text-xs text-sp-color-dark"
					>
						{{ postCategoryNameError }}
					</span>
				</div>
				<div class="input-group mb-14">
					<h4 class="font-normal text-main-color-light">
						{{ postCategoryIdTitle }}
					</h4>
					<input
						:value="postCategoryIdVal"
						type="text"
						:maxlength="COMMON_ID_MAX_LENGTH"
						class="category-id-input bottom-line-input m-auto block h-16 text-lg"
						:class="{ 'border-sp-color-dark': postCategoryIdError }"
						@input="updatePostCategoryIdVal"
					>
					<span
						v-show="postCategoryIdError"
						class="mt-2 block h-5 text-xs text-sp-color-dark"
					>
						{{ postCategoryIdError }}
					</span>
				</div>
			</div>
		</div>
		<div
			v-if="!isAddMode && deleteEvent"
			class="w-full w-table:w-9/12"
		>
			<button
				class="admin-delete-sbtn"
				@click.prevent="deleteEvent()"
			>
				刪除
			</button>
		</div>
		<slot />
	</div>
</template>
