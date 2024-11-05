<script setup>
import { ref } from 'vue';
import BgStar from './components/svg/BgStar.vue';
import Enter from './components/Enter.vue';

defineProps({
	defaultLoading: {
		type: Boolean,
		default: false,
	},
});

const fakeLoading = ref(true);
// const isFirstEnter = ref(true);

setTimeout(() => {
	fakeLoading.value = false;
}, 3000);
</script>

<template>
	<router-view v-slot="{ Component, route }">
		<transition
			name="fade"
			mode="in-out"
		>
			<template v-if="fakeLoading">
				<Enter v-show="fakeLoading" />
				<!-- <div class="flex h-screen w-full items-center justify-center bg-main-color-black">
					<span class="animate-firstEnter box-border inline size-40 rounded-full bg-main-color-dark" />
				</div> -->
			</template>
			<template v-else>
				<div
					class="relative overflow-y-auto overflow-x-hidden bg-cover bg-fixed bg-center bg-no-repeat"
					:class="{
						'bg-admin-featured': route.meta.manage,

					}"
				>
					<component
						:is="Component"
						:key="route.fullPath"
					/>
					<div
						class="fixed left-0 top-0 -z-1 h-screen w-screen overflow-hidden bg-[linear-gradient(#16161d,#1f1f3a,#3b2f4a)]"
					>
						<BgStar />
					</div>
				</div>
			</template>
		</transition>
	</router-view>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 1s;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
	opacity: 1;
}
</style>
