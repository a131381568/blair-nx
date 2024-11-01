<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@ctsf-src/stores/global';
import { ADMIN_HOME_SLOGAN } from '@ctsf-src/constants/static-data';
import AdminSidebar from '@ctsf-src/components/AdminSidebar.vue';
import PostManage from '@ctsf-src/components/svg/PostManage.vue';
import FacilityManage from '@ctsf-src/components/svg/FacilityManage.vue';
import StargazingManage from '@ctsf-src/components/svg/StargazingManage.vue';
import Footer from '@ctsf-src/components/Footer.vue';

const globalStore = useGlobalStore();
const { pageInfo: pageInfoData } = storeToRefs(globalStore);
const homeData = computed(() => pageInfoData.value.find(item => item.pageRoute === 'Home'));
</script>

<template>
	<div class="flex">
		<AdminSidebar />
		<div
			class="board-box relative left-7 w-full flex-wrap content-start items-start justify-center px-8 pb-80 mobile:left-11 mobile:w-admin-m-content mobile:pb-48 mobile:pt-32 h-table:flex h-table:px-6 h-table:pt-32 laptop:left-0 laptop:w-4/5 middle-pc:px-20 middle-pc:pt-64"
		>
			<!-- 標題區塊 -->
			<div
				class="board-box-title mb-12 flex w-9/12 justify-between mobile:mx-auto mobile:mb-6 mobile:block mobile:w-11/12"
			>
				<h1 class="relative -top-2 w-3/4 text-white mobile:w-full mobile:text-5xl">
					{{ homeData?.pageTitle }}
				</h1>
				<router-link
					to="/board/slogan"
					class="btn draw meet btn flex h-12 w-2/12 items-center justify-center p-0 text-center text-lg mobile:mt-6 mobile:w-full"
				>
					編輯標語
				</router-link>
			</div>
			<div class="board-box-content table-container w-9/12 mobile:m-auto mobile:w-11/12">
				<div
					class="callout-box relative mb-20 border-l-callout-box-boder border-sub-color-dark bg-main-color-light py-10 pl-10 pr-14 shadow-30-box mobile:p-4"
				>
					<div class="mb-2 text-xl font-bold text-main-color-black">
						{{ homeData?.subPageTitle }}
					</div>
					<p>{{ ADMIN_HOME_SLOGAN }}</p>
					<span
						class="absolute -top-2 right-1 font-serif text-9xl font-light text-sub-color-dark mobile:hidden mobile:text-8xl"
					>”</span>
				</div>
				<div class="infobox-grid flex flex-wrap justify-between middle-mobile:justify-center middle-mobile:text-center">
					<div class="infobox mb-10 flex flex-wrap items-center middle-mobile:justify-center">
						<router-link
							to="/"
							class="infobox-icon group mb-6 mr-6 middle-mobile:mr-0"
						>
							<PostManage class="size-20" />
						</router-link>
						<div class="infobox-text text-main-color-light middle-mobile:w-full">
							<router-link
								class="text-3xl font-semibold transition-all duration-700 hover:text-sp-color-light"
								to="/board/article"
							>
								文章管理
							</router-link>
							<ul class="mt-2">
								<li class="transition-all duration-700 hover:text-sp-color-light">
									<router-link to="/board/categories">
										文章分類
									</router-link>
								</li>
								<li class="transition-all duration-700 hover:text-sp-color-light">
									<router-link to="/board/article">
										文章列表
									</router-link>
								</li>
							</ul>
						</div>
					</div>
					<div class="infobox mb-10 flex flex-wrap items-center middle-mobile:justify-center">
						<router-link
							to="/"
							class="infobox-icon group mb-6 mr-6 middle-mobile:mr-0"
						>
							<FacilityManage class="size-20" />
						</router-link>
						<div class="infobox-text text-main-color-light middle-mobile:w-full">
							<router-link
								class="text-3xl font-semibold transition-all duration-700 hover:text-sp-color-light"
								to="/board/organization"
							>
								設施管理
							</router-link>
							<ul class="mt-2">
								<li class="transition-all duration-700 hover:text-sp-color-light">
									<router-link to="/board/organization">
										天文機構
									</router-link>
								</li>
								<li class="transition-all duration-700 hover:text-sp-color-light">
									<router-link to="/board/observatories">
										天文台
									</router-link>
								</li>
							</ul>
						</div>
					</div>
					<div class="infobox mb-10 flex flex-wrap items-center middle-mobile:justify-center">
						<router-link
							to="/board/stargazer"
							class="infobox-icon group mb-6 mr-6 middle-mobile:mr-0"
						>
							<StargazingManage class="size-20" />
						</router-link>
						<div class="infobox-text text-main-color-light middle-mobile:w-full">
							<router-link
								class="text-3xl font-semibold transition-all duration-700 hover:text-sp-color-light"
								to="/board/stargazer"
							>
								觀星管理
							</router-link>
							<ul class="mt-2">
								<li class="transition-all duration-700 hover:text-sp-color-light">
									<router-link to="/board/stargazer">
										觀星列表
									</router-link>
								</li>
								<li class="transition-all duration-700 hover:text-sp-color-light">
									<router-link to="/board/stargazer/add">
										新增地點
									</router-link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<Footer class="absolute bottom-0 mobile:left-0" />
		</div>
	</div>
</template>
