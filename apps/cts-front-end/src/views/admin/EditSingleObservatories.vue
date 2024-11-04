<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { get, listify } from 'radash';
import AdminSidebar from '@ctsf-src/components/AdminSidebar.vue';
import Footer from '@ctsf-src/components/Footer.vue';
import AdminObservatoriesForm from '@ctsf-src/components/AdminObservatoriesForm.vue';
import { mutationObservatoryItemSchema } from '@cts-shared';
import { observatoriesQuery, observatoryDelete, observatoryEdit, observatoryQuery } from '@ctsf-src/services/apis/observatoriesApi';
import { useConfirmModal, useMessageModal } from '@blair-nx-ui';
import { linkAdminObservatories } from '@ctsf-src/helper/customCtsRoute';

const route = useRoute();
const router = useRouter();
const observatoryId = computed(() => String(route.params.mid));
const { showMsg } = useMessageModal();
const { showConfirm } = useConfirmModal();
const { refetch: observatoriesRefetch } = observatoriesQuery();
const { data: singleObservatoryApi, refetch: observatoryRefetch } = observatoryQuery(observatoryId, router);

const currentRouteInfo = ref({
	observatoryTitle: '編輯天文台',
	observatorySaveBtn: '儲存編輯',
});

const observatoryInputInfo = ref({
	observatoryCategoryName: {
		title: '天文台分類',
		val: '',
		error: '',
	},
	observatoryCategoryId: {
		title: '分類 ID',
		val: '',
		error: '',
	},
	observatoryPostContent: {
		title: '表格內容',
		val: '',
		error: '',
	},
});

const updateObservatoryVal = (val: string, type: string) => {
	switch (type) {
		case 'name':
			observatoryInputInfo.value.observatoryCategoryName.val = val;
			break;
		case 'id':
			observatoryInputInfo.value.observatoryCategoryId.val = val;
			break;
		case 'content':
			observatoryInputInfo.value.observatoryPostContent.val = val;
			break;
		default:
			break;
	}
};

const setConfirmModal = async () => {
	const MODEL_TITLE = '編輯天文台';
	const checkResult =	await showConfirm({
		title: MODEL_TITLE,
		content: '確定編輯該天文台 ?',
	});
	if (!checkResult)
		return;

	const updatePayload = {
		observatoryCategoryName: observatoryInputInfo.value.observatoryCategoryName.val,
		observatoryCategoryId: observatoryInputInfo.value.observatoryCategoryId.val,
		observatoryPostContent: observatoryInputInfo.value.observatoryPostContent.val,
		observatoryNanoId: observatoryId.value,
	};

	const relevantList = listify(observatoryInputInfo.value, key => key);

	// 初始化錯誤訊息
	relevantList.forEach((itemName) => {
		observatoryInputInfo.value[itemName].error = '';
	});

	const { success, error } = mutationObservatoryItemSchema.safeParse(updatePayload);

	if (!success && error) {
		error.errors.forEach((info) => {
			relevantList.forEach((itemName) => {
				if (info.path.includes(itemName))
					observatoryInputInfo.value[itemName].error = info.message;
			});
		});
	}

	if (success) {
		const updateResult = await observatoryEdit(updatePayload);
		const isSuccess = updateResult.status === 200;
		await observatoriesRefetch();
		await observatoryRefetch();
		linkAdminObservatories(router);

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
		content: '確定刪除該天文台 ?',
	});
	if (!checkDel)
		return;

	const delResult = await observatoryDelete(observatoryId.value);
	const isSuccess = delResult.status === 200;
	if (isSuccess) {
		await observatoriesRefetch();
		linkAdminObservatories(router);
	}

	showMsg(
		isSuccess ? 'success' : 'error',
		get(delResult.body, isSuccess ? 'data' : 'message', ''),
		DEL_MODEL_TITLE,
	);
};

watchEffect(() => {
	if (singleObservatoryApi.value && singleObservatoryApi.value.status === 200) {
		const res = singleObservatoryApi.value.body.data;
		observatoryInputInfo.value.observatoryCategoryName.val = res.observatoryCategoryName || '';
		observatoryInputInfo.value.observatoryCategoryId.val = res.observatoryCategoryId || '';
		observatoryInputInfo.value.observatoryPostContent.val = res.observatoryPostContent || '';
	}
});
</script>

<template>
	<div class="flex items-stretch">
		<AdminSidebar />
		<AdminObservatoriesForm
			:observatories-title="currentRouteInfo.observatoryTitle"
			:observatories-save-btn="currentRouteInfo.observatorySaveBtn"
			:observatory-category-name-val="observatoryInputInfo.observatoryCategoryName.val"
			:observatory-category-name-error="observatoryInputInfo.observatoryCategoryName.error"
			:observatory-category-id-val="observatoryInputInfo.observatoryCategoryId.val"
			:observatory-category-id-error="observatoryInputInfo.observatoryCategoryId.error"
			:observatory-post-content-val="observatoryInputInfo.observatoryPostContent.val"
			:observatory-post-content-error="observatoryInputInfo.observatoryPostContent.error"
			:confirm-event="setConfirmModal"
			:delete-event="setDelConfirmModal"
			@update-observatory-category-name-val="updateObservatoryVal($event, 'name')"
			@update-observatory-category-id-val="updateObservatoryVal($event, 'id')"
			@update-observatory-post-content-val="updateObservatoryVal($event, 'content')"
		>
			<Footer />
		</AdminObservatoriesForm>
	</div>
</template>
