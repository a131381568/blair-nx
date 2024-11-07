<script setup lang="ts">
import { computed, defineAsyncComponent, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useGlobalStore } from '@ctsf-src/stores/global';
import { pageQuery } from '@ctsf-src/services/apis/pageApi';
import { ModalsContainer } from 'vue-final-modal';

const ClientLayout = defineAsyncComponent(() => import('@ctsf-src/components/layout/ClientLayout.vue'));
const AdminLayout = defineAsyncComponent(() => import('@ctsf-src/components/layout/AdminLayout.vue'));

const globalStore = useGlobalStore();
const { updatePageInfo } = globalStore;
const { data: pageInfoData, refetch } = pageQuery();

const route = useRoute();
const switchLayout = computed(() => route.meta.manage ? AdminLayout : ClientLayout);

refetch();

watchEffect(() => {
	if (pageInfoData.value && pageInfoData.value.status === 200)
		updatePageInfo(pageInfoData.value.body.data);
});
</script>

<template>
	<component :is="switchLayout" />
	<ModalsContainer />
</template>
