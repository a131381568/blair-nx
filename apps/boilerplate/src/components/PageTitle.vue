<script setup>
defineProps({
	title: {
		type: String,
		required: true,
	},
});
</script>

<template>
	<div class="tw-mb-8 tw-mt-9 tw-flex tw-w-full tw-items-center">
		<div class="tw-h-7 tw-w-[0.4375rem] tw-bg-demo-sub" />
		<h2 class="tw-ml-2 tw-text-2xl tw-font-normal tw-leading-8 tw-text-[#333]">
			{{ title }}
		</h2>
		<div class="tw-ml-4 tw-h-1 tw-grow tw-border-y tw-border-solid tw-border-[#ccc]" />
	</div>
</template>
