<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { get, listify } from 'radash';
import Footer from '@ctsf-src/components/Footer.vue';
import AdminObservatoriesForm from '@ctsf-src/components/AdminObservatoriesForm.vue';
import { updateObservatoryItemSchema } from '@cts-shared';
import { observatoriesQuery, observatoryCreate } from '@ctsf-src/services/apis/observatoriesApi';
import { useConfirmModal, useMessageModal } from '@blair-nx-ui';
import { linkAdminObservatories } from '@ctsf-src/helper/customCtsRoute';

const router = useRouter();
const { showMsg } = useMessageModal();
const { showConfirm } = useConfirmModal();
const { refetch: observatoriesRefetch } = observatoriesQuery();

const currentRouteInfo = ref({
	observatoryTitle: '新增天文台',
	observatorySaveBtn: '儲存新增',
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
	const MODEL_TITLE = '新增天文台';
	const checkResult =	await showConfirm({
		title: MODEL_TITLE,
		content: '確定新增該天文台 ?',
	});
	if (!checkResult)
		return;

	const updatePayload = {
		observatoryCategoryName: observatoryInputInfo.value.observatoryCategoryName.val,
		observatoryCategoryId: observatoryInputInfo.value.observatoryCategoryId.val,
		observatoryPostContent: observatoryInputInfo.value.observatoryPostContent.val,
	};

	const relevantList = listify(observatoryInputInfo.value, key => key);

	// 初始化錯誤訊息
	relevantList.forEach((itemName) => {
		observatoryInputInfo.value[itemName].error = '';
	});

	const { success, error } = updateObservatoryItemSchema.safeParse(updatePayload);

	if (!success && error) {
		error.errors.forEach((info) => {
			relevantList.forEach((itemName) => {
				if (info.path.includes(itemName))
					observatoryInputInfo.value[itemName].error = info.message;
			});
		});
	}

	if (success) {
		const updateResult = await observatoryCreate(updatePayload);
		const isSuccess = updateResult.status === 200;
		await observatoriesRefetch();
		linkAdminObservatories(router);

		showMsg(
			isSuccess ? 'success' : 'error',
			get(updateResult.body, isSuccess ? 'data' : 'message', ''),
			MODEL_TITLE,
		);
	}
};
</script>

<template>
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
		@update-observatory-category-name-val="updateObservatoryVal($event, 'name')"
		@update-observatory-category-id-val="updateObservatoryVal($event, 'id')"
		@update-observatory-post-content-val="updateObservatoryVal($event, 'content')"
	>
		<Footer />
	</AdminObservatoriesForm>
</template>
