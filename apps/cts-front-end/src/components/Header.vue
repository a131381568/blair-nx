<script setup lang="ts">
import { ref } from 'vue';
import HeaderLogo from '@ctsf-src/components/svg/HeaderLogo.vue';
import HeaderModal from '@ctsf-src/components/HeaderModal.vue';

const modal = ref(false);
const getHeaderState = ref(true);
const modalShow = ref(false);

const toggleModal = () => {
	modalShow.value = !modalShow.value;
	modal.value = !modal.value;
};
</script>

<template>
	<div class="fixed z-10000 mt-32 flex flex-col items-center justify-center">
		<div class="flex flex-col">
			<nav
				class="fixed inset-x-0 top-0 flex w-full justify-between px-9 py-5 delay-75 duration-1000 hover:opacity-100"
				:class="[{ 'opacity-30': getHeaderState && modal }]"
			>
				<div class="header-logo flex items-center hover:animate-pulse">
					<router-link
						to="/"
						class="cursor-pointer"
					>
						<HeaderLogo
							class="header-svg-obj h-auto w-64px mobile:w-9"
							:class="{ active: modal }"
						/>
					</router-link>
				</div>
				<div class="flex items-end space-x-5 self-center hover:animate-pulse">
					<div
						class="menu-toggle-btn bars group inline-block cursor-pointer text-base"
						:class="{ active: modal === true }"
						@click.prevent="toggleModal"
					>
						<div
							class="top-bar mb-0-4em h-0-2em w-1-8em rounded-2em bg-white transition-all duration-300 ease-in-out group-hover:bg-sp-color-light"
							:class="[
								{ 'bg-main-color-dark': modal === true },
								{ 'transform-gpu': modal === true },
								{ 'rotate-225': modal === true },
								{ 'translate-y-0-8em ': modal === true },
							]"
						/>
						<div
							class="middle-bar mb-0-4em h-0-2em w-1-8em rounded-2em bg-white transition-all duration-300 ease-in-out group-hover:bg-sp-color-light"
							:class="[
								{ 'bg-main-color-dark': modal === true },
								{ 'transform-gpu': modal === true },
								{ 'opacity-0': modal === true },
								{ 'scale-0': modal === true },
							]"
						/>
						<div
							class="bottom-bar mb-0-4em h-0-2em w-1-8em rounded-2em bg-white transition-all duration-300 ease-in-out group-hover:bg-sp-color-light"
							:class="[
								{ 'bg-main-color-dark': modal === true },
								{ 'transform-gpu': modal === true },
								{ '-rotate-225': modal === true },
								{ '-translate-y-0-35em ': modal === true },
							]"
						/>
					</div>
				</div>
			</nav>
		</div>
	</div>
	<HeaderModal :is-visable="modal" />
</template>
