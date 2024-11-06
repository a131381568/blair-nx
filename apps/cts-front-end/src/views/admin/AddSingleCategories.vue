<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { get, listify } from 'radash';
import AdminCategoryForm from '@ctsf-src/components/AdminCategoryForm.vue';
import Footer from '@ctsf-src/components/Footer.vue';
import { linkAdminCategories } from '@ctsf-src/helper/customCtsRoute';
import { categoriesQuery, categoryAdd } from '@ctsf-src/services/apis/categoriesApi';
import { useConfirmModal, useMessageModal } from '@blair-nx-ui';
import { createCategorySchema } from '@cts-shared';

const router = useRouter();
const currentRouteInfo = ref({
	isAddMode: true,
	categoriesTitle: '新增文章分類',
	categoriesSaveBtn: '儲存新增',
});
const { refetch: categoriesRefetch } = categoriesQuery();

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
});

const setConfirmModal = async () => {
	const UPDATE_MODEL_TITLE = '新增訊息';
	const checkResult =	await showConfirm({
		title: UPDATE_MODEL_TITLE,
		content: '確定新增該分類 ?',
	});
	if (!checkResult)
		return;

	const updatePayload = {
		postCategoryName: categoryInputInfo.value.postCategoryName.val,
		postCategoryId: categoryInputInfo.value.postCategoryId.val,
	};

	const relevantList = listify(categoryInputInfo.value, key => key);

	// 初始化錯誤訊息
	relevantList.forEach((itemName) => {
		categoryInputInfo.value[itemName].error = '';
	});

	const { success, error } = createCategorySchema.safeParse(updatePayload);

	if (!success && error) {
		error.errors.forEach((info) => {
			relevantList.forEach((itemName) => {
				if (info.path.includes(itemName))
					categoryInputInfo.value[itemName].error = info.message;
			});
		});
	}

	if (success) {
		const updateResult = await categoryAdd(updatePayload);
		const isSuccess = updateResult.status === 200;
		if (isSuccess) {
			await categoriesRefetch();
			linkAdminCategories(router);
		}

		showMsg(
			isSuccess ? 'success' : 'error',
			get(updateResult.body, isSuccess ? 'data' : 'message', ''),
			UPDATE_MODEL_TITLE,
		);
	}
};

const syncCategoryNameVal = (val: string) => (categoryInputInfo.value.postCategoryName.val = val);

const syncCategoryIdVal = (val: string) => (categoryInputInfo.value.postCategoryId.val = val);
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
		@update-post-category-name-val="syncCategoryNameVal"
		@update-post-category-id-val="syncCategoryIdVal"
	>
		<Footer class="absolute bottom-0 mobile:left-0" />
	</AdminCategoryForm>
</template>
