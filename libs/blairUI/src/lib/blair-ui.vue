<script setup lang="ts">
defineProps({
	title: String,
});
</script>

<template>
	<p style="background-color: darkseagreen;">
		Welcome to BlairUi! {{ title }}
	</p>
</template>
