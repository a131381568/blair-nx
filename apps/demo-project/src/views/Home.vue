<script setup lang="ts">
import { staticData } from '@/constants/static-data';
import CountInfo from '@/components/CountInfo.vue';
</script>

<template>
	<h1>Home</h1>
	staticData: {{ staticData }}
	<hr>
	<router-link
		to="/welcome"
		class="tw-text-[#0000ff] tw-underline"
	>
		Go to Welcome
	</router-link>
	<hr>
	<CountInfo />
</template>
