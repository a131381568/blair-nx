<script setup lang="ts">
defineProps({
	pageTitle: {
		type: String,
		default: '',
	},
	pageSubTitle: {
		type: String,
		default: '',
	},
});
</script>

<template>
	<div class="mb-16 mt-3 w-10/12">
		<h4 class="title-box-tag mb-4 uppercase text-main-color-light">
			{{ pageSubTitle }}
		</h4>
		<h1 class="title-box-text relative -left-2 text-white mobile:text-5xl">
			{{ pageTitle }}
		</h1>
	</div>
</template>
