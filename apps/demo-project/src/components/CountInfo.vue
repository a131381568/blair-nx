<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/stores/global';

const globalStore = useGlobalStore();
const { isLoading, count } = storeToRefs(globalStore);
const { openLoading, closeLoading, increment, resetCount } = globalStore;
</script>

<template>
	<ul>
		<li>isLoading: {{ isLoading }}</li>
		<li @click="openLoading">
			open
		</li>
		<li @click="closeLoading">
			close
		</li>
	</ul>
	<hr>
	<ul>
		<li>
			count: <span data-name="countState">{{ count }}</span>
		</li>
		<button
			data-name="addCountBtn"
			@click="increment"
		>
			add count
		</button>
		/
		<button
			data-name="resetCountBtn"
			@click="resetCount"
		>
			reset count
		</button>
	</ul>
</template>
