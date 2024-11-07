<script setup lang="ts">
import EnterStar from './svg/EnterStar.vue';
</script>

<template>
	<div
		class="fixed left-0 top-0 z-10001 flex size-full animate-bgEnterAnim items-stretch justify-center"
	>
		<div class="inline-block self-center">
			<EnterStar class="enter-svg-obj svg-obj mx-auto h-auto w-[130px] animate-rubberBand animation-delay-500" />
			<div class="stop-star-subtitle mt-4 animate-[bounceOnce_1s_ease-out] font-serif text-3xl tracking-wider text-main-color-light animation-delay-1500">
				Catch the stars
			</div>
		</div>
	</div>
</template>
