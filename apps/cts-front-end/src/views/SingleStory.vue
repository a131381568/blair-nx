<script setup lang="ts">
import { mapValues } from 'radash';
import { useElementSize } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
import { computed, reactive, ref, watchEffect } from 'vue';
import type { vueQueryRes } from '@ctsf-src/services/utils/vue-query-client';
import type { ApiResponse, ScienceItemDto } from '@cts-shared';
import { scienceItemBaseDefaultData } from '@cts-shared';
import { STALE_TIME, queryClient } from '@ctsf-src/services/utils/vue-query-client';
import { linkNotFoundPage } from '@ctsf-src/helper/customCtsRoute';
import Header from '../components/Header.vue';
import TitleBox from '../components/TitleBox.vue';
import Footer from '../components/Footer.vue';

const getFirstEnter = ref(false);

const imgSizeRef = ref(null);
const imgSizeObj = reactive(useElementSize(imgSizeRef));
const imgSizeWidth = computed(() => {
	if (imgSizeObj)
		return imgSizeObj.width * 9 / 12;
	return 200;
});

// 取得路由
const route = useRoute();
const router = useRouter();
const getSid = computed(() => String(route.params.sid));
const postData = ref(scienceItemBaseDefaultData);

const { data: scienceDetailAPI } = queryClient.getScienceDetail.useQuery<
	vueQueryRes<ApiResponse<ScienceItemDto>>
>(['getStoryDetail', getSid], () => ({
	params: {
		id: getSid.value,
	},
}),	{
	staleTime: STALE_TIME,
	retry: false,
	onError: (err) => {
		if (err.status >= 400)
			linkNotFoundPage(router);
	},
});

watchEffect(() => {
	if (scienceDetailAPI.value && scienceDetailAPI.value.status === 200) {
		const res = scienceDetailAPI.value.body.data;
		const newList = mapValues(res, val => (val || ''));
		postData.value = newList;
	}
});
</script>

<template>
	<Header />
	<div
		class="flex-wrap items-start justify-center px-8 pb-32 mobile:pt-32 h-table:flex h-table:px-6 h-table:pt-32 middle-pc:px-20 middle-pc:pt-72"
	>
		<TitleBox
			:page-title="postData.title"
			:page-sub-title="postData.postCategoryName"
		/>
		<div
			ref="imgSizeRef"
			class="animate__animated animate__fadeInLeftBig mt-10 shrink mobile:w-6/12 h-table:w-5/12 laptop:w-4/12"
			:class="[{ 'animate__delay-4s': getFirstEnter }, { 'animate__delay-1s': !getFirstEnter }]"
		>
			<div
				:style="[
					{ width: `${imgSizeWidth}px` },
					{ height: `${imgSizeWidth}px` },
					{ 'background-image': `url(${postData.image})` },
				]"
				class="mx-auto rounded-full bg-cover laptop:ml-0"
			/>
		</div>
		<div
			class="md-container animate__animated animate__fadeIn mt-12 w-full text-main-color-light h-table:w-10/12 laptop:w-6/12"
			:class="[{ 'animate__delay-5s': getFirstEnter }, { 'animate__delay-2s': !getFirstEnter }]"
		>
			<div class="mb-14 text-4xl">
				故事內容
			</div>
			<v-md-preview
				class="markdown-body"
				:text="postData.content"
				height="400px"
			/>
		</div>
	</div>
	<Footer />
</template>
