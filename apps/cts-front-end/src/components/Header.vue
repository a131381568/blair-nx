<script setup lang="ts">
import { computed, ref } from 'vue';
import HeaderLogo from './svg/HeaderLogo.vue';

const menuList = ref([
	{
		title: '關於我們',
		enTitle: 'About',
		path: '/about',
		img: '/img/menu-bg-01.jpg',
	},
	{
		title: '天文科普',
		enTitle: 'Science',
		path: '/science',
		img: '/img/menu-bg-02.jpg',
	},
	{
		title: '星星物語',
		enTitle: 'Story',
		path: '/story',
		img: '/img/menu-bg-03.jpg',
	},
	{
		title: '天文設施',
		enTitle: 'Facilities',
		path: '/facilities',
		img: '/img/menu-bg-04.jpg',
	},
	{
		title: '觀星地點',
		enTitle: 'Stargazing',
		path: '/stargazing',
		img: '/img/menu-bg-05.jpg',
	},
	{
		title: '搜尋頁面',
		enTitle: 'Search',
		path: '/search',
		img: '/img/menu-bg-06.jpg',
	},
]);
const modal = ref(false);
const getHeaderState = ref(true);
const fastHide = ref(true);
const modalShow = ref(false);

const activeTopic = computed(() => ({
	title: '關於我們',
	enTitle: 'About',
	path: '/about',
	img: '/img/menu-bg-01.jpg',
}));

const toggleModal = () => {
	modalShow.value = !modalShow.value;
	modal.value = !modal.value;
};
</script>

<template>
	<div class="fixed z-10000 mt-32 flex flex-col items-center justify-center">
		<div class="flex flex-col">
			<nav
				class="fixed inset-x-0 top-0 flex w-full justify-between px-9 py-5 delay-75 duration-1000 hover:opacity-100"
				:class="[{ 'opacity-30': getHeaderState && modal }]"
			>
				<div class="header-logo flex items-center hover:animate-pulse">
					<router-link
						to="/"
						class="cursor-pointer"
					>
						<HeaderLogo
							class="header-svg-obj h-auto w-64px mobile:w-9"
							:class="{ active: modal }"
						/>
					</router-link>
				</div>
				<div class="flex items-end space-x-5 self-center hover:animate-pulse">
					<div
						class="menu-toggle-btn bars group inline-block cursor-pointer text-base"
						:class="{ active: modal === true }"
						@click.prevent="toggleModal"
					>
						<div
							class="top-bar mb-0-4em h-0-2em w-1-8em rounded-2em bg-white transition-all duration-300 ease-in-out group-hover:bg-sp-color-light"
							:class="[
								{ 'bg-main-color-dark': modal === true },
								{ 'transform-gpu': modal === true },
								{ 'rotate-225': modal === true },
								{ 'translate-y-0-8em ': modal === true },
							]"
						/>
						<div
							class="middle-bar mb-0-4em h-0-2em w-1-8em rounded-2em bg-white transition-all duration-300 ease-in-out group-hover:bg-sp-color-light"
							:class="[
								{ 'bg-main-color-dark': modal === true },
								{ 'transform-gpu': modal === true },
								{ 'opacity-0': modal === true },
								{ 'scale-0': modal === true },
							]"
						/>
						<div
							class="bottom-bar mb-0-4em h-0-2em w-1-8em rounded-2em bg-white transition-all duration-300 ease-in-out group-hover:bg-sp-color-light"
							:class="[
								{ 'bg-main-color-dark': modal === true },
								{ 'transform-gpu': modal === true },
								{ '-rotate-225': modal === true },
								{ '-translate-y-0-35em ': modal === true },
							]"
						/>
					</div>
				</div>
			</nav>
		</div>
	</div>
	<div
		v-if="modalShow"
		id="modal"
		class="modal-bg fixed left-0 top-0 size-full overflow-auto bg-secondary"
		:class="[
			{ 'opacity-100': modal === true },
			{ 'z-9999': modal === true },
			{ 'opacity-0': fastHide === true },
		]"
	>
		<div class="modal-content relative m-auto size-full overflow-hidden screens-h-900:overflow-y-auto">
			<div
				class="grid h-screen py-20 mobile:grid-cols-none mobile:px-9 h-table:grid-cols-none h-table:px-20 h-table:pb-10 h-table:pt-36 w-table:grid-cols-2 laptop:px-40"
			>
				<ul class="menu-grid-ul grid grid-flow-row auto-rows-max gap-7 w-table:gap-9 large-pc:auto-rows-auto large-pc:gap-12 screens-h-900:auto-rows-max">
					<li
						v-for="({ path, title, enTitle }, index) in menuList"
						:key="index"
					>
						<router-link
							:to="path"
							:title="title"
							class="font-serif tracking-wide-menu text-main-color-dark duration-1000 hover:text-sp-color-light mobile:text-5xl h-table:text-8xl w-table:text-7xl large-pc:text-menu-title screens-h-900:text-5xl"
						>
							{{ enTitle }}
						</router-link>
					</li>
				</ul>
				<div
					class="relative -top-4 bg-cover bg-center bg-no-repeat transition-all duration-[400ms] mobile:hidden mobile:text-5xl h-table:hidden w-table:block large-pc:mb-16"
					:class="[{ 'bg-menu-about': activeTopic.enTitle === 'About' }]"
				>
					<router-link
						:to="activeTopic.path"
						class="text-shadow absolute bottom-12 right-12 text-3xl text-white duration-1000 hover:text-sub-color-light"
					>
						{{ activeTopic.title }}
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>
