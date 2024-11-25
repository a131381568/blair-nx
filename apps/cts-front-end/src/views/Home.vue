<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@ctsf-src/stores/global';
import { CLIENT_HOME_OFFLINE_DATA } from '@ctsf-src/constants/static-data';
import Header from '../components/Header.vue';

const globalStore = useGlobalStore();
const { pageInfo: pageInfoData } = storeToRefs(globalStore);

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
		class="filter-bg-opacity-20 w-table:filter-bg-opacity-50 laptop:filter-bg-opacity-none animate-fadeInRightBig bg-astrolabe animation-delay-1000 w-table:bg-contain absolute right-0 top-0 z-0 mx-auto h-screen w-full bg-cover bg-right-bottom bg-no-repeat"
	/>
	<div class="z-10 mx-auto h-screen w-full">
		<div class="flex h-full items-stretch">
			<div class="h-16 w-1/12 flex-none" />
			<div class="size-auto grow self-center text-white">
				<h1
					class="animate-fadeInLeft mobile:capitalize middle-pc:text-8xl large-pc:text-9xl font-serif tracking-normal"
					data-testid="home__title"
				>
					<span class="text-sp-color-light middle-pc:text-8xl large-pc:text-9xl font-normal tracking-normal">{{
						homeData.pageTitle[0]
					}}</span>
					{{ homeData.pageTitle[1] }} {{ homeData.pageTitle[2] }}
				</h1>
				<h4
					class="animate-fadeIn text-main-color-light animation-delay-1000 mobile:text-lg h-table:w-380px h-table:text-lg middle-pc:w-auto large-pc:mt-10 large-pc:text-2xl mt-6"
					data-testid="home__subTitle"
					v-html="homeData.subPageTitle"
				/>
				<router-link
					class="home-read-more btn draw meet animate-flipInX animation-delay-2000 large-pc:mt-12 mt-8 inline-block"
					to="/science"
					data-testid="ctsm__readmore__btn"
				>
					<span>查看更多</span>
				</router-link>
			</div>
			<div class="h-16 w-1/12 flex-none" />
		</div>
	</div>
</template>
