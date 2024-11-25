<script setup lang="ts">
defineProps({
	pageTitle: {
		type: String,
		default: '',
	},
	pageSubTitle: {
		type: String,
		default: '',
	},
});
</script>

<template>
	<div class="mb-16 mt-3 w-10/12">
		<h4
			class="title-box-tag text-main-color-light mb-4 uppercase"
			data-testid="pageSubTitle"
		>
			{{ pageSubTitle }}
		</h4>
		<h1
			class="title-box-text mobile:text-5xl relative -left-2 text-white"
			data-testid="pageTitle"
		>
			{{ pageTitle }}
		</h1>
	</div>
</template>
