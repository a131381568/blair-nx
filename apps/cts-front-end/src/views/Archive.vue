<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { ApiResponse, PaginationDto, ScienceListDto, ScienceListWithPagiDto } from '@cts-shared';
import type { vueQueryRes } from '@ctsf-src/services/utils/vue-query-client';
import { paginationDefaultData } from '@cts-shared';
import { STALE_TIME, queryClient } from '@ctsf-src/services/utils/vue-query-client';
import { stripMarkdown } from '@ctsf-src/helper/markDown';
import { linkNotFoundPage } from '@ctsf-src/helper/customCtsRoute';
import Header from '../components/Header.vue';
import TitleBox from '../components/TitleBox.vue';
import Footer from '../components/Footer.vue';

const router = useRouter();
const route = useRoute();
const postListRef = ref<ScienceListDto>([]);
const pagiMeta = ref<PaginationDto>(paginationDefaultData);
const currentPage = ref(1);
const tagid = computed(() => String(route.params.tagid));
const archiveMeta = computed(() => ({
	pageTitle: `標籤：${tagid.value}`,
	subPageTitle: 'tag',
	pageRoute: 'Archive',
}));

const goToNotFound = () => linkNotFoundPage(router);

const { data: searchTagQueryData } = queryClient.getScienceList.useQuery<
	vueQueryRes<ApiResponse<ScienceListWithPagiDto>>
>(['searchTagQuery', currentPage, tagid], () => ({
	query: {
		page: String(currentPage.value),
		category: tagid.value,
		limit: '7',
	},
}),	{
	staleTime: STALE_TIME,
	retry: false,
	onError: (err) => {
		(err.status >= 400) && goToNotFound();
	},
});

const loadMoreData = () => (currentPage.value += 1);

watchEffect(() => {
	if (searchTagQueryData.value?.status === 200) {
		(!searchTagQueryData.value.body.data.list.length) && goToNotFound();

		postListRef.value = [...postListRef.value, ...searchTagQueryData.value.body.data.list] as ScienceListDto;
		pagiMeta.value = searchTagQueryData.value.body.data.meta;
	}
});
</script>

<template>
	<Header />
	<div class="flex-wrap items-start justify-center px-8 pb-32 mobile:pt-32 h-table:flex h-table:px-6 h-table:pt-32 middle-pc:px-20 middle-pc:pt-72">
		<TitleBox
			:page-title="archiveMeta.pageTitle"
			:page-sub-title="archiveMeta.subPageTitle"
		/>
		<div class="mt-20 hidden h-full animate-flipInY w-table:block w-table:w-5/12 middle-pc:w-4/12">
			<img
				class="h-table:w-4/5 laptop:w-auto"
				src="/img/bg-achive.png"
			>
		</div>
		<!-- post grid -->
		<div class="search-items grid w-10/12 grid-cols-1 overflow-hidden mobile:w-full w-table:mt-36 w-table:w-5/12 middle-pc:w-6/12">
			<div
				v-for="(val, key) in postListRef"
				:key="key"
				class="search-item animate-fadeInUp"
			>
				<router-link :to="`/science/${val.postNanoId}`">
					<!-- card -->
					<div class="mb-1 border border-white/0 bg-white/6 p-6 delay-75 duration-1000 hover:border-white/60 hover:bg-white/0 laptop:px-16 laptop:py-8">
						<p class="text-xl font-normal text-white h-table:text-3xl">
							{{ val.title }}
						</p>
						<p class="mt-1 truncate text-lg font-light text-main-color-light h-table:mt-5">
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
					class="btn draw meet mobile:mt-10 h-table:mt-12 middle-pc:mt-16"
					@click.prevent="loadMoreData"
				>
					<span>加載更多</span>
				</button>
			</div>
		</div>
	</div>
	<Footer />
</template>
