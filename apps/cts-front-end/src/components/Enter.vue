<script setup lang="ts">
import EnterStar from './svg/EnterStar.vue';
</script>

<template>
	<div
		class="z-10001 animate-bgEnterAnim fixed left-0 top-0 flex size-full items-stretch justify-center"
		data-testid="firstEnterStar"
	>
		<div class="inline-block self-center">
			<EnterStar class="enter-svg-obj svg-obj animate-rubberBand animation-delay-500 mx-auto h-auto w-[130px]" />
			<div class="stop-star-subtitle text-main-color-light animation-delay-1500 mt-4 animate-[bounceOnce_1s_ease-out] font-serif text-3xl tracking-wider">
				Catch the stars
			</div>
		</div>
	</div>
</template>
