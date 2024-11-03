<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { get, listify } from 'radash';
import AdminSidebar from '@ctsf-src/components/AdminSidebar.vue';
import Footer from '@ctsf-src/components/Footer.vue';
import ArrowDown from '@ctsf-src/components/svg/ArrowDown.vue';
import { useToggle } from '@vueuse/core';
import type { PostCategoriesDto } from '@cts-shared';
import { FILE_CONFIG, createScienceSchema } from '@cts-shared';
import { categoriesQuery } from '@ctsf-src/services/apis/categoriesApi';
import { scienceCreate } from '@ctsf-src/services/apis/sciencesApi';
import { uploadImage } from '@ctsf-src/services/apis/upLoadApi';
import { useConfirmModal, useMessageModal } from '@blair-nx-ui';
import { linkAdminArticle } from '@ctsf-src/helper/customCtsRoute';

const DEFAULT_IMAGE = '/assets/bg/default-image-438x438.gif';
const CATEGORY_UNSELECT_TIP = '必須選擇分類';
const DEFAULT_CATEGORY_NAME = '選擇分類';
const acceptList = FILE_CONFIG.ACCEPT_TYPE.map(name => `image/${name}`).join(',');
const route = useRoute();
const router = useRouter();
const { data: categoriesAPI } = categoriesQuery();
const [toggleFilterVal, toggleFilter] = useToggle();
const { showMsg } = useMessageModal();
const { showConfirm } = useConfirmModal();

const currentRouteInfo = computed(() => {
	const isAddMode = (String(route.name) === 'AddSingleArticle');
	return {
		isAddMode,
		articleTitle: isAddMode ? '新增文章' : '編輯文章',
		articleSaveBtn: isAddMode ? '儲存新增' : '儲存編輯',
	};
});

const postCategories = ref<PostCategoriesDto>([]);

const articleInputInfo = ref({
	title: {
		title: '文章標題',
		val: '',
		error: '',
	},
	content: {
		title: '文章內文',
		val: '',
		error: '',
	},
	image: {
		title: '封面圖片',
		val: DEFAULT_IMAGE,
		error: '',
	},
	postCategoryNanoId: {
		title: '文章分類',
		val: '',
		error: '',
	},
	// postNanoId: {
	// 	title: '文章 ID',
	// 	val: '',
	// 	error: '',
	// },
});

const formatCatgoryName = computed(() => {
	const activeInfo = postCategories.value.find((item) => {
		return item.postCategoryNanoId === articleInputInfo.value.postCategoryNanoId.val;
	});
	return activeInfo ? activeInfo.postCategoryName : DEFAULT_CATEGORY_NAME;
});

const formatImageName = computed(() => articleInputInfo.value.image.val.split('/').pop());

// 分類相關
const selectDropCat = (catNanoId: string) => {
	toggleFilterVal.value = false;
	articleInputInfo.value.postCategoryNanoId.val = catNanoId;
};

const closeDefaultMenu = () => {
	if (toggleFilterVal.value === true)
		toggleFilterVal.value = false;
};

// 上傳檔案
const updateFileAct = async (event: Event) => {
	const target = event.target as HTMLInputElement;
	const fileList = target.files;
	if (fileList !== null) {
		if ((fileList[0].size) < FILE_CONFIG.SIZE_LIMIT) {
			// 小於 1 mb, 開始上傳
			const imageResult = await uploadImage(fileList[0]);

			if (imageResult.status === 200) {
				// 上傳成功後回來將連結附上
				articleInputInfo.value.image.val = imageResult.body?.data;
				articleInputInfo.value.image.error = '';
			}
		}
		else {
			showMsg('error', '檔案大小超過 1 MB', '上傳訊息');
			articleInputInfo.value.image.error = '檔案大小超過 1 MB';
		}
	}
};

const setConfirmModal = async () => {
	const MODEL_TITLE = '新增訊息';
	const checkResult =	await showConfirm({
		title: MODEL_TITLE,
		content: '確定新增該文章 ?',
	});
	if (!checkResult)
		return;

	const updatePayload = {
		title: articleInputInfo.value.title.val,
		content: articleInputInfo.value.content.val,
		image: articleInputInfo.value.image.val,
		postCategoryNanoId: articleInputInfo.value.postCategoryNanoId.val,
	};

	const relevantList = listify(articleInputInfo.value, key => key);

	// 初始化錯誤訊息
	relevantList.forEach((itemName) => {
		articleInputInfo.value[itemName].error = '';
	});

	const { success, error } = createScienceSchema.safeParse(updatePayload);

	if (!success && error) {
		error.errors.forEach((info) => {
			relevantList.forEach((itemName) => {
				if (info.path.includes(itemName))
					articleInputInfo.value[itemName].error = info.message;
			});
		});
	}

	if (success) {
		const updateResult = await scienceCreate(updatePayload);
		const isSuccess = updateResult.status === 200;
		linkAdminArticle(router);

		showMsg(
			isSuccess ? 'success' : 'error',
			get(updateResult.body, isSuccess ? 'data' : 'message', ''),
			MODEL_TITLE,
		);
	}
};

