<script setup lang="ts">
import { useHexToRGBA } from '@blair-nx-composables';
import { BlairUi } from '@blair-nx-ui';
import Pass from '@demo-src/components/svg/Pass.vue';

defineProps<{
	title: string;
}>();
</script>

<template>
	<div class="w-full">
		<div class="mx-auto w-full max-w-3xl px-4 pb-12 text-[#374151]">
			<BlairUi title="我是標題" />
			<div
				id="welcome"
				class="mt-10"
			>
				<h1 class="text-5xl font-medium tracking-tight">
					<span class="mb-2 block text-3xl font-light"> Hello there, </span>
					Welcome {{ title }} 👋
				</h1>
				<h2>
					{{ useHexToRGBA("#1D988A") }}
				</h2>
			</div>
			<div
				id="hero"
				class="mt-14 box-border grid grid-cols-[1fr] items-center rounded-3xl border-0 bg-[#143157] text-[#374151]"
			>
				<div class="px-12 py-8 text-white">
					<h2 class="relative text-2xl">
						<Pass class="absolute -left-1 top-0 size-8" />
						<span class="ml-10">You&apos;re up and running</span>
					</h2>
					<a
						class="mt-6 block text-2xl"
						href="https://nx.dev/nx-api/nx/documents/run-many"
					> What&apos;s next? </a>
				</div>
			</div>
		</div>
	</div>
</template>
