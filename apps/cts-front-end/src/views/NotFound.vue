<script setup lang="ts">
import { ref } from 'vue';
import Header from '../components/Header.vue';
import TitleBox from '../components/TitleBox.vue';
import Footer from '../components/Footer.vue';

const getFirstEnter = ref(false);
</script>

<template>
	<Header />
	<div class="min-h-dvh flex-wrap items-start justify-center px-8 pb-32 mobile:pt-32 h-table:flex h-table:px-6 h-table:pt-32 middle-pc:px-20 middle-pc:pt-72">
		<TitleBox
			page-title="找不到網頁"
			page-sub-title="page not found"
		/>
		<div class="w-10/12">
			<router-link
				to="/"
				class="btn draw meet animate__animated animate__flipInX inline-block"
				:class="[{ 'animate__delay-4s': getFirstEnter }, { 'animate__delay-1s': !getFirstEnter }]"
			>
				<span>返回首頁</span>
			</router-link>
		</div>
	</div>
	<div
		class="oops-before animate__animated animate__fadeIn absolute bottom-24 left-0 inline-block w-full p-10 text-right mobile:p-4 screens-h-500:relative"
		:class="[{ 'animate__delay-4s': getFirstEnter }, { 'animate__delay-1s': !getFirstEnter }]"
	>
		<div class="inline-block font-serif text-20vw text-main-color-light opacity-30">
			OOPS!
		</div>
	</div>
	<Footer
		class="animate__animated animate__fadeIn absolute bottom-0 left-0 screens-h-500:relative"
		:class="[{ 'animate__delay-5s': getFirstEnter }, { 'animate__delay-2s': !getFirstEnter }]"
	/>
</template>
