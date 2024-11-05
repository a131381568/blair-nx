<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useIntersectionObserver, useParallax } from '@vueuse/core';
import { defaultAboutInfoData } from '@cts-shared';
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@ctsf-src/stores/global';
import { aboutQuery } from '@ctsf-src/services/apis/aboutApi';
import Header from '../components/Header.vue';
import TitleBox from '../components/TitleBox.vue';
import Footer from '../components/Footer.vue';

const route = useRoute();
const globalStore = useGlobalStore();
const { currentPageMeta } = storeToRefs(globalStore);
const { data: aboutAPI } = aboutQuery();

const photo = ref(null);
const { tilt, roll } = useParallax(photo);
const block_black_target = ref(null);
const block_black_isVisible = ref(false);
const { stop } = useIntersectionObserver(
	block_black_target,
	([{ isIntersecting }]) => {
		block_black_isVisible.value = isIntersecting;
		if (isIntersecting) {
			stop();
		}
	},
);

const aboutData = computed(() => {
	if (aboutAPI.value?.status === 200)
		return aboutAPI.value.body.data;
	return defaultAboutInfoData;
});

const aboutMeta = computed(() => currentPageMeta.value(String(route.name)));
</script>

<template>
	<Header />
	<div
		class="flex-wrap items-start justify-center px-8 pb-32 mobile:pt-32 h-table:flex h-table:px-6 h-table:pt-32 middle-pc:px-20 middle-pc:pt-72"
	>
		<TitleBox
			:page-title="aboutMeta.pageTitle"
			:page-sub-title="aboutMeta.subPageTitle"
		/>
		<div class="relative h-full overflow-hidden h-table:w-10/12 laptop:w-5/12">
			<img
				class="absolute z-30 w-auto object-center transition-all ease-out"
				src="/img/kenny-logo.png"
				:style="{
					transform: `rotateX(${roll * 30}deg) rotateY(${tilt * 30}deg)`,
					left: 'calc(50% - 130px)',
					top: 'calc(50% - 115px)',
				}"
			>
			<div class="absolute left-0 top-0 z-20 size-full bg-gradient-radial from-white" />
			<img
				ref="photo"
				class="z-10 w-auto bg-white object-center transition-all ease-out"
				src="/img/about-bg-sp.jpg"
				:style="{
					transform: `rotateX(${roll * 15}deg) rotateY(${tilt * 15}deg) scale(1.05)`,
				}"
			>
		</div>
		<div class="mt-10 h-table:w-10/12 laptop:mt-0 laptop:w-5/12 laptop:pl-10 middle-pc:pl-24">
			<div
				v-show="aboutData.slogan"
				class="callout-box relative mb-8 border-l-callout-box-boder border-sub-color-dark bg-main-color-light py-10 pl-10 pr-14 mobile:py-4 mobile:pl-4"
			>
				<div
					class="about-slogan font-bold text-main-color-black"
					v-html="aboutData.slogan"
				/>
				<span
					class="absolute -top-2 right-1 font-serif text-9xl font-light text-sub-color-dark mobile:text-8xl"
				>”</span>
			</div>
			<div
				v-show="aboutData.philosophy"
				class="text-main-color-light"
			>
				<v-md-preview
					class="markdown-body about-philosophy"
					:text="aboutData.philosophy"
				/>
			</div>
		</div>
	</div>
	<div
		v-show="aboutData.quote"
		class="flex-wrap items-start justify-center bg-main-color-black px-4 py-24 text-main-color-light mobile:px-8 h-table:flex"
	>
		<div
			ref="block_black_target"
			class="grid text-center h-table:w-10/12 h-table:grid-cols-3 laptop:grid-cols-none"
		>
			<img
				class="mx-auto mb-10"
				src="/svg/hand.svg"
			>
			<v-md-preview
				class="markdown-body about-quote text-left h-table:col-span-2 laptop:col-auto laptop:text-center"
				:text="aboutData.quote"
			/>
		</div>
	</div>
	<div
		v-show="aboutData.epilogue"
		class="flex-wrap items-start justify-center bg-white bg-about-writing bg-right-bottom bg-no-repeat px-4 pb-52 pt-32 mobile:bg-contain mobile:px-8 h-table:flex h-table:bg-auto-500 h-table:px-6 middle-pc:bg-contain middle-pc:px-20"
	>
		<div class="pb-320px text-left text-main-color-black h-table:w-10/12 laptop:w-5/12 laptop:pb-0 middle-pc:w-7/12">
			<v-md-preview
				class="markdown-body about-epilogue"
				:text="aboutData.epilogue"
			/>
		</div>
		<div class="h-table:w-5/12 middle-pc:w-3/12" />
	</div>
	<Footer />
</template>
