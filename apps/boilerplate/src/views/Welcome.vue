<script setup lang="ts">
import NxWelcome from '@demo-src/components/NxWelcome.vue';
import { runTests } from '../services/stringMatching';

runTests();
</script>

<template>
	<NxWelcome
		title="boilerplate"
		data-name="sssss"
		limit-value="aaaaaaaaaa"
	/>
	<router-link
		to="/"
		class="block text-center text-[#0000ff] underline"
	>
		Go to Home
	</router-link>
</template>
