<script setup lang="ts">
import { ref } from 'vue';

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

const getFirstEnter = ref(true);
</script>

<template>
	<div
		class="animate__animated animate__fadeIn mb-16 mt-3 w-10/12"
		:class="[{ 'animate__delay-4s': getFirstEnter }, { 'animate__delay-1s': !getFirstEnter }]"
	>
		<h4 class="title-box-tag mb-4 uppercase text-main-color-light">
			{{ pageSubTitle }}
		</h4>
		<h1 class="title-box-text relative -left-2 text-white mobile:text-5xl">
			{{ pageTitle }}
		</h1>
	</div>
</template>
