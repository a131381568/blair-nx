<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { get, listify } from 'radash';
import AdminCategoryForm from '@ctsf-src/components/AdminCategoryForm.vue';
import Footer from '@ctsf-src/components/Footer.vue';
import { linkAdminCategories } from '@ctsf-src/helper/customCtsRoute';
import { categoriesQuery, categoryDelete, categoryEdit, categoryQuery } from '@ctsf-src/services/apis/categoriesApi';
import { useConfirmModal, useMessageModal } from '@blair-nx-ui';
import { mutationCategorySchema } from '@cts-shared';

const route = useRoute();
const router = useRouter();
const currentRouteInfo = computed(() => {
	const isAddMode = (String(route.params.name) === 'AddSingleCategories');
	return {
		isAddMode,
		categoriesTitle: isAddMode ? '新增文章分類' : '編輯文章分類',
		categoriesSaveBtn: isAddMode ? '儲存新增' : '儲存編輯',
	};
});
const getCid = computed(() => String(route.params.cid));
const { refetch: categoriesRefetch } = categoriesQuery();
const { data: singleCatApi, refetch: categoryRefetch } = categoryQuery(getCid, router);
const { showMsg } = useMessageModal();
const { showConfirm } = useConfirmModal();

const categoryInputInfo = ref({
	postCategoryName: {
		title: '分類名稱',
		val: '',
		error: '',
	},
	postCategoryId: {
		title: '分類 ID',
		val: '',
		error: '',
	},
	postCategoryNanoId: {
		title: '',
		val: '',
		error: '',
	},
});

const setConfirmModal = async () => {
	const UPDATE_MODEL_TITLE = '更新訊息';
	const checkDel =	await showConfirm({
		title: UPDATE_MODEL_TITLE,
		content: '確定更新該分類 ?',
	});
	if (!checkDel)
		return;

	const updatePayload = {
		postCategoryName: categoryInputInfo.value.postCategoryName.val,
		postCategoryId: categoryInputInfo.value.postCategoryId.val,
		postCategoryNanoId: getCid.value,
	};

	const relevantList = listify(categoryInputInfo.value, key => key);

	// 初始化錯誤訊息
	relevantList.forEach((itemName) => {
		categoryInputInfo.value[itemName].error = '';
	});

	const { success, error } = mutationCategorySchema.safeParse(updatePayload);

	if (!success && error) {
		error.errors.forEach((info) => {
			relevantList.forEach((itemName) => {
				if (info.path.includes(itemName))
					categoryInputInfo.value[itemName].error = info.message;
			});
		});
	}

	if (success) {
		const updateResult = await categoryEdit(updatePayload);
		const isSuccess = updateResult.status === 200;
		if (isSuccess) {
			await categoriesRefetch();
			await categoryRefetch();
			linkAdminCategories(router);
		}

		showMsg(
			isSuccess ? 'success' : 'error',
			get(updateResult.body, isSuccess ? 'data' : 'message', ''),
			UPDATE_MODEL_TITLE,
		);
	}
};

const setDelConfirmModal = async () => {
	const DEL_MODEL_TITLE = '刪除訊息';
	const checkDel =	await showConfirm({
		title: DEL_MODEL_TITLE,
		content: '確定刪除該分類 ?',
	});
	if (!checkDel)
		return;

	const delResult = await categoryDelete(getCid.value);
	const isSuccess = delResult.status === 200;
	if (isSuccess) {
		await categoriesRefetch();
		await categoryRefetch();
		linkAdminCategories(router);
	}

	showMsg(
		isSuccess ? 'success' : 'error',
		get(delResult.body, isSuccess ? 'data' : 'message', ''),
		DEL_MODEL_TITLE,
	);
};

const syncCategoryNameVal = (val: string) => (categoryInputInfo.value.postCategoryName.val = val);

const syncCategoryIdVal = (val: string) => (categoryInputInfo.value.postCategoryId.val = val);

watchEffect(() => {
	if (singleCatApi.value && singleCatApi.value.status === 200) {
		const res = singleCatApi.value.body.data;
		categoryInputInfo.value.postCategoryName.val = res.postCategoryName || '';
		categoryInputInfo.value.postCategoryId.val = res.postCategoryId || '';
	}
});
</script>

<template>
	<AdminCategoryForm
		:is-add-mode="currentRouteInfo.isAddMode"
		:categories-title="currentRouteInfo.categoriesTitle"
		:categories-save-btn="currentRouteInfo.categoriesSaveBtn"
		:post-category-name-title="categoryInputInfo.postCategoryName.title"
		:post-category-name-val="categoryInputInfo.postCategoryName.val"
		:post-category-name-error="categoryInputInfo.postCategoryName.error"
		:post-category-id-title="categoryInputInfo.postCategoryId.title"
		:post-category-id-val="categoryInputInfo.postCategoryId.val"
		:post-category-id-error="categoryInputInfo.postCategoryId.error"
		:confirm-event="setConfirmModal"
		:delete-event="setDelConfirmModal"
		@update-post-category-name-val="syncCategoryNameVal"
		@update-post-category-id-val="syncCategoryIdVal"
	>
		<Footer class="absolute bottom-0 mobile:left-0" />
	</AdminCategoryForm>
</template>
