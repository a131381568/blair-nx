<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { get, listify } from 'radash';
import Footer from '@ctsf-src/components/Footer.vue';
import AdminArticleForm from '@ctsf-src/components/AdminArticleForm.vue';
import type { PostCategoriesDto, PostCategoryDto } from '@cts-shared';
import { FILE_CONFIG, mutationScienceSchema } from '@cts-shared';
import { categoriesQuery } from '@ctsf-src/services/apis/categoriesApi';
import { scienceDelete, scienceEdit, sciencesQuery, singleScienceQuery } from '@ctsf-src/services/apis/sciencesApi';
import { uploadImage } from '@ctsf-src/services/apis/upLoadApi';
import { useConfirmModal, useMessageModal } from '@blair-nx-ui';
import { linkAdminArticle } from '@ctsf-src/helper/customCtsRoute';
import { DEFAULT_IMAGE } from '@ctsf-src/constants/static-data';

const route = useRoute();
const router = useRouter();
const postId = computed(() => String(route.params.pid));
const { showMsg } = useMessageModal();
const { showConfirm } = useConfirmModal();
const { data: categoriesAPI } = categoriesQuery();
const { refetch: scienceListRefetch } = sciencesQuery({
	activePage: ref(1),
	selectCategory: ref('all'),
	queryMode: 'list',
});
const { data: singleScienceApi, refetch: singleScienceRefetch } = singleScienceQuery(postId, router);

const currentRouteInfo = ref({
	articleTitle: '編輯文章',
	articleSaveBtn: '儲存編輯',
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
	postNanoId: {
		title: '文章 ID',
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
	const MODEL_TITLE = '編輯訊息';
	const checkResult =	await showConfirm({
		title: MODEL_TITLE,
		content: '確定編輯該文章 ?',
	});
	if (!checkResult)
		return;

	// 先行抓取分類 NanoId
	const actvieCatInfo = postCategories.value.find(item => item.postCategoryId === activeCatId.value);
	if (actvieCatInfo)
		selectDropCat(actvieCatInfo);

	const updatePayload = {
		title: articleInputInfo.value.title.val,
		content: articleInputInfo.value.content.val,
		image: articleInputInfo.value.image.val,
		postCategoryNanoId: articleInputInfo.value.postCategoryNanoId.val,
		postNanoId: postId.value,
	};

	const relevantList = listify(articleInputInfo.value, key => key);

	// 初始化錯誤訊息
	relevantList.forEach((itemName) => {
		articleInputInfo.value[itemName].error = '';
	});

	const { success, error } = mutationScienceSchema.safeParse(updatePayload);

	if (!success && error) {
		error.errors.forEach((info) => {
			relevantList.forEach((itemName) => {
				if (info.path.includes(itemName))
					articleInputInfo.value[itemName].error = info.message;
			});
		});
	}

	if (success) {
		const updateResult = await scienceEdit(updatePayload);
		const isSuccess = updateResult.status === 200;
		await scienceListRefetch();
		await singleScienceRefetch();
		linkAdminArticle(router);

		showMsg(
			isSuccess ? 'success' : 'error',
			get(updateResult.body, isSuccess ? 'data' : 'message', ''),
			MODEL_TITLE,
		);
	}
};

const setDelConfirmModal = async () => {
	const DEL_MODEL_TITLE = '刪除訊息';
	const checkDel =	await showConfirm({
		title: DEL_MODEL_TITLE,
		content: '確定刪除該文章 ?',
	});
	if (!checkDel)
		return;

	const delResult = await scienceDelete(postId.value);
	const isSuccess = delResult.status === 200;
	if (isSuccess) {
		await scienceListRefetch();
		linkAdminArticle(router);
	}

	showMsg(
		isSuccess ? 'success' : 'error',
		get(delResult.body, isSuccess ? 'data' : 'message', ''),
		DEL_MODEL_TITLE,
	);
};

onMounted(() => (articleInputInfo.value.postNanoId.val = postId.value));

watchEffect(() => {
	if (categoriesAPI.value?.status === 200)
		postCategories.value = categoriesAPI.value.body.data.filter(item => item.postCategoryId !== 'all');

	if (singleScienceApi.value && singleScienceApi.value.status === 200) {
		const res = singleScienceApi.value.body.data;
		articleInputInfo.value.title.val = res.title || '';
		articleInputInfo.value.image.val = res.image || '';
		articleInputInfo.value.content.val = res.content || '';
		activeCatId.value = res.postCategoryId || '';
	}
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
		:delete-event="setDelConfirmModal"
		@update-article-title-val="updateArticleVal($event, 'title')"
		@update-article-content-val="updateArticleVal($event, 'content')"
		@upload-file-event="updateFileAct"
		@select-category-event="selectDropCat"
	>
		<Footer class="absolute bottom-0 mobile:left-0" />
	</AdminArticleForm>
</template>
