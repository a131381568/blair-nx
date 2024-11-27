<script setup>
defineProps({
	title: {
		type: String,
		required: true,
	},
});
</script>

<template>
	<div class="mb-8 mt-9 flex w-full items-center">
		<div class="h-7 w-[0.4375rem] bg-demo-sub" />
		<h2 class="ml-2 text-2xl font-normal leading-8 text-[#333]">
			{{ title }}
		</h2>
		<div class="ml-4 h-1 grow border-y border-solid border-[#ccc]" />
	</div>
</template>
