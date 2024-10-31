<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@ctsf-src/stores/global';
import { CLIENT_HOME_OFFLINE_DATA } from '@ctsf-src/constants/static-data';
import Header from '../components/Header.vue';

const globalStore = useGlobalStore();
const { pageInfo: pageInfoData } = storeToRefs(globalStore);
const getFirstEnter = ref(true);

const homeData = computed(() => {
	const homeItem = pageInfoData.value.find(item => item.pageRoute === 'Home');
	if (homeItem) {
		return {
			...homeItem,
			pageTitle: homeItem.pageTitle ? homeItem.pageTitle.split(' ') : [],
		};
	}
	return CLIENT_HOME_OFFLINE_DATA;
});
</script>

<template>
	<Header />
	<div
		class="filter-bg-opacity-20 animate__animated animate__fadeInRightBig w-table:filter-bg-opacity-50 laptop:filter-bg-opacity-none absolute right-0 top-0 z-0 mx-auto h-screen w-full bg-astrolabe bg-cover bg-right-bottom bg-no-repeat w-table:bg-contain"
		:class="[{ 'animate__delay-5s': getFirstEnter === true }, { 'animate__delay-3s': getFirstEnter === false }]"
	/>
	<div class="z-10 mx-auto h-screen w-full">
		<div class="flex h-full items-stretch">
			<div class="h-16 w-1/12 flex-none">
				<!-- This item will not grow -->
			</div>
			<div class="size-auto grow self-center text-white">
				<h1
					class="animate__animated animate__fadeInLeft font-serif tracking-normal mobile:capitalize middle-pc:text-8xl large-pc:text-9xl"
					:class="[{ 'animate__delay-3s': getFirstEnter === true }, { 'animate__delay-1s': getFirstEnter === false }]"
				>
					<span class="font-normal tracking-normal text-sp-color-light middle-pc:text-8xl large-pc:text-9xl">{{
						homeData.pageTitle[0]
					}}</span>
					{{ homeData.pageTitle[1] }} {{ homeData.pageTitle[2] }}
				</h1>
				<h4
					class="animate__animated animate__fadeIn mt-6 text-main-color-light mobile:text-lg h-table:w-380px h-table:text-lg middle-pc:w-auto large-pc:mt-10 large-pc:text-2xl"
					:class="[{ 'animate__delay-4s': getFirstEnter === true }, { 'animate__delay-2s': getFirstEnter === false }]"
					v-html="homeData.subPageTitle"
				/>
				<router-link
					class="home-read-more btn draw meet animate__animated animate__flipInX mt-8 inline-block large-pc:mt-12"
					:class="[{ 'animate__delay-5s': getFirstEnter === true }, { 'animate__delay-3s': getFirstEnter === false }]"
					to="/science"
				>
					<span>查看更多</span>
				</router-link>
			</div>
			<div class="h-16 w-1/12 flex-none">
				<!-- This item will not grow -->
			</div>
		</div>
	</div>
</template>
