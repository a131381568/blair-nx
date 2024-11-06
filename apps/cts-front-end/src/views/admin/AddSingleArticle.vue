<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { get, listify } from 'radash';
import Footer from '@ctsf-src/components/Footer.vue';
import AdminArticleForm from '@ctsf-src/components/AdminArticleForm.vue';
import type { PostCategoriesDto, PostCategoryDto } from '@cts-shared';
import { FILE_CONFIG, createScienceSchema } from '@cts-shared';
import { categoriesQuery } from '@ctsf-src/services/apis/categoriesApi';
import { scienceCreate, sciencesQuery } from '@ctsf-src/services/apis/sciencesApi';
import { uploadImage } from '@ctsf-src/services/apis/upLoadApi';
import { useConfirmModal, useMessageModal } from '@blair-nx-ui';
import { linkAdminArticle } from '@ctsf-src/helper/customCtsRoute';
import { DEFAULT_IMAGE } from '@ctsf-src/constants/static-data';

const route = useRoute();
const router = useRouter();
const { showMsg } = useMessageModal();
const { showConfirm } = useConfirmModal();
const { data: categoriesAPI } = categoriesQuery();
const { refetch: scienceListRefetch } = sciencesQuery({
	activePage: ref(1),
	selectCategory: ref('all'),
	queryMode: 'list',
});

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
});
const activeCatId = ref('');

const updateArticleVal = (val: string, type: string) => {
	switch (type) {
		case 'title':
			articleInputInfo.value.title.val = val;
			break;
		case 'content':
			articleInputInfo.value.content.val = val;
			break;
		default:
			break;
	}
};

// 分類相關
const selectDropCat = (val: PostCategoryDto) => {
	articleInputInfo.value.postCategoryNanoId.val = val.postCategoryNanoId || '';
	activeCatId.value = val.postCategoryId || 'all';
};

// 上傳檔案
const updateFileAct = async (target: HTMLInputElement) => {
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
		await scienceListRefetch();
		linkAdminArticle(router);

		showMsg(
			isSuccess ? 'success' : 'error',
			get(updateResult.body, isSuccess ? 'data' : 'message', ''),
			MODEL_TITLE,
		);
	}
};

watchEffect(() => {
	if (categoriesAPI.value?.status === 200)
		postCategories.value = categoriesAPI.value.body.data.filter(item => item.postCategoryId !== 'all');
});
</script>

<template>
	<AdminArticleForm
		:article-title="currentRouteInfo.articleTitle"
		:article-save-btn="currentRouteInfo.articleSaveBtn"
		:article-image-url="articleInputInfo.image.val"
		:article-image-error="articleInputInfo.image.error"
		:article-title-val="articleInputInfo.title.val"
		:article-title-error="articleInputInfo.title.error"
		:article-cat-id="activeCatId"
		:article-cat-nano-id-error="articleInputInfo.postCategoryNanoId.error"
		:article-content-val="articleInputInfo.content.val"
		:article-content-error="articleInputInfo.content.error"
		:post-categories="postCategories"
		:confirm-event="setConfirmModal"
		:delete-event="() => false"
		@update-article-title-val="updateArticleVal($event, 'title')"
		@update-article-content-val="updateArticleVal($event, 'content')"
		@upload-file-event="updateFileAct"
		@select-category-event="selectDropCat"
	>
		<Footer class="absolute bottom-0 mobile:left-0" />
	</AdminArticleForm>
</template>
