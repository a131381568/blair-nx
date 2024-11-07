<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const routManage = computed(() => route.meta.manage);
const thisYear = new Date().getFullYear();
</script>

<template>
	<div
		class="w-full animate-fadeIn border-main-color-light py-6 text-center text-tiny tracking-wider text-main-color-light animation-delay-2000"
		:class="{ 'border-t': !routManage }"
	>
		Copyright © {{ thisYear }} STARGAZER. All rights reserved.
	</div>
</template>