const setDelConfirmModal = () => {
	//
};

watchEffect(() => {
	if (categoriesAPI.value?.status === 200)
		postCategories.value = categoriesAPI.value.body.data.filter(item => item.postCategoryId !== 'all');
});
</script>

<template>
	<div class="flex items-stretch">
		<AdminSidebar />
		<div
			class="relative left-7 w-full flex-wrap content-start items-start justify-center px-8 pb-52 mobile:left-11 mobile:w-admin-m-content mobile:pt-32 h-table:flex h-table:px-6 h-table:pt-32 laptop:left-0 laptop:w-4/5 middle-pc:px-20 middle-pc:pt-36"
			@click.self="closeDefaultMenu"
		>
			<div class="post-title-box mb-20 flex w-9/12 flex-wrap justify-between mobile:mx-auto mobile:mb-9 mobile:block mobile:w-11/12">
				<h1 class="relative -left-2 -top-2 mb-5 w-full text-white mobile:w-full mobile:text-5xl w-table:m-0 w-table:w-3/4">
					{{ currentRouteInfo.articleTitle }}
				</h1>
				<button
					class="btn draw meet flex h-12 w-2/12 items-center justify-center p-0 text-center text-lg mobile:mt-6 mobile:w-full"
					@click.prevent="setConfirmModal"
				>
					{{ currentRouteInfo.articleSaveBtn }}
				</button>
			</div>
			<div class="table-container editer-container flex w-9/12 flex-wrap justify-between mobile:m-auto mobile:w-11/12">
				<div class="mb-14 flex w-full content-center mobile:flex-wrap middle-pc:w-2/3 large-pc:mb-0 pro-pc:w-7/12">
					<div
						class="animate__animated size-[304px] shrink-0 rounded-full bg-cover bg-center bg-no-repeat mini-mobile:size-[200px]"
						:style="{ 'background-image': `url(${articleInputInfo.image.val})` }"
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
								@change="updateFileAct($event)"
							>
						</label>
						<span
							v-show="articleInputInfo.image.error"
							class="m-auto mt-4 block h-5 w-full text-xs text-sp-color-dark"
						>
							{{ articleInputInfo.image.error }}
						</span>
					</div>
				</div>
				<div class="w-full large-pc:w-1/3 pro-pc:w-5/12">
					<div class="input-group mb-14">
						<h4 class="font-normal text-main-color-light">
							{{ articleInputInfo.title.title }}
						</h4>
						<input
							v-model="articleInputInfo.title.val"
							type="text"
							class="post-title-input bottom-line-input m-auto block h-16 text-lg"
							:class="{ 'border-sp-color-dark': articleInputInfo.title.error }"
						>
						<span
							v-show="articleInputInfo.title.error"
							class="mt-2 block h-5 text-xs text-sp-color-dark"
						>
							{{ articleInputInfo.title.error }}
						</span>
					</div>
					<div class="input-group mb-14">
						<h4 class="mb-4 font-normal text-main-color-light">
							{{ articleInputInfo.postCategoryNanoId.title }}
						</h4>
						<input
							v-show="false"
							v-model="articleInputInfo.postCategoryNanoId.val"
							type="text"
							class="post-cat-input"
						>
						<div class="post-cat-select dropdown-menu animate__animated animate__fadeIn relative z-40 mb-4 w-full">
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
										@click.stop="selectDropCat(String(val.postCategoryNanoId))"
									>
										{{ val.postCategoryName }}
									</li>
								</ul>
							</div>
						</div>
						<span
							v-show="articleInputInfo.postCategoryNanoId.error"
							class="mt-2 block h-5 text-xs text-sp-color-dark"
						>
							{{ CATEGORY_UNSELECT_TIP }}
						</span>
					</div>
				</div>
				<div class="editer-inner edit-mode md-container mt-16 w-full">
					<v-md-editor
						v-model="articleInputInfo.content.val"
						class="markdown-body"
						height="550px"
					/>
					<span
						v-show="articleInputInfo.content.error"
						class="mt-2 block h-5 text-xs text-sp-color-dark"
					>
						{{ articleInputInfo.content.error }}
					</span>
				</div>
				<div
					v-if="!currentRouteInfo.isAddMode"
					class="mt-16 w-full middle-pc:w-10/12"
				>
					<button
						class="admin-delete-sbtn"
						@click.prevent="setDelConfirmModal"
					>
						刪除
					</button>
				</div>
			</div>
			<Footer class="absolute bottom-0 mobile:left-0" />
		</div>
	</div>
</template>
