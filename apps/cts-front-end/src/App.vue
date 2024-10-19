<script setup lang="ts">
import { ref } from 'vue';
import BgStar from './components/svg/BgStar.vue';
import Loading from './components/Loading.vue';
import Enter from './components/Enter.vue';

const el = ref<HTMLElement | null>(null);
const isLoading = ref(false);
const getFirstEnter = ref(true);
// const routManage = computed(() => route.meta.manage);
// const routTopTitle = computed(() => `Catch The Stars — Home`);
// const routTitle = computed(() => route.meta.title);
// const { arrivedState } = useScroll(el);
// const arrivedStateVal = computed(() => {
// 	store.updateHeaderState(arrivedState.top);
// 	return arrivedState.top;
// });

setTimeout(() => (getFirstEnter.value = false), 4000);
</script>

<template>
	<div
		ref="el"
		class="relative overflow-y-auto overflow-x-hidden bg-admin-featured bg-cover bg-center bg-no-repeat"
	>
		<router-view />
		<div
			class="bg-[linear-gradient(#16161d_#1f1f3a_#3b2f4a] fixed left-0 top-0 -z-1 h-screen w-screen overflow-hidden"
		>
			<BgStar />
		</div>
	</div>
	<Loading :loading="isLoading" />
	<transition>
		<Enter v-show="getFirstEnter" />
	</transition>
</template>
