<script setup lang="ts">
import { computed } from 'vue';
import { ARTICLE_MAX_LENGTH, COMMON_ID_MAX_LENGTH } from '@cts-shared';

const props = defineProps({
	stargazerTitle: {
		type: String,
		default: '',
	},
	stargazerSaveBtn: {
		type: String,
		default: '',
	},
	stargazerNameVal: {
		type: String,
		default: '',
	},
	stargazerNameError: {
		type: String,
		default: '',
	},
	stargazerDescriptionVal: {
		type: String,
		default: '',
	},
	stargazerDescriptionError: {
		type: String,
		default: '',
	},
	stargazerIntroductionVal: {
		type: String,
		default: '',
	},
	stargazerIntroductionError: {
		type: String,
		default: '',
	},
	stargazerLatitudeVal: {
		type: String,
		default: '',
	},
	stargazerLatitudeError: {
		type: String,
		default: '',
	},
	stargazerLongitudeVal: {
		type: String,
		default: '',
	},
	stargazerLongitudeError: {
		type: String,
		default: '',
	},
	stargazerImageUrl: {
		type: String,
		default: '',
	},
	stargazerImageError: {
		type: String,
		default: '',
	},
	openMapModalEvent: {
		type: Function,
		default: null,
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
const emit = defineEmits(['uploadFileEvent', 'updateStargazerNameVal', 'updateStargazerDescriptionVal', 'updateStargazerIntroductionVal', 'updateStargazerLatitudeVal', 'updateStargazerLongitudeVal']);

const isAddMode = computed(() => props.stargazerSaveBtn === '儲存新增');
const formatImageName = computed(() => props.stargazerImageUrl.split('/').pop());

const uploadFileEvent = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('uploadFileEvent', target);
};

const updateStargazerNameVal = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('updateStargazerNameVal', target.value);
};

const updateStargazerDescriptionVal = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('updateStargazerDescriptionVal', target.value);
};

const updateStargazerIntroductionVal = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('updateStargazerIntroductionVal', target.value);
};

const updateStargazerLatitudeVal = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('updateStargazerLatitudeVal', target.value);
};

const updateStargazerLongitudeVal = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('updateStargazerLongitudeVal', target.value);
};
</script>

