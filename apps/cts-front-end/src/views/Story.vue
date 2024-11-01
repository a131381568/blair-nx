<script setup lang="ts">
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@ctsf-src/stores/global';
import { computed, reactive, ref, watchEffect } from 'vue';
import { useElementSize, useWindowSize } from '@vueuse/core';
import type { ApiResponse, ScienceListDto, ScienceListWithPagiDto } from '@cts-shared';
import type { vueQueryRes } from '@ctsf-src/services/utils/vue-query-client';
import { STALE_TIME, queryClient } from '@ctsf-src/services/utils/vue-query-client';
import { stripMarkdown } from '@ctsf-src/helper/markDown';
import Header from '../components/Header.vue';
import TitleBox from '../components/TitleBox.vue';
import Footer from '../components/Footer.vue';

const route = useRoute();
const globalStore = useGlobalStore();
const { currentPageMeta } = storeToRefs(globalStore);
const getFirstEnter = ref(false);
const masonryRef = ref(null);
const { width } = useWindowSize();

const size = reactive(useElementSize(masonryRef));
const currentPage = ref(1);
const timeLineRef = ref<ScienceListDto>([]);

const masonryRefWidth = computed(() => size.width || 600);
const gridWidth = computed(() => {
	if (width.value >= 992)
		return Math.floor(masonryRefWidth.value / 2);
	return Math.floor(masonryRefWidth.value);
});
const storyMeta = computed(() => currentPageMeta.value(String(route.name)));

const { data: storyListAPI } = queryClient.getScienceList.useQuery<
	vueQueryRes<ApiResponse<ScienceListWithPagiDto>>
>(['getScienceList', currentPage], () => ({
	query: {
		page: String(currentPage.value),
		category: 'story',
	},
}),	{
	staleTime: STALE_TIME,
});

const loadMoreTimeLine = () => (currentPage.value += 1);

watchEffect(() => {
	if (storyListAPI.value?.status === 200)
		timeLineRef.value = [...timeLineRef.value, ...storyListAPI.value.body.data.list] as ScienceListDto;
});
</script>

<template>
	<Header />
	<div
		class="flex-wrap items-start justify-center px-8 pb-32 mobile:pt-32 h-table:flex h-table:px-6 h-table:pt-32 middle-pc:px-20 middle-pc:pt-72"
	>
		<TitleBox
			:page-title="storyMeta.pageTitle"
			:page-sub-title="storyMeta.subPageTitle"
		/>
		<div
			v-if="timeLineRef.length"
			ref="masonryRef"
			class="grid-col-2 animate__animated animate__fadeIn container relative mx-auto grid h-full grid-flow-col justify-items-center h-table:w-10/12"
			:class="[{ 'animate__delay-5s': getFirstEnter === true }, { 'animate__delay-1s': getFirstEnter === false }]"
		>
			<masonry-wall
				:items="timeLineRef"
				:ssr-columns="1"
				:column-width="gridWidth"
				:gap="0"
				class="timeline-grid py-56"
				:style="{ width: '100%' }"
			>
				<template #default="{ item, index }">
					<div
						:class="[
							{ 'mt-20': index !== 0 },
							{ 'mt-0 ': index === 0 },
							{ 'animate__animated animate__fadeInUp': timeLineRef.length === 1 + index },
						]"
						class="single-timeline-grid group flex"
						:style="{ width: `${gridWidth}px` }"
					>
						<div
							class="left-line mr-2 mt-5 flex h-0 w-3/12 items-stretch justify-start border border-x-0 border-t-0 border-main-color-middle"
						>
							<span class="relative -left-4px block h-9px w-9px self-center rounded-full bg-sub-color-dark" />
						</div>
						<div class="middle-pc:w-9/12">
							<router-link
								class="single-timeline-grid-link"
								:to="`/story/${item.postNanoId}`"
							>
								<h2 class="text-3xl text-white delay-75 duration-1000 group-hover:text-sp-color-light">
									{{
										item.title
									}}
								</h2>
							</router-link>
							<div class="w-full">
								<router-link :to="`/story/${item.postNanoId}`">
									<img
										class="mx-0 mb-4 mt-6 inline-block w-auto delay-75 duration-1000 group-hover:brightness-75"
										:src="item.image || ''"
									>
								</router-link>
							</div>
							<span class="grid-des-box text-main-color-light">{{ stripMarkdown(String(item.content)) }}</span>
						</div>
						<div
							class="right-line ml-2 mt-5 flex h-0 w-3/12 items-stretch justify-end border border-x-0 border-t-0 border-main-color-middle"
						>
							<span class="relative -right-5px h-9px w-9px self-center rounded-full bg-sub-color-dark" />
						</div>
					</div>
				</template>
			</masonry-wall>
		</div>
		<div
			v-show="storyListAPI?.body.data.meta.nextPage"
			class="text-left h-table:w-10/12 w-table:text-center"
		>
			<button
				class="btn draw meet timeline-loadmore mt-20"
				@click.prevent="loadMoreTimeLine"
			>
				<span>加載更多</span>
			</button>
		</div>
	</div>
	<Footer />
</template>
