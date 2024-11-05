<script setup lang="ts">
import Header from '../components/Header.vue';
import TitleBox from '../components/TitleBox.vue';
import Footer from '../components/Footer.vue';
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
				class="btn draw meet inline-block"
			>
				<span>返回首頁</span>
			</router-link>
		</div>
	</div>
	<div class="oops-before absolute bottom-24 left-0 inline-block w-full p-10 text-right mobile:p-4 screens-h-500:relative">
		<div class="inline-block font-serif text-20vw text-main-color-light opacity-30">
			OOPS!
		</div>
	</div>
	<Footer class="absolute bottom-0 left-0 screens-h-500:relative" />
</template>
