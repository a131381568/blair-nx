<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useGlobalStore } from '@ctsf-src/stores/global';
import { pageQuery } from '@ctsf-src/services/apis/pageApi';
import { ModalsContainer } from 'vue-final-modal';
import BgStar from './components/svg/BgStar.vue';
// import Loading from './components/Loading.vue';
// import Enter from './components/Enter.vue';

const globalStore = useGlobalStore();
const { updatePageInfo } = globalStore;
const { data: pageInfoData, refetch } = pageQuery();
const el = ref<HTMLElement | null>(null);

const route = useRoute();
const routManage = computed(() => route.meta.manage);

refetch();
// const isLoading = ref(false);
// const getFirstEnter = ref(false);

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
		class="relative overflow-y-auto overflow-x-hidden bg-cover bg-fixed bg-center bg-no-repeat"
		:class="{ 'bg-admin-featured': routManage }"
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
