<script setup lang="ts">
import { computed, ref } from 'vue';
import { until, useDebounceFn, watchDebounced } from '@vueuse/core';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@ctsf-src/stores/global';
import type { ApiResponse, PaginationDto, ScienceListDto, ScienceListWithPagiDto } from '@cts-shared';
import type { vueQueryRes } from '@ctsf-src/services/utils/vue-query-client';
import { paginationDefaultData } from '@cts-shared';
import { STALE_TIME, queryClient } from '@ctsf-src/services/utils/vue-query-client';
import { stripMarkdown } from '@ctsf-src/helper/markDown';
import Header from '../components/Header.vue';
import TitleBox from '../components/TitleBox.vue';
import Footer from '../components/Footer.vue';
import SearchBtn from '../components/svg/SearchBtn.vue';

const route = useRoute();
const globalStore = useGlobalStore();
const { currentPageMeta } = storeToRefs(globalStore);

const searchWord = ref('');
const postListRef = ref<ScienceListDto>([]);
const pagiMeta = ref<PaginationDto>(paginationDefaultData);
const currentPage = ref(1);
const searchMeta = computed(() => currentPageMeta.value(String(route.name)));

const updatePostListRef = (mode: string, data: ScienceListWithPagiDto) => {
	postListRef.value = ((mode === 'loadMore') ? [...postListRef.value, ...data.list] : data.list) as ScienceListDto;
	pagiMeta.value = data.meta;
};

// keyword mode
const searchKeywordIng = ref(false);
const searchKeywordQuery = queryClient.getScienceList.useQuery<
	vueQueryRes<ApiResponse<ScienceListWithPagiDto>>
>(['searchKeywordQuery', searchWord], () => ({
	query: {
		page: '1',
		keyword: searchWord.value,
		limit: '7',
	},
}),	{
	staleTime: STALE_TIME,
	enabled: searchKeywordIng,
});

const searchData = async () => {
	if (currentPage.value && searchWord.value) {
		searchKeywordIng.value = true;
		currentPage.value = 1;

		if (
			searchKeywordQuery.dataUpdatedAt.value
			&& !searchKeywordQuery.isStale.value
			&& searchKeywordQuery.isFetched.value
			&& !searchKeywordQuery.isFetching.value
		) {
			if (searchKeywordQuery.data.value?.status === 200)
				updatePostListRef('keyword', searchKeywordQuery.data.value.body.data);
		}
		else {
			await until(searchKeywordQuery.isLoading).toBe(false);
			if (searchKeywordQuery.data.value?.status === 200)
				updatePostListRef('keyword', searchKeywordQuery.data.value.body.data);
		}

		searchKeywordIng.value = false;
	}
};

// loadMore mode
const searchMoreIng = ref(false);
const searchMoreQuery = queryClient.getScienceList.useQuery<
	vueQueryRes<ApiResponse<ScienceListWithPagiDto>>
>(['searchMoreQuery', currentPage], () => ({
	query: {
		page: String(currentPage.value),
		keyword: searchWord.value,
		limit: '7',
	},
}),	{
	staleTime: STALE_TIME,
	enabled: searchMoreIng,
});

const loadMoreBtns = useDebounceFn(async () => {
	if (currentPage.value && searchWord.value) {
		searchMoreIng.value = true;
		currentPage.value += 1;

		await searchMoreQuery.refetch();
		if (searchMoreQuery.data.value?.status === 200)
			updatePostListRef('loadMore', searchMoreQuery.data.value.body.data);

		searchMoreIng.value = false;
	}
}, 400);

// 搜尋框防抖監聽限制輸入數量
watchDebounced(searchWord, () => {
	if (searchWord.value.length > 30) {
		const limitStr = searchWord.value.substring(0, 30);
		searchWord.value = limitStr;
	}
}, { debounce: 1000 });
</script>

<template>
	<Header />
	<div
		class="mobile:pt-32 h-table:flex h-table:px-6 h-table:pt-32 middle-pc:px-20 middle-pc:pt-72 flex-wrap items-start justify-center px-8 pb-32"
	>
		<TitleBox
			:page-title="searchMeta.pageTitle"
			:page-sub-title="searchMeta.subPageTitle"
		/>
		<!-- 搜尋框 -->
		<div class="mobile:-mt-8 h-table:w-10/12 mt-1 w-full">
			<div class="relative bg-transparent text-lg text-gray-800">
				<div class="flex items-center border-b border-white/25 py-2 duration-500 focus-within:border-white/60">
					<input
						v-model="searchWord"
						class="text-main-color-middle focus:text-main-color-light h-table:text-3xl mr-3 w-full border-none border-transparent bg-transparent px-2 text-xl focus:border-transparent focus:outline-0 focus:ring-0"
						type="text"
						placeholder="Search"
						data-testid="search__input"
						@keyup.enter="searchData"
					>
					<button
						type="submit"
						class="search-btn h-table:mr-4 h-table:mt-0 absolute right-0 top-0 mr-1 mt-2"
						data-testid="search__btn"
						@click.prevent="searchData"
					>
						<SearchBtn />
					</button>
				</div>
			</div>
		</div>
		<div
			v-show="!postListRef.length"
			class="h-table:w-10/12 mt-16 h-[200px]"
		>
			<!-- 搜尋無結果 -->
			<div
				v-show="!pagiMeta.totalCount && !postListRef.length && searchWord"
				class="search-nothing-tip"
			>
				<p
					class="h-table:text-3xl text-xl font-normal text-white"
					data-testid="search__nothing__tip__string"
				>
					查無結果
				</p>
				<p class="text-main-color-light h-table:mt-5 mt-1 truncate text-lg font-light">
					請使用其它關鍵字搜尋
				</p>
			</div>
		</div>
		<!-- 主視覺 -->
		<div
			v-show="postListRef.length"
			class="animate-flipInY w-table:block w-table:w-5/12 middle-pc:w-4/12 mt-20 hidden h-full"
		>
			<img
				class="w-auto"
				src="/img/bg-search.png"
			>
		</div>
		<!-- post grid -->
		<div
			class="post-grid-items mobile:w-full w-table:mt-36 w-table:w-5/12 middle-pc:w-6/12 mt-14 grid w-10/12 grid-cols-1 overflow-hidden"
		>
			<div
				v-for="(val, key) in postListRef"
				:key="key"
				data-testid="search__item"
				class="post-grid-item animate-fadeInUp"
			>
				<router-link
					data-testid="search__item__link"
					:to="{
						name: String(val.postCategoryId) === 'story' ? 'SingleStory' : 'SingleScience',
						params: { sid: String(val.postNanoId) },
					}"
				>
					<!-- card -->
					<div
						class="bg-white/6 laptop:px-16 laptop:py-8 mb-1 border border-white/0 p-6 delay-75 duration-1000 hover:border-white/60 hover:bg-white/0"
					>
						<p
							data-testid="search__item__title"
							class="h-table:text-3xl text-xl font-normal text-white"
						>
							{{ val.title }}
						</p>
						<p class="text-main-color-light h-table:mt-5 mt-1 truncate text-lg font-light">
							{{ stripMarkdown(String(val.content)) }}
						</p>
					</div>
				</router-link>
			</div>
			<div
				v-show="pagiMeta.nextPage"
				class="w-full text-center"
			>
				<button
					class="search-loadmore btn draw meet mobile:mt-10 h-table:mt-12 middle-pc:mt-16"
					@click.prevent="loadMoreBtns"
				>
					<span>Load More</span>
				</button>
			</div>
		</div>
	</div>
	<Footer />
</template>
