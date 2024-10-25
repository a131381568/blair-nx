<script setup lang="ts">
import { initQueryClient } from '@ts-rest/vue-query';
import { computed, ref } from 'vue';
import { useToggle } from '@vueuse/core';
import type { PaginationDto, PostCategoryFitDto, ScienceItemDto } from '@cts-shared';
import { paginationDefaultData, scienceContract } from '@cts-shared';
// import { getFetchScienceList } from '@ctsf-src/services/modules/scienceModule';
import Header from '../components/Header.vue';
import TitleBox from '../components/TitleBox.vue';
import Footer from '../components/Footer.vue';
// import { useRoute } from 'vue-router';
// getFetchScienceList();

const vueQuery = initQueryClient(scienceContract, {
	baseUrl: 'http://localhost:3000/api',
});

const getScienceDetailFn = async () => {
	const res = await vueQuery.getScienceDetail.useQuery([], () => ({
	// query: {
	// 	page: '1',
	// },
		params: {
			id: 'gXWwimozdU',
		},
	}),	{ staleTime: 1000 });

	const { data, error, isLoading } = res;
	console.log({ data, error, isLoading });
};

const TITLE_INFO = {
	title: '天文科普',
	subTitle: 'Science',
};
const API_RES = {
	success: false,
	data: {
		list: [],
		meta: {
			isFirstPage: false,
			isLastPage: false,
			currentPage: 0,
			previousPage: null,
			nextPage: null,
			pageCount: 0,
			totalCount: 0,
		},
		postCategory: [],
	},
};
// const route = useRoute();
// const routeName = String(route.name);
const getFirstEnter = ref(false);

const changeGridState = ref(false);
const postList = ref<ScienceItemDto[]>([]);
const sciencePageInfo = ref<PaginationDto>(paginationDefaultData);

// 點選篩選列
const selectCat = ref('');
const filterCategories = ref<PostCategoryFitDto[]>([]);
const selectName = computed(() => {
	// const active = store.changeCatName(filterCategories.value, selectCat.value);
	return '';
});

const defaultData = async () => {
	const originalList = postList.value;
	const pushList = originalList.concat(API_RES.data.list);
	// 設置文章區塊
	postList.value = pushList;
	sciencePageInfo.value = API_RES.data.meta;
};

// 切換選單
const [toggleFilterVal, toggleFilter] = useToggle();
const reSearchData = (catId: string) => {
	selectCat.value = catId;
	changeGridState.value = true;
	setTimeout(() => {
		postList.value = [];
		defaultData();
		changeGridState.value = false;
	}, 500);
};
const selectDropCat = (catId: string) => {
	toggleFilterVal.value = false;
	reSearchData(catId);
};
const closeDefaultMenu = () => {
	if (toggleFilterVal.value) {
		toggleFilterVal.value = false;
	}
};

// 取得篩選列
const getArtistsCategories = async () => {
	// const filterBar = API_RES.data.postCategory.filter(item => item.post_category_id !== 'story');
	filterCategories.value = [];
};

getArtistsCategories();

defaultData();

const loadMoreData = () => defaultData();
</script>

<template>
	<Header />
	<div
		class="mobile:pt-32 h-table:flex h-table:px-6 h-table:pt-32 middle-pc:px-20 middle-pc:pt-72 flex-wrap items-start justify-center px-8 pb-32"
		@click.self="closeDefaultMenu()"
	>
		<TitleBox
			:page-title="TITLE_INFO.title"
			:page-sub-title="TITLE_INFO.subTitle"
		/>
		<div
			class="science-filter-bar animate__animated animate__fadeIn laptop:inline-flex middle-pc:mb-20 middle-pc:mt-16 mb-16 mt-6 hidden w-10/12"
			:class="[{ 'animate__delay-4s': getFirstEnter }, { 'animate__delay-1s': !getFirstEnter }]"
		>
			<ul
				v-if="filterCategories.length && filterCategories"
				class="flex"
			>
				<li
					v-for="(val, key) in filterCategories"
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
				{{ selectName }}
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
						v-for="(val, key) in filterCategories"
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
			v-if="postList.length > 0 && postList"
			class="animate__animated animate__fadeInUp mobile:grid-cols-1 mobile:gap-5 h-table:w-10/12 h-table:gap-12 laptop:grid-cols-3 pro-pc:gap-24 grid grid-cols-2 overflow-hidden"
			:class="[{ 'animate__delay-4s': getFirstEnter }, { animate__fadeOut: changeGridState }]"
		>
			<div
				v-for="(val, key) in postList"
				:key="key"
			>
				<!-- card -->
				<div
					class="grid-card animate__animated animate__fadeInUp h-96 border border-white/0 px-8 py-12 delay-75 duration-1000 hover:border-white/60 hover:bg-white/0"
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
						<span
							v-if="!val.postCategoryId"
							class="grid-card-tag grid-card-tag-nothing text-lg"
						>未分類</span>
						<router-link
							v-else
							:to="`/archive/${val.postCategoryId}`"
							class="grid-card-tag text-sub-color-light hover:text-sp-color-light"
						>
							{{ val.postCategoryName }}
						</router-link>
					</p>
					<!-- des -->
					<v-md-preview
						class="grid-des-box text-main-color-light mt-5 font-light"
						:text="val.content"
						height="400px"
					/>

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
			v-show="!postList.length"
			class="h-table:w-10/12 h-screen"
		/>
		<div
			v-show="sciencePageInfo.nextPage && postList.length"
			class="h-table:w-10/12 text-center"
		>
			<button
				class="btn draw meet mobile:mt-11 h-table:mt-24 mt-6"
				@click.prevent="loadMoreData()"
			>
				<span>加載更多</span>
			</button>
		</div>
	</div>
	<Footer />
</template>
