<script setup lang="ts">
import { ref } from 'vue';
import BgStar from './components/svg/BgStar.vue';
import Loading from './components/Loading.vue';
import Enter from './components/Enter.vue';

const el = ref<HTMLElement | null>(null);
const isLoading = ref(true);
const getFirstEnter = ref(false);

setTimeout(() => (getFirstEnter.value = true), 200);
setTimeout(() => (isLoading.value = false), 500);
</script>

<template>
	<div
		ref="el"
		class="relative overflow-y-auto overflow-x-hidden bg-admin-featured bg-cover bg-center bg-no-repeat"
	>
		<router-view />
		<div
			class="fixed left-0 top-0 -z-1 h-screen w-screen overflow-hidden bg-[linear-gradient(#16161d,#1f1f3a,#3b2f4a)]"
		>
			<BgStar />
		</div>
	</div>
	<Loading :loading="isLoading" />
	<!-- <Enter v-show="getFirstEnter" /> -->
</template>
