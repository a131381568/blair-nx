<script setup lang="ts">
import EnterStar from './svg/EnterStar.vue';
</script>

<template>
	<div
		class="stop-star-wrapper pointer-events-none fixed left-0 top-0 z-10001 flex size-full items-stretch justify-center"
	>
		<div class="inline-block self-center">
			<EnterStar class="enter-svg-obj svg-obj mx-auto h-auto w-[130px]" />
			<div
				class="stop-star-subtitle mt-4 font-serif text-3xl tracking-wider text-main-color-light"
			>
				Catch the stars
			</div>
		</div>
	</div>
</template>
