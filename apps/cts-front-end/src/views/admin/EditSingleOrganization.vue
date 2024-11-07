<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { get, listify } from 'radash';
import Footer from '@ctsf-src/components/Footer.vue';
import OrganizeForm from '@ctsf-src/components/OrganizeForm.vue';
import { FILE_CONFIG, mutationFacilityItemSchema } from '@cts-shared';
import { facilitiesQuery, facilityDelete, facilityEdit, facilityQuery } from '@ctsf-src/services/apis/facilitiesApi';
import { uploadImage } from '@ctsf-src/services/apis/upLoadApi';
import { useConfirmModal, useMessageModal } from '@blair-nx-ui';
import { linkAdminOrganization } from '@ctsf-src/helper/customCtsRoute';
import { DEFAULT_IMAGE } from '@ctsf-src/constants/static-data';

const route = useRoute();
const router = useRouter();
const organizationId = computed(() => String(route.params.oid));
const { showMsg } = useMessageModal();
const { showConfirm } = useConfirmModal();
const { refetch: facilitiesRefetch } = facilitiesQuery();
const { data: singlefacilityApi, refetch: facilityRefetch } = facilityQuery(organizationId, router);

const currentRouteInfo = ref({
	organizationTitle: '編輯機構',
	organizationSaveBtn: '儲存編輯',
});

const organizationInputInfo = ref({
	facilitiesTitle: {
		title: '機構名稱',
		val: '',
		error: '',
	},
	facilitiesDescription: {
		title: '機構介紹',
		val: '',
		error: '',
	},
	facilitiesImage: {
		title: '機構圖片',
		val: DEFAULT_IMAGE,
		error: '',
	},
	facilitiesLink: {
		title: '外部連結',
		val: '',
		error: '',
	},
});

const updateOrganizationVal = (val: string, type: string) => {
	switch (type) {
		case 'title':
			organizationInputInfo.value.facilitiesTitle.val = val;
			break;
		case 'des':
			organizationInputInfo.value.facilitiesDescription.val = val;
			break;
		case 'link':
			organizationInputInfo.value.facilitiesLink.val = val;
			break;
		default:
			break;
	}
};

// 上傳檔案
const updateFileAct = async (target: HTMLInputElement) => {
	// const target = event.target as HTMLInputElement;
	const fileList = target.files;
	if (fileList !== null) {
		if ((fileList[0].size) < FILE_CONFIG.SIZE_LIMIT) {
			// 小於 1 mb, 開始上傳
			const imageResult = await uploadImage(fileList[0]);

			if (imageResult.status === 200) {
				// 上傳成功後回來將連結附上
				organizationInputInfo.value.facilitiesImage.val = imageResult.body?.data;
				organizationInputInfo.value.facilitiesImage.error = '';
			}
		}
		else {
			showMsg('error', '檔案大小超過 1 MB', '上傳訊息');
			organizationInputInfo.value.facilitiesImage.error = '檔案大小超過 1 MB';
		}
	}
};

const setConfirmModal = async () => {
	const MODEL_TITLE = '編輯機訊息';
	const checkResult =	await showConfirm({
		title: MODEL_TITLE,
		content: '確定編輯該機構 ?',
	});
	if (!checkResult)
		return;

	const updatePayload = {
		facilitiesTitle: organizationInputInfo.value.facilitiesTitle.val,
		facilitiesDescription: organizationInputInfo.value.facilitiesDescription.val,
		facilitiesImage: organizationInputInfo.value.facilitiesImage.val,
		facilitiesLink: organizationInputInfo.value.facilitiesLink.val,
		facilitiesNanoId: organizationId.value,
	};

	const relevantList = listify(organizationInputInfo.value, key => key);

	// 初始化錯誤訊息
	relevantList.forEach((itemName) => {
		organizationInputInfo.value[itemName].error = '';
	});

	const { success, error } = mutationFacilityItemSchema.safeParse(updatePayload);

	if (!success && error) {
		error.errors.forEach((info) => {
			relevantList.forEach((itemName) => {
				if (info.path.includes(itemName))
					organizationInputInfo.value[itemName].error = info.message;
			});
		});
	}

	if (success) {
		const updateResult = await facilityEdit(updatePayload);
		const isSuccess = updateResult.status === 200;
		await facilitiesRefetch();
		await facilityRefetch();
		linkAdminOrganization(router);

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
		content: '確定刪除該機構 ?',
	});
	if (!checkDel)
		return;

	const delResult = await facilityDelete(organizationId.value);
	const isSuccess = delResult.status === 200;
	if (isSuccess) {
		await facilitiesRefetch();
		linkAdminOrganization(router);
	}

	showMsg(
		isSuccess ? 'success' : 'error',
		get(delResult.body, isSuccess ? 'data' : 'message', ''),
		DEL_MODEL_TITLE,
	);
};

watchEffect(() => {
	if (singlefacilityApi.value && singlefacilityApi.value.status === 200) {
		const res = singlefacilityApi.value.body.data;
		organizationInputInfo.value.facilitiesTitle.val = res.facilitiesTitle || '';
		organizationInputInfo.value.facilitiesLink.val = res.facilitiesLink || '';
		organizationInputInfo.value.facilitiesImage.val = res.facilitiesImage || '';
		organizationInputInfo.value.facilitiesDescription.val = res.facilitiesDescription || '';
	}
});
</script>

<template>
	<OrganizeForm
		:organization-title="currentRouteInfo.organizationTitle"
		:organization-save-btn="currentRouteInfo.organizationSaveBtn"
		:facilities-title-val="organizationInputInfo.facilitiesTitle.val"
		:facilities-title-error="organizationInputInfo.facilitiesTitle.error"
		:facilities-link-val="organizationInputInfo.facilitiesLink.val"
		:facilities-link-error="organizationInputInfo.facilitiesLink.error"
		:facilities-description-val="organizationInputInfo.facilitiesDescription.val"
		:facilities-description-error="organizationInputInfo.facilitiesDescription.error"
		:facilities-image-val="organizationInputInfo.facilitiesImage.val"
		:facilities-image-error="organizationInputInfo.facilitiesImage.error"
		:confirm-event="setConfirmModal"
		:delete-event="setDelConfirmModal"
		@update-facilities-title-val="updateOrganizationVal($event, 'title')"
		@update-facilities-link-val="updateOrganizationVal($event, 'link')"
		@update-facilities-description-val="updateOrganizationVal($event, 'des')"
		@upload-file-event="updateFileAct"
	>
		<Footer />
	</OrganizeForm>
</template>
