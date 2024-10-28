<script setup lang="ts">
import { mapValues } from 'radash';
import { useRoute, useRouter } from 'vue-router';
import { computed, ref, watchEffect } from 'vue';
import type { vueQueryRes } from '@ctsf-src/services/utils/vue-query-client';
import type { ApiResponse, ScienceItemDto } from '@cts-shared';
import { scienceItemBaseDefaultData } from '@cts-shared';
import { STALE_TIME, queryClient } from '@ctsf-src/services/utils/vue-query-client';
import Header from '../components/Header.vue';
import TitleBox from '../components/TitleBox.vue';
import Footer from '../components/Footer.vue';

const getFirstEnter = ref(false);
// 取得路由
const route = useRoute();
const router = useRouter();
const getSid = computed(() => String(route.params.sid));
const postData = ref(scienceItemBaseDefaultData);

const { data: scienceDetailAPI } = queryClient.getScienceDetail.useQuery<
	vueQueryRes<ApiResponse<ScienceItemDto>>
>(['getScienceDetail', getSid], () => ({
	params: {
		id: getSid.value,
	},
}),	{
	staleTime: STALE_TIME,
	retry: false,
	onError: (err) => {
		if (err.status >= 400)
			router.push('/notfound');
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
		<!-- 瀏覽 md 區塊 -->
		<div
			v-show="postData.content"
			class="animate__animated animate__fadeIn md-container mt-8 bg-white/6 p-10 text-main-color-light mobile:p-8 h-table:w-10/12 laptop:p-20 middle-pc:mt-16"
			:class="[{ 'animate__delay-5s': getFirstEnter }, { 'animate__delay-1s': !getFirstEnter }]"
		>
			<v-md-preview
				class="markdown-body"
				:text="postData.content"
				height="400px"
			/>
		</div>
		<div class="post-bottom-meta mt-5 h-table:mt-8 h-table:w-10/12">
			<span class="text-tiny text-main-color-light">{{ postData.updateTime }},</span>
			<router-link
				class="tag-name text-tiny text-sub-color-light"
				:to="`/archive/${postData.postCategoryId}`"
			>
				{{ postData.postCategoryName }}
			</router-link>
		</div>
	</div>
	<Footer />
</template>
