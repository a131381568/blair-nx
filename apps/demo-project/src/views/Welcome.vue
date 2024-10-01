<script setup lang="ts">
import NxWelcome from '@/components/NxWelcome.vue';
</script>

<template>
	<NxWelcome
		title="demo-project"
		data-name="sssss"
		limit-value="aaaaaaaaaa"
	/>
	<router-link
		to="/"
		class="tw-block tw-text-center tw-text-[#0000ff] tw-underline"
	>
		Go to Home
	</router-link>
</template>
