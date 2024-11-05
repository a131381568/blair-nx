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
		class="fixed left-0 top-0 z-10001 flex h-screen w-screen items-stretch justify-center bg-main-color-dark"
	/>
	<div
		v-show="!loading"
		class="fixed left-0 top-0 z-10001 flex h-screen w-screen items-stretch justify-center bg-main-color-dark"
	/>
</template>
