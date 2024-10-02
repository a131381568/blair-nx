<script setup lang="ts">
import { staticData } from '@demo-src/constants/static-data';
import CountInfo from '@demo-src/components/CountInfo.vue';

const routerList = [
	'welcome',
	'apple',
];
</script>

<template>
	<h1>
		Home
	</h1>
	staticData: {{ staticData }}
	<h1>大標題一二三四五</h1>
	<h2>大標題一二三四五</h2>
	<h3>大標題一二三四五</h3>
	<h4>大標題一二三四五</h4>
	<h5>大標題一二三四五</h5>
	<hr>
	<ul>
		<li
			v-for="path in routerList"
			:key="path"
		>
			<router-link
				:to="`/${path}`"
				class="tw-text-[#0000ff] tw-underline"
			>
				Go to {{ path }}
			</router-link>
		</li>
	</ul>

	<hr>
	<CountInfo />
</template>
