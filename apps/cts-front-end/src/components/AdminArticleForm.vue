<script setup lang="ts">
import { computed } from 'vue';
import ArrowDown from '@ctsf-src/components/svg/ArrowDown.vue';
import type { PostCategoriesDto, PostCategoryDto } from '@cts-shared';
import { FILE_CONFIG } from '@cts-shared';
import { useToggle } from '@vueuse/core';

const props = defineProps({
	articleTitle: {
		type: String,
		default: '',
	},
	articleSaveBtn: {
		type: String,
		default: '',
	},
	articleImageUrl: {
		type: String,
		default: '',
	},
	articleImageError: {
		type: String,
		default: '',
	},
	articleTitleVal: {
		type: String,
		default: '',
	},
	articleTitleError: {
		type: String,
		default: '',
	},
	articleCatId: {
		type: String,
		default: '',
	},
	articleCatNanoIdError: {
		type: String,
		default: '',
	},
	articleContentVal: {
		type: String,
		default: '',
	},
	articleContentError: {
		type: String,
		default: '',
	},
	postCategories: {
		type: Array as () => PostCategoriesDto,
		default: () => [],
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
const emit = defineEmits(['uploadFileEvent', 'selectCategoryEvent', 'updateArticleTitleVal', 'updateArticleContentVal']);

const CATEGORY_UNSELECT_TIP = '必須選擇分類';
const DEFAULT_CATEGORY_NAME = '選擇分類';
const acceptList = FILE_CONFIG.ACCEPT_TYPE.map(name => `image/${name}`).join(',');
const [toggleFilterVal, toggleFilter] = useToggle();

const isAddMode = computed(() => props.articleSaveBtn === '儲存新增');
const formatImageName = computed(() => props.articleImageUrl.split('/').pop());

const formatCatgoryName = computed(() => {
	const activeInfo = props.postCategories.find((item) => {
		return item.postCategoryId === props.articleCatId;
	});
	return activeInfo ? activeInfo.postCategoryName : DEFAULT_CATEGORY_NAME;
});

const closeDefaultMenu = () => {
	if (toggleFilterVal.value === true)
		toggleFilterVal.value = false;
};

const updateArticleTitleVal = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('updateArticleTitleVal', target.value);
};

const updateArticleContentVal = (text: string) => {
	emit('updateArticleContentVal', text);
};

const uploadFileEvent = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('uploadFileEvent', target);
};

const selectCategoryEvent = (val: PostCategoryDto) => {
	toggleFilterVal.value = false;
	emit('selectCategoryEvent', val);
};
</script>

<template>
	<div
		class="relative left-7 w-full flex-wrap content-start items-start justify-center px-8 pb-52 mobile:left-11 mobile:w-admin-m-content mobile:pt-32 h-table:flex h-table:px-6 h-table:pt-32 laptop:left-0 laptop:w-4/5 middle-pc:px-20 middle-pc:pt-36"
		@click.self="closeDefaultMenu"
	>
		<div class="post-title-box mb-20 flex w-9/12 flex-wrap justify-between mobile:mx-auto mobile:mb-9 mobile:block mobile:w-11/12">
			<h1 class="relative -left-2 -top-2 mb-5 w-full text-white mobile:w-full mobile:text-5xl w-table:m-0 w-table:w-3/4">
				{{ articleTitle }}
			</h1>
			<button
				class="btn draw meet flex h-12 w-2/12 items-center justify-center p-0 text-center text-lg mobile:mt-6 mobile:w-full"
				@click.prevent="confirmEvent()"
			>
				{{ articleSaveBtn }}
			</button>
		</div>
		<div class="table-container editer-container flex w-9/12 flex-wrap justify-between mobile:m-auto mobile:w-11/12">
			<div class="mb-14 flex w-full content-center mobile:flex-wrap middle-pc:w-2/3 large-pc:mb-0 pro-pc:w-7/12">
				<div
					class="size-[304px] shrink-0 rounded-full bg-cover bg-center bg-no-repeat mini-mobile:size-[200px]"
					:style="{ 'background-image': `url(${articleImageUrl})` }"
				/>
				<div class="upload-bar relative w-[calc(100%-304px)] shrink-0 self-center mobile:mt-7 mobile:w-full h-table:left-8">
					<h4 class="mb-4 w-full font-normal text-main-color-light">
						封面圖片
					</h4>
					<h6 class="mb-6 w-10/12 truncate text-main-color-light">
						{{ formatImageName }}
					</h6>
					<label class="admin-sbtn relative flex w-24 cursor-pointer justify-center pt-1">上傳圖片
						<input
							class="update-btn hidden"
							type="file"
							:accept="acceptList"
							@change="uploadFileEvent($event)"
						>
					</label>
					<span
						v-show="articleImageError"
						class="m-auto mt-4 block h-5 w-full text-xs text-sp-color-dark"
					>
						{{ articleImageError }}
					</span>
				</div>
			</div>
			<div class="w-full large-pc:w-1/3 pro-pc:w-5/12">
				<div class="input-group mb-14">
					<h4 class="font-normal text-main-color-light">
						文章標題
					</h4>
					<input
						:value="articleTitleVal"
						type="text"
						class="post-title-input bottom-line-input m-auto block h-16 text-lg"
						:class="{ 'border-sp-color-dark': articleTitleError }"
						@input="updateArticleTitleVal"
					>
					<span
						v-show="articleTitleError"
						class="mt-2 block h-5 text-xs text-sp-color-dark"
					>
						{{ articleTitleError }}
					</span>
				</div>
				<div class="input-group mb-14">
					<h4 class="mb-4 font-normal text-main-color-light">
						文章分類
					</h4>
					<div class="post-cat-select dropdown-menu relative z-40 mb-4 w-full">
						<button
							id="dropdownDefault"
							class="relative inline-flex w-full items-center border border-white/30 bg-white/0 p-3 pl-4 text-center text-lg tracking-wide-content text-main-color-light duration-1000 hover:border-white/0 hover:bg-white/18 hover:text-sub-color-light focus:border-white/0 focus:bg-white/18 focus:text-sub-color-light focus:outline-none"
							type="button"
							@click.prevent="toggleFilter()"
						>
							{{ formatCatgoryName }}
							<ArrowDown />
						</button>
						<!-- Dropdown menu -->
						<div
							v-show="toggleFilterVal"
							id="dropdown"
							class="absolute z-10 w-full divide-y divide-gray-100 bg-main-color-light"
						>
							<ul class="cursor-pointer py-1 text-sm text-main-color-black">
								<li
									v-for="(val, key) in postCategories"
									:key="key"
									class="block px-4 py-2 tracking-wide-content hover:text-sub-color-dark"
									@click.stop="selectCategoryEvent(val)"
								>
									{{ val.postCategoryName }}
								</li>
							</ul>
						</div>
					</div>
					<span
						v-show="articleCatNanoIdError"
						class="mt-2 block h-5 text-xs text-sp-color-dark"
					>
						{{ CATEGORY_UNSELECT_TIP }}
					</span>
				</div>
			</div>
			<div class="editer-inner edit-mode md-container mt-16 w-full">
				<v-md-editor
					:model-value="articleContentVal"
					class="markdown-body"
					height="550px"
					@change="updateArticleContentVal"
				/>
				<span
					v-show="articleContentError"
					class="mt-2 block h-5 text-xs text-sp-color-dark"
				>
					{{ articleContentError }}
				</span>
			</div>
			<div
				v-if="!isAddMode"
				class="mt-16 w-full middle-pc:w-10/12"
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