<template>
	<div class="relative left-7 w-full flex-wrap content-start items-start justify-center px-8 pb-52 mobile:left-11 mobile:w-admin-m-content mobile:pt-32 h-table:flex h-table:px-6 h-table:pt-32 laptop:left-0 laptop:w-4/5 middle-pc:px-20 middle-pc:pt-36">
		<div class="single-stargazer-title-box mb-20 flex w-9/12 flex-wrap justify-between mobile:mx-auto mobile:mb-9 mobile:block mobile:w-11/12">
			<h1 class="relative -left-2 -top-2 mb-5 w-full text-white mobile:w-full mobile:text-5xl w-table:m-0 w-table:w-3/4">
				{{ stargazerTitle }}
			</h1>
			<button
				class="btn draw meet flex h-12 w-2/12 items-center justify-center p-0 text-center text-lg mobile:mt-6 mobile:w-full"
				@click.prevent="confirmEvent()"
			>
				{{ stargazerSaveBtn }}
			</button>
		</div>
		<div class="table-container flex w-9/12 flex-wrap justify-between mobile:m-auto mobile:w-11/12">
			<div class="w-full w-table:w-5/12">
				<div class="input-group mb-14">
					<h4 class="font-normal text-main-color-light">
						地點名稱
					</h4>
					<input
						:value="stargazerNameVal"
						type="text"
						autocomplete="off"
						:maxlength="COMMON_ID_MAX_LENGTH"
						class="bottom-line-input m-auto block h-16 text-lg"
						:class="{ 'border-sp-color-dark': stargazerNameError }"
						@input="updateStargazerNameVal"
					>
					<span
						v-show="stargazerNameError"
						class="stargazer-name-error-tip m-auto mt-2 block h-5 w-full text-xs text-sp-color-dark"
					>
						{{ stargazerNameError }}
					</span>
				</div>
				<div class="input-group mb-14">
					<h4 class="font-normal text-main-color-light">
						地址說明
					</h4>
					<input
						:value="stargazerDescriptionVal"
						type="text"
						autocomplete="off"
						:maxlength="ARTICLE_MAX_LENGTH"
						class="bottom-line-input m-auto block h-16 text-lg"
						:class="{ 'border-sp-color-dark': stargazerDescriptionError }"
						@input="updateStargazerDescriptionVal"
					>
					<span
						v-show="stargazerDescriptionError"
						class="stargazer-des-error-tip m-auto mt-2 block h-5 w-full text-xs text-sp-color-dark"
					>
						{{ stargazerDescriptionError }}
					</span>
				</div>
				<div class="input-group mb-14">
					<h4 class="font-normal text-main-color-light">
						地點介紹
					</h4>
					<textarea
						:value="stargazerIntroductionVal"
						type="text"
						autocomplete="off"
						:maxlength="ARTICLE_MAX_LENGTH"
						class="bottom-line-input m-auto block h-[200px] resize-none pt-4 text-lg"
						:class="{ 'border-sp-color-dark': stargazerIntroductionError }"
						@input="updateStargazerIntroductionVal"
					/>
					<span
						v-show="stargazerIntroductionError"
						class="stargazer-intro-error-tip m-auto mt-2 block h-5 w-full text-xs text-sp-color-dark"
					>
						{{ stargazerIntroductionError }}
					</span>
				</div>
				<div class="input-group mb-14">
					<div class="map-search-bar flex justify-between">
						<h4 class="font-normal text-main-color-light">
							地點經緯度
						</h4>
						<button
							class="admin-sbtn"
							@click.prevent="openMapModalEvent()"
						>
							地圖查詢
						</button>
					</div>
					<div class="place-lat-lon-container relative flex justify-between space-x-3 before:absolute before:-bottom-1 before:left-1/2-3px before:block before:text-main-color-light before:opacity-70 before:content-[',']">
						<input
							:value="stargazerLatitudeVal"
							type="text"
							placeholder="Latitude"
							autocomplete="off"
							:maxlength="COMMON_ID_MAX_LENGTH"
							class="bottom-line-input h-16"
							:class="{ 'border-sp-color-dark': stargazerLatitudeError }"
							@input="updateStargazerLatitudeVal"
						>
						<input
							:value="stargazerLongitudeVal"
							type="text"
							placeholder="Longitude"
							autocomplete="off"
							:maxlength="COMMON_ID_MAX_LENGTH"
							class="bottom-line-input h-16"
							:class="{ 'border-sp-color-dark': stargazerLongitudeError }"
							@input="updateStargazerLongitudeVal"
						>
					</div>
					<div class="alert-message flex justify-between space-x-3">
						<div
							:class="{ 'lat-is-error visible': stargazerLatitudeError }"
							class="lat-error-tip m-auto mt-2 block h-5 w-full text-xs text-sp-color-dark"
						>
							{{ stargazerLatitudeError }}
						</div>
						<div
							:class="{ 'lon-is-error visible': stargazerLongitudeError }"
							class="lon-error-tip m-auto mt-2 block h-5 w-full text-xs text-sp-color-dark"
						>
							{{ stargazerLongitudeError }}
						</div>
					</div>
				</div>
			</div>
			<div class="w-full w-table:w-5/12">
				<div
					class="h-52 w-full bg-cover bg-center bg-no-repeat "
					:style="{ 'background-image': `url(${stargazerImageUrl})` }"
				/>
				<div class="upload-bar mb-1 mt-7 flex justify-between">
					<h4 class="font-normal text-main-color-light">
						地點圖片
					</h4>
					<label class="admin-sbtn relative flex cursor-pointer items-center justify-center">上傳圖片
						<input
							class="update-btn hidden"
							type="file"
							@change="uploadFileEvent($event)"
						>
					</label>
				</div>
				<h5 class="mb-7 text-main-color-light">
					{{ formatImageName }}
				</h5>
				<span
					v-show="stargazerImageError"
					class="m-auto mt-2 block h-5 w-full text-xs text-sp-color-dark"
				>
					{{ stargazerImageError }}
				</span>
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
