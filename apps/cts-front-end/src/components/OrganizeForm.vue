<script setup lang="ts">
import { computed } from 'vue';
import { FILE_CONFIG } from '@cts-shared';

const props = defineProps({
	organizationTitle: {
		type: String,
		default: '',
	},
	organizationSaveBtn: {
		type: String,
		default: '',
	},
	facilitiesTitleVal: {
		type: String,
		default: '',
	},
	facilitiesTitleError: {
		type: String,
		default: '',
	},
	facilitiesLinkVal: {
		type: String,
		default: '',
	},
	facilitiesLinkError: {
		type: String,
		default: '',
	},
	facilitiesDescriptionVal: {
		type: String,
		default: '',
	},
	facilitiesDescriptionError: {
		type: String,
		default: '',
	},
	facilitiesImageVal: {
		type: String,
		default: '',
	},
	facilitiesImageError: {
		type: String,
		default: '',
	},
	confirmEvent: {
		type: Function,
		default: null,
	},
	deleteEvent: {
		type: Function,
		default: null,
	},
});

const emit = defineEmits(['uploadFileEvent', 'updateFacilitiesTitleVal', 'updateFacilitiesLinkVal', 'updateFacilitiesDescriptionVal']);
const acceptList = FILE_CONFIG.ACCEPT_TYPE.map(name => `image/${name}`).join(',');

const isAddMode = computed(() => props.organizationSaveBtn === '儲存新增');
const formatImageName = computed(() => props.facilitiesImageVal.split('/').pop());

const updateFacilitiesTitleVal = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('updateFacilitiesTitleVal', target.value);
};

const updateFacilitiesLinkVal = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('updateFacilitiesLinkVal', target.value);
};

const updateFacilitiesDescriptionVal = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('updateFacilitiesDescriptionVal', target.value);
};

const uploadFileEvent = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('uploadFileEvent', target);
};
</script>

<template>
	<div class="relative left-7 w-full flex-wrap content-start items-start justify-center px-8 pb-52 mobile:left-11 mobile:w-admin-m-content mobile:pt-32 h-table:flex h-table:px-6 h-table:pt-32 laptop:left-0 laptop:w-4/5 middle-pc:px-20 middle-pc:pt-36">
		<div class="single-organ-title-box mb-20 flex w-9/12 flex-wrap justify-between mobile:mx-auto mobile:mb-9 mobile:block mobile:w-11/12">
			<h1 class="relative -left-2 -top-2 mb-5 w-full text-white mobile:w-full mobile:text-5xl w-table:m-0 w-table:w-3/4">
				{{ organizationTitle }}
			</h1>
			<button
				class="btn draw meet flex h-12 w-2/12 items-center justify-center p-0 text-center text-lg mobile:mt-6 mobile:w-full"
				@click.prevent="confirmEvent()"
			>
				{{ organizationSaveBtn }}
			</button>
		</div>
		<div class="table-container flex w-9/12 flex-wrap justify-between mobile:m-auto mobile:w-11/12">
			<div class="w-full w-table:w-5/12">
				<div class="input-group mb-14">
					<h4 class="font-normal text-main-color-light">
						機構名稱
					</h4>
					<input
						:value="facilitiesTitleVal"
						type="text"
						class="bottom-line-input m-auto block h-16 text-lg"
						:class="{ 'border-sp-color-dark': facilitiesTitleError }"
						@input="updateFacilitiesTitleVal"
					>
					<span
						v-show="facilitiesTitleError"
						class="mt-2 block h-5 text-xs text-sp-color-dark"
					>
						{{ facilitiesTitleError }}
					</span>
				</div>
				<div class="input-group mb-14">
					<h4 class="font-normal text-main-color-light">
						外部連結
					</h4>
					<input
						:value="facilitiesLinkVal"
						type="text"
						class="bottom-line-input m-auto block h-16 text-lg"
						:class="{ 'border-sp-color-dark': facilitiesLinkError }"
						@input="updateFacilitiesLinkVal"
					>
					<span
						v-show="facilitiesLinkError"
						class="mt-2 block h-5 text-xs text-sp-color-dark"
					>
						{{ facilitiesLinkError }}
					</span>
				</div>
				<div class="input-group mb-14">
					<h4 class="font-normal text-main-color-light">
						機構介紹
					</h4>
					<input
						:value="facilitiesDescriptionVal"
						type="text"
						as="textarea"
						class="bottom-line-input m-auto block h-[130px] resize-none pt-4 text-lg"
						:class="{ 'border-sp-color-dark': facilitiesDescriptionError }"
						@input="updateFacilitiesDescriptionVal"
					>
					<span
						v-show="facilitiesDescriptionError"
						class="mt-2 block h-5 text-xs text-sp-color-dark"
					>
						{{ facilitiesDescriptionError }}
					</span>
				</div>
			</div>
			<div class="w-full w-table:w-5/12">
				<div
					class="animate__animated h-52 w-full bg-cover bg-center bg-no-repeat "
					:style="{ 'background-image': `url(${facilitiesImageVal})` }"
				/>
				<div class="upload-bar mb-1 mt-7 flex justify-between">
					<h4 class="font-normal text-main-color-light">
						機構圖片
					</h4>
					<label class="admin-sbtn relative flex cursor-pointer items-center justify-center">上傳圖片
						<input
							class="update-btn hidden"
							type="file"
							:accept="acceptList"
							@change="uploadFileEvent($event)"
						>
					</label>
					<span
						v-show="facilitiesImageError"
						class="mt-2 block h-5 text-xs text-sp-color-dark"
					>
						{{ facilitiesImageError }}
					</span>
				</div>
				<h5 class="mb-7 text-main-color-light">
					{{ formatImageName }}
				</h5>
			</div>
			<div
				v-if="!isAddMode"
				class="w-full w-table:w-10/12"
			>
				<button
					class="admin-delete-sbtn"
					@click.prevent="deleteEvent()"
				>
					刪除
				</button>
			</div>
		</div>
		<slot />
	</div>
</template>
