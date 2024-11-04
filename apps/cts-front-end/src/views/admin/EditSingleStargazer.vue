<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { get, listify } from 'radash';
import AdminSidebar from '@ctsf-src/components/AdminSidebar.vue';
import Footer from '@ctsf-src/components/Footer.vue';
import AminStargazerFrom from '@ctsf-src/components/AminStargazerFrom.vue';
import AdminStargazerModal from '@ctsf-src/components/AdminStargazerModal.vue';
import { FILE_CONFIG, mutationSinleStargazingSchema } from '@cts-shared';
import { singleStargazingDelete, singleStargazingMutation, singleStargazingQuery, stargazingListQuery } from '@ctsf-src/services/apis/stargazingApi';
import { uploadImage } from '@ctsf-src/services/apis/upLoadApi';
import { useConfirmModal, useMessageModal } from '@blair-nx-ui';
import { linkAdminStargazer } from '@ctsf-src/helper/customCtsRoute';
import { DEFAULT_IMAGE } from '@ctsf-src/constants/static-data';

const route = useRoute();
const router = useRouter();
const { showMsg } = useMessageModal();
const { showConfirm } = useConfirmModal();

const lid = computed(() => String(route.params.lid));
const { refetch: stargazingListRefetch } = stargazingListQuery({
	activePage: ref(1),
	queryMode: 'list',
});
const { data: singleStargazingApi, refetch: singleStargazingRefetch } = singleStargazingQuery(lid, router);

const currentRouteInfo = ref({
	stargazerTitle: '編輯地點',
	stargazerSaveBtn: '儲存編輯',
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
	const MODEL_TITLE = '編輯訊息';
	const checkResult =	await showConfirm({
		title: MODEL_TITLE,
		content: '確定編輯該地點 ?',
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
		stargazingNanoId: lid.value,
	};

	const relevantList = listify(stargazerInputInfo.value, key => key);

	// 初始化錯誤訊息
	relevantList.forEach((itemName) => {
		stargazerInputInfo.value[itemName].error = '';
	});

	const { success, error } = mutationSinleStargazingSchema.safeParse(updatePayload);

	if (!success && error) {
		error.errors.forEach((info) => {
			relevantList.forEach((itemName) => {
				if (info.path.includes(itemName))
					stargazerInputInfo.value[itemName].error = info.message;
			});
		});
	}

	if (success) {
		const updateResult = await singleStargazingMutation(updatePayload);
		const isSuccess = updateResult.status === 200;
		await stargazingListRefetch();
		await singleStargazingRefetch();
		linkAdminStargazer(router);

		showMsg(
			isSuccess ? 'success' : 'error',
			get(updateResult.body, isSuccess ? 'data' : 'message', ''),
			MODEL_TITLE,
		);
	}
};

const deleteStargazer = async () => {
	const DEL_MODEL_TITLE = '刪除訊息';
	const checkDel =	await showConfirm({
		title: DEL_MODEL_TITLE,
		content: '確定刪除該地點 ?',
	});
	if (!checkDel)
		return;

	const delResult = await singleStargazingDelete(lid.value);
	const isSuccess = delResult.status === 200;
	if (isSuccess) {
		await stargazingListRefetch();
		linkAdminStargazer(router);
	}

	showMsg(
		isSuccess ? 'success' : 'error',
		get(delResult.body, isSuccess ? 'data' : 'message', ''),
		DEL_MODEL_TITLE,
	);
};

const openStargazingModal = () => {
	if (stargazerModalRef.value)
		stargazerModalRef.value.openMapModal();
};

const updateCoordinateEvent = ([lat, lng]: string[]) => {
	updateStargazerVal(String(lat), 'lati');
	updateStargazerVal(String(lng), 'long');
};

watchEffect(() => {
	if (singleStargazingApi.value && singleStargazingApi.value.status === 200) {
		const res = singleStargazingApi.value.body.data;
		updateStargazerVal(String(res.stargazingTitle), 'title');
		updateStargazerVal(String(res.stargazingAddress), 'address');
		updateStargazerVal(String(res.stargazingDescription), 'des');
		updateStargazerVal(String(res.stargazingLatitude), 'lati');
		updateStargazerVal(String(res.stargazingLongitude), 'long');
		updateStargazerVal(String(res.stargazingImage), 'img');
	}
});
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
			:delete-event="deleteStargazer"
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
		:current-lati="stargazerInputInfo.stargazingLatitude.val"
		:current-long="stargazerInputInfo.stargazingLongitude.val"
		@update-coordinate="updateCoordinateEvent"
	/>
</template>
