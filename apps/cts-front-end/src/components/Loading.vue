<script setup lang="ts">
defineProps({
	loading: {
		type: Boolean,
		default: true,
	},
});
</script>

<template>
	<div
		v-show="loading"
		class="animate__animated animate__fadeInRight animate__faster fixed left-0 top-0 z-10001 flex h-screen w-screen items-stretch justify-center bg-main-color-dark"
	/>
	<!-- <div
		v-show="!getLoading"
		class="animate__animated animate__fadeOutLeft animate__delay-0.7s fixed left-0 top-0 z-10001 flex h-screen w-screen items-stretch justify-center bg-main-color-dark"
	/> -->
</template>
