<script setup lang="ts">
import { get } from 'radash';
import { computed, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@ctsf-src/stores/global';
import { useToggle } from '@vueuse/core';
import type { ApiResponse, PostCategoriesDto, ScienceItemDto, ScienceListWithPagiDto } from '@cts-shared';
import type { vueQueryRes } from '@ctsf-src/services/utils/vue-query-client';
import { STALE_TIME, queryClient } from '@ctsf-src/services/utils/vue-query-client';
import Header from '../components/Header.vue';
import TitleBox from '../components/TitleBox.vue';
import Footer from '../components/Footer.vue';

const route = useRoute();
const globalStore = useGlobalStore();
const { currentPageMeta } = storeToRefs(globalStore);
const [toggleFilterVal, toggleFilter] = useToggle();

const getFirstEnter = ref(false);
const changeGridState = ref(false);
const postListRef = ref<ScienceItemDto[]>([]);
const currentPage = ref(1);
const selectCat = ref('all');

const { data: categoriesAPI } = queryClient.getPostCategories.useQuery<
	vueQueryRes<ApiResponse<PostCategoriesDto>>
>(['getPostCategories'], () => ({}),	{
	staleTime: STALE_TIME,
});

const { data: scienceListAPI } = queryClient.getScienceList.useQuery<
	vueQueryRes<ApiResponse<ScienceListWithPagiDto>>
>(['getScienceList', currentPage, selectCat], () => ({
	query: {
		page: String(currentPage.value),
		category: selectCat.value,
	},
}),	{
	staleTime: STALE_TIME,
});

const reSearchData = (catId: string) => {
	changeGridState.value = true;
	setTimeout(() => {
		selectCat.value = catId;
		currentPage.value = 1;
		postListRef.value = [];
		changeGridState.value = false;
	}, 100);
};
const selectDropCat = (catId: string) => {
	toggleFilterVal.value = false;
	reSearchData(catId);
};
const closeDefaultMenu = () => {
	toggleFilterVal.value && (toggleFilterVal.value = false);
};

const loadMoreData = () => (currentPage.value += 1);

const stripMarkdown = (markdown: string) => {
	return markdown
		.replace(/<[^>]+(>|$)/g, '') // 移除 HTML 標籤
		.replace(/^#+\s(.+)/gm, '$1') // 移除標題
		.replace(/(\*\*|__)(.*?)\1/g, '$2')
		.replace(/(\*|_)(.*?)\1/g, '$2') // 移除粗體和斜體
		.replace(/\[(.*?)\]\(.*?\)/g, '$1') // 移除超連結
		.replace(/!\[(.*?)\]\(.*?\)/g, '$1') // 移除圖片
		.replace(/```[\s\S]*?```/g, '') // 移除程式碼區塊
		.replace(/`(.*?)`/g, '$1') // 移除行內程式碼
		.replace(/^>\s(.+)/gm, '$1') // 移除區塊引言
		.replace(/^(\*|-|\d+\.)\s+/gm, '') // 移除列表項目
		.replace(/\\n\\n|\n\n/g, ' ') // 移除多重換行符和轉義換行符
		.replace(/^\s+|\s+$/g, ''); // 移除多餘的空白
};

watchEffect(() => {
	if (scienceListAPI.value?.status === 200)
		postListRef.value = [...postListRef.value, ...scienceListAPI.value.body.data.list];
});

const postCategories = computed(() => {
	if (categoriesAPI.value?.status === 200)
		return categoriesAPI.value.body.data.filter((item, index) => item.postCategoryId !== 'story' && index < 8);
	return [];
});
const scienceMeta = computed(() => currentPageMeta.value(String(route.name)));
const selectCatName = computed(() => {
	const currentCat = postCategories.value.find(item => item.postCategoryId === selectCat.value);
	return get(currentCat, 'postCategoryName', 'all');
});
</script>

<template>
	<Header />
	<div
		class="mobile:pt-32 h-table:flex h-table:px-6 h-table:pt-32 middle-pc:px-20 middle-pc:pt-72 flex-wrap items-start justify-center px-8 pb-32"
		@click.self="closeDefaultMenu()"
	>
		<TitleBox
			:page-title="scienceMeta.pageTitle"
			:page-sub-title="scienceMeta.subPageTitle"
		/>
		<div
			class="science-filter-bar animate__animated animate__fadeIn laptop:inline-flex middle-pc:mb-20 middle-pc:mt-16 mb-16 mt-6 hidden w-10/12"
			:class="[{ 'animate__delay-4s': getFirstEnter }, { 'animate__delay-1s': !getFirstEnter }]"
		>
			<ul
				v-if="postCategories.length && postCategories"
				class="flex"
			>
				<li
					v-for="(val, key) in postCategories"
					:key="key"
					class="science-filter-item w-auto min-w-min"
					@click="reSearchData(String(val.postCategoryId))"
				>
					<div class="laptop:mr-6 large-pc:mr-10 group flex items-center">
						<input
							:id="String(val.postCategoryId)"
							class="hidden"
							:value="val.postCategoryId"
						>
						<label
							class="group-hover:text-sp-color-light flex flex-none cursor-pointer items-center text-2xl delay-75 duration-1000"
							:class="[
								{ 'text-sub-color-light': val.postCategoryId === selectCat },
								{ 'text-main-color-light': val.postCategoryId !== selectCat },
							]"
						>
							<span
								class="border-grey flex-no-shrink group-hover:bg-sp-color-light mr-2 inline-block size-3 flex-none whitespace-nowrap rounded-full border delay-75 duration-1000"
								:class="{ 'bg-sub-color-light': val.postCategoryId === selectCat }"
							/>
							{{ val.postCategoryName }}
						</label>
					</div>
				</li>
			</ul>
		</div>
		<!-- 選單樣式 -->
		<div
			class="dropdown-menu animate__animated animate__fadeIn h-table:w-10/12 laptop:hidden relative z-40 mb-8"
			:class="[{ 'animate__delay-4s': getFirstEnter }, { 'animate__delay-1s': !getFirstEnter }]"
		>
			<button
				id="dropdownDefault"
				class="w-200px tracking-wide-content text-main-color-light hover:bg-white/18 hover:text-sub-color-light focus:bg-white/18 focus:text-sub-color-light relative inline-flex items-center border border-white/60 bg-white/0 p-3 pl-4 text-center text-xl font-medium duration-1000 hover:border-white/0 focus:border-white/0 focus:outline-none"
				type="button"
				@click.prevent="toggleFilter()"
			>
				{{ selectCatName }}
				<svg
					class="absolute right-4 ml-2 size-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>
			<!-- Dropdown menu -->
			<div
				v-show="toggleFilterVal"
				id="dropdown"
				class="w-200px bg-main-color-light absolute z-10 divide-y divide-gray-100"
			>
				<ul class="text-main-color-black cursor-pointer py-1 text-sm">
					<li
						v-for="(val, key) in postCategories"
						:key="key"
						class="tracking-wide-content hover:text-sub-color-dark block px-4 py-2"
						@click.stop="selectDropCat(String(val.postCategoryId))"
					>
						{{ val.postCategoryName }}
					</li>
				</ul>
			</div>
		</div>
		<!-- post grid -->
		<div
			v-if="postListRef.length"
			class="animate__animated animate__fadeInUp mobile:grid-cols-1 mobile:gap-5 h-table:w-10/12 h-table:gap-12 laptop:grid-cols-3 pro-pc:gap-24 grid grid-cols-2 overflow-hidden"
			:class="[{ 'animate__delay-4s': getFirstEnter }, { animate__fadeOut: changeGridState }]"
		>
			<div
				v-for="(val, key) in postListRef"
				:key="key"
			>
				<!-- card -->
				<div
					class="animate__animated animate__fadeInUp grid-card h-96 border border-white/0 px-8 py-12 delay-75 duration-1000 hover:border-white/60 hover:bg-white/0"
					:class="[
						{ 'bg-opacity/18': (key + 1) % 3 === 0 },
						{ 'bg-opacity/12': (key + 3) % 3 === 1 },
						{ 'bg-opacity/6': (key + 4) % 3 === 1 },
					]"
				>
					<!-- title -->
					<p class="grid-card-title truncate text-3xl font-normal text-white">
						{{ val.title }}
					</p>
					<!-- date & cat -->
					<p class="text-tiny text-main-color-light mt-1">
						{{ val.updateTime }},
						<router-link
							:to="`/archive/${val.postCategoryId}`"
							class="grid-card-tag text-sub-color-light hover:text-sp-color-light"
						>
							{{ val.postCategoryName }}
						</router-link>
					</p>
					<!-- des -->
					<p
						class="grid-des-box text-main-color-light mt-5 font-light"
						height="400px"
					>
						{{ stripMarkdown(String(val.content)) }}
					</p>
					<!-- link -->
					<router-link
						class="btn draw meet grid-card-read mt-10 inline-block"
						:to="`/science/${val.postNanoId}`"
					>
						<span>查看更多</span>
					</router-link>
				</div>
			</div>
		</div>
		<div
			v-show="!postListRef.length"
			class="h-table:w-10/12 h-screen"
		/>
		<div
			v-show="scienceListAPI?.body.data.meta.nextPage"
			class="h-table:w-10/12 text-center"
		>
			<button
				class="btn draw meet mobile:mt-11 h-table:mt-24 mt-6"
				@click.prevent="loadMoreData"
			>
				<span>加載更多</span>
			</button>
		</div>
	</div>
	<Footer />
</template>
