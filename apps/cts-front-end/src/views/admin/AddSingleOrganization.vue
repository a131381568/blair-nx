<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { get, listify } from 'radash';
import AdminSidebar from '@ctsf-src/components/AdminSidebar.vue';
import Footer from '@ctsf-src/components/Footer.vue';
import OrganizeForm from '@ctsf-src/components/OrganizeForm.vue';
import { FILE_CONFIG, createFacilityItemSchema } from '@cts-shared';
import { facilitiesQuery, facilityCreate } from '@ctsf-src/services/apis/facilitiesApi';
import { uploadImage } from '@ctsf-src/services/apis/upLoadApi';
import { useConfirmModal, useMessageModal } from '@blair-nx-ui';
import { linkAdminOrganization } from '@ctsf-src/helper/customCtsRoute';
import { DEFAULT_IMAGE } from '@ctsf-src/constants/static-data';

const router = useRouter();
const { showMsg } = useMessageModal();
const { showConfirm } = useConfirmModal();
const { refetch: facilitiesRefetch } = facilitiesQuery();

const currentRouteInfo = ref({
	organizationTitle: '新增機構',
	organizationSaveBtn: '儲存新增',
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
	const MODEL_TITLE = '新增機構';
	const checkResult =	await showConfirm({
		title: MODEL_TITLE,
		content: '確定新增該機構 ?',
	});
	if (!checkResult)
		return;

	const updatePayload = {
		facilitiesTitle: organizationInputInfo.value.facilitiesTitle.val,
		facilitiesDescription: organizationInputInfo.value.facilitiesDescription.val,
		facilitiesImage: organizationInputInfo.value.facilitiesImage.val,
		facilitiesLink: organizationInputInfo.value.facilitiesLink.val,
	};

	const relevantList = listify(organizationInputInfo.value, key => key);

	// 初始化錯誤訊息
	relevantList.forEach((itemName) => {
		organizationInputInfo.value[itemName].error = '';
	});

	const { success, error } = createFacilityItemSchema.safeParse(updatePayload);

	if (!success && error) {
		error.errors.forEach((info) => {
			relevantList.forEach((itemName) => {
				if (info.path.includes(itemName))
					organizationInputInfo.value[itemName].error = info.message;
			});
		});
	}

	if (success) {
		const updateResult = await facilityCreate(updatePayload);
		const isSuccess = updateResult.status === 200;
		await facilitiesRefetch();
		linkAdminOrganization(router);

		showMsg(
			isSuccess ? 'success' : 'error',
			get(updateResult.body, isSuccess ? 'data' : 'message', ''),
			MODEL_TITLE,
		);
	}
};
</script>

<template>
	<div class="flex items-stretch">
		<AdminSidebar />
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
			@update-facilities-title-val="updateOrganizationVal($event, 'title')"
			@update-facilities-link-val="updateOrganizationVal($event, 'link')"
			@update-facilities-description-val="updateOrganizationVal($event, 'des')"
			@upload-file-event="updateFileAct"
		>
			<Footer />
		</OrganizeForm>
	</div>
</template>
