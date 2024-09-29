<script setup lang="ts">
import { useHexToRGBA } from '@blair-nx/blairComposables';
import { BlairUi } from '@blair-nx/blairUI';
import Pass from '@/components/svg/Pass.vue';

defineProps<{
	title: string;
}>();
</script>

<template>
	<div class="tw-w-full">
		<div class="tw-mx-auto tw-w-full tw-max-w-3xl tw-px-4 tw-pb-12 tw-text-[#374151]">
			<BlairUi title="我是標題" />
			<div
				id="welcome"
				class="tw-mt-10"
			>
				<h1 class="tw-text-5xl tw-font-medium tw-tracking-tight">
					<span class="tw-mb-2 tw-block tw-text-3xl tw-font-light"> Hello there, </span>
					Welcome {{ title }} 👋
				</h1>
				<h2>
					{{ useHexToRGBA("#1D988A") }}
				</h2>
			</div>
			<div
				id="hero"
				class="tw-mt-14 tw-box-border tw-grid tw-grid-cols-[1fr] tw-items-center tw-rounded-3xl tw-border-0 tw-bg-[#143157] tw-text-[#374151]"
			>
				<div class="tw-px-12 tw-py-8 tw-text-[#fff]">
					<h2 class="tw-relative tw-text-2xl">
						<Pass class="tw-absolute -tw-left-1 tw-top-0 tw-h-8 tw-w-8" />
						<span class="tw-ml-10">You&apos;re up and running</span>
					</h2>
					<a
						class="tw-mt-6 tw-block tw-text-2xl"
						href="https://nx.dev/nx-api/nx/documents/run-many"
					> What&apos;s next? </a>
				</div>
			</div>
		</div>
	</div>
</template>
