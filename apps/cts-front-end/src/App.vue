<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import type { ApiResponse, PageListDto } from '@cts-shared';
import { queryClient } from '@ctsf-src/services/utils/vue-query-client';
import type { vueQueryRes } from '@ctsf-src/services/utils/vue-query-client';
import { useGlobalStore } from '@ctsf-src/stores/global';
import { ModalsContainer } from 'vue-final-modal';
import BgStar from './components/svg/BgStar.vue';
// import Loading from './components/Loading.vue';
// import Enter from './components/Enter.vue';

const globalStore = useGlobalStore();
const { updatePageInfo } = globalStore;

const el = ref<HTMLElement | null>(null);
// const isLoading = ref(false);
// const getFirstEnter = ref(false);

const { data: pageInfoData } = queryClient.getPageInfoList.useQuery<
	vueQueryRes<ApiResponse<PageListDto>>
>(['getPageInfoList'], () => ({}),	{
	staleTime: Infinity,
});

// setTimeout(() => (getFirstEnter.value = true), 200);
// setTimeout(() => (isLoading.value = false), 500);

watchEffect(() => {
	if (pageInfoData.value && pageInfoData.value.status === 200)
		updatePageInfo(pageInfoData.value.body.data);
});
</script>

<template>
	<div
		ref="el"
		class="relative overflow-y-auto overflow-x-hidden bg-admin-featured bg-cover bg-fixed bg-center bg-no-repeat"
	>
		<router-view />
		<div
			class="fixed left-0 top-0 -z-1 h-screen w-screen overflow-hidden bg-[linear-gradient(#16161d,#1f1f3a,#3b2f4a)]"
		>
			<BgStar />
		</div>
		<ModalsContainer />
	</div>
	<!-- <Loading :loading="isLoading" /> -->
	<!-- <Enter v-show="getFirstEnter" /> -->
</template>
