<script setup lang="ts">
import {
	// computed,
	// ref,
	watchEffect,
} from 'vue';
// import { useRoute } from 'vue-router';
import { useGlobalStore } from '@ctsf-src/stores/global';
import { pageQuery } from '@ctsf-src/services/apis/pageApi';
import { ModalsContainer } from 'vue-final-modal';
// import BgStar from './components/svg/BgStar.vue';
// import Loading from './components/Loading.vue';
// import Enter from './components/Enter.vue';
import AppContainer from './AppContainer.vue';

const globalStore = useGlobalStore();
const { updatePageInfo } = globalStore;
const { data: pageInfoData, refetch } = pageQuery();
// const el = ref<HTMLElement | null>(null);

// const route = useRoute();
// const routManage = computed(() => route.meta.manage);

refetch();
// const isLoading = ref(false);
// const getFirstEnter = ref(false);

// setTimeout(() => (getFirstEnter.value = true), 5000);
// setTimeout(() => (isLoading.value = false), 500);

watchEffect(() => {
	if (pageInfoData.value && pageInfoData.value.status === 200)
		updatePageInfo(pageInfoData.value.body.data);
});
</script>

<template>
	<AppContainer />
	<ModalsContainer />
	<!-- <Enter v-show="getFirstEnter" /> -->
</template>
