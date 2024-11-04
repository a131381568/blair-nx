<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { get, listify } from 'radash';
import AdminSidebar from '@ctsf-src/components/AdminSidebar.vue';
import Footer from '@ctsf-src/components/Footer.vue';
import AminStargazerFrom from '@ctsf-src/components/AminStargazerFrom.vue';
import AdminStargazerModal from '@ctsf-src/components/AdminStargazerModal.vue';
import { FILE_CONFIG, createSinleStargazingSchema } from '@cts-shared';
import { singleStargazingCreate, stargazingListQuery } from '@ctsf-src/services/apis/stargazingApi';
import { uploadImage } from '@ctsf-src/services/apis/upLoadApi';
import { useConfirmModal, useMessageModal } from '@blair-nx-ui';
import { linkAdminStargazer } from '@ctsf-src/helper/customCtsRoute';
import { DEFAULT_IMAGE } from '@ctsf-src/constants/static-data';

const router = useRouter();
const { showMsg } = useMessageModal();
const { showConfirm } = useConfirmModal();
const { refetch: stargazingListRefetch } = stargazingListQuery({
	activePage: ref(1),
	queryMode: 'list',
});

const currentRouteInfo = ref({
	stargazerTitle: '新增地點',
	stargazerSaveBtn: '儲存新增',
});

const stargazerInputInfo = ref({
	stargazingTitle: {
		title: '地點名稱',
		val: '',
		error: '',
	},
	stargazingAddress: {
		title: '地址說明',
		val: '',
		error: '',
	},
	stargazingDescription: {
		title: '地點介紹',
		val: '',
		error: '',
	},
	stargazingLatitude: {
		title: '緯度',
		val: '',
		error: '',
	},
	stargazingLongitude: {
		title: '經度',
		val: '',
		error: '',
	},
	stargazingImage: {
		title: '地點圖片',
		val: DEFAULT_IMAGE,
		error: '',
	},
});

const stargazerModalRef = ref<null | InstanceType<typeof AdminStargazerModal>>(null);

const updateStargazerVal = (val: string, type: string) => {
	switch (type) {
		case 'title':
			stargazerInputInfo.value.stargazingTitle.val = val;
			break;
		case 'address':
			stargazerInputInfo.value.stargazingAddress.val = val;
			break;
		case 'des':
			stargazerInputInfo.value.stargazingDescription.val = val;
			break;
		case 'lati':
			stargazerInputInfo.value.stargazingLatitude.val = val;
			break;
		case 'long':
			stargazerInputInfo.value.stargazingLongitude.val = val;
			break;
		case 'img':
			stargazerInputInfo.value.stargazingImage.val = val;
			break;
		default:
			break;
	}
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
				stargazerInputInfo.value.stargazingImage.val = imageResult.body?.data;
				stargazerInputInfo.value.stargazingImage.error = '';
			}
		}
		else {
			showMsg('error', '檔案大小超過 1 MB', '上傳訊息');
			stargazerInputInfo.value.stargazingImage.error = '檔案大小超過 1 MB';
		}
	}
};

const setConfirmModal = async () => {
	const MODEL_TITLE = '新增訊息';
	const checkResult =	await showConfirm({
		title: MODEL_TITLE,
		content: '確定新增該地點 ?',
	});
	if (!checkResult)
		return;

	const updatePayload = {
		stargazingTitle: stargazerInputInfo.value.stargazingTitle.val,
		stargazingAddress: stargazerInputInfo.value.stargazingAddress.val,
		stargazingLatitude: stargazerInputInfo.value.stargazingLatitude.val,
		stargazingLongitude: stargazerInputInfo.value.stargazingLongitude.val,
		stargazingImage: stargazerInputInfo.value.stargazingImage.val,
		stargazingDescription: stargazerInputInfo.value.stargazingDescription.val,
	};

	const relevantList = listify(stargazerInputInfo.value, key => key);

	// 初始化錯誤訊息
	relevantList.forEach((itemName) => {
		stargazerInputInfo.value[itemName].error = '';
	});

	const { success, error } = createSinleStargazingSchema.safeParse(updatePayload);

	if (!success && error) {
		error.errors.forEach((info) => {
			relevantList.forEach((itemName) => {
				if (info.path.includes(itemName))
					stargazerInputInfo.value[itemName].error = info.message;
			});
		});
	}

	if (success) {
		const updateResult = await singleStargazingCreate(updatePayload);
		const isSuccess = updateResult.status === 200;
		await stargazingListRefetch();
		linkAdminStargazer(router);

		showMsg(
			isSuccess ? 'success' : 'error',
			get(updateResult.body, isSuccess ? 'data' : 'message', ''),
			MODEL_TITLE,
		);
	}
};

const openStargazingModal = () => {
	if (stargazerModalRef.value)
		stargazerModalRef.value.openMapModal();
};

const updateCoordinateEvent = ([lat, lng]: string[]) => {
	updateStargazerVal(String(lat), 'lati');
	updateStargazerVal(String(lng), 'long');
};
</script>

<template>
	<div class="flex items-stretch">
		<AdminSidebar />
		<AminStargazerFrom
			:stargazer-title="currentRouteInfo.stargazerTitle"
			:stargazer-save-btn="currentRouteInfo.stargazerSaveBtn"
			:stargazer-name-val="stargazerInputInfo.stargazingTitle.val"
			:stargazer-name-error="stargazerInputInfo.stargazingTitle.error"
			:stargazer-description-val="stargazerInputInfo.stargazingAddress.val"
			:stargazer-description-error="stargazerInputInfo.stargazingAddress.error"
			:stargazer-introduction-val="stargazerInputInfo.stargazingDescription.val"
			:stargazer-introduction-error="stargazerInputInfo.stargazingDescription.error"
			:stargazer-latitude-val="stargazerInputInfo.stargazingLatitude.val"
			:stargazer-latitude-error="stargazerInputInfo.stargazingLatitude.error"
			:stargazer-longitude-val="stargazerInputInfo.stargazingLongitude.val"
			:stargazer-longitude-error="stargazerInputInfo.stargazingLongitude.error"
			:stargazer-image-url="stargazerInputInfo.stargazingImage.val"
			:stargazer-image-error="stargazerInputInfo.stargazingImage.error"
			:confirm-event="setConfirmModal"
			:open-map-modal-event="openStargazingModal"
			@update-stargazer-name-val="updateStargazerVal($event, 'title')"
			@update-stargazer-description-val="updateStargazerVal($event, 'address')"
			@update-stargazer-introduction-val="updateStargazerVal($event, 'des')"
			@update-stargazer-latitude-val="updateStargazerVal($event, 'lati')"
			@update-stargazer-longitude-val="updateStargazerVal($event, 'long')"
			@upload-file-event="updateFileAct"
		>
			<Footer class="absolute bottom-0 mobile:left-0" />
		</AminStargazerFrom>
	</div>
	<AdminStargazerModal
		ref="stargazerModalRef"
		@update-coordinate="updateCoordinateEvent"
	/>
</template>
