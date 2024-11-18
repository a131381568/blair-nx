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
	<div class="z-10000 fixed mt-32 flex flex-col items-center justify-center">
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
							class="header-svg-obj w-64px mobile:w-9 h-auto"
							:class="{ active: modal }"
						/>
					</router-link>
				</div>
				<div class="flex items-end space-x-5 self-center hover:animate-pulse">
					<div
						class="menu-toggle-btn bars group inline-block cursor-pointer text-base"
						:class="{ active: modal }"
						data-testid="menu__toggle__btn"
						@click.prevent="toggleModal"
					>
						<div
							class="top-bar mb-0-4em h-0-2em w-1-8em rounded-2em group-hover:bg-sp-color-light bg-white transition-all duration-300 ease-in-out"
							:class="{ 'bg-main-color-dark rotate-225 translate-y-0-8em transform-gpu': modal }"
						/>
						<div
							class="middle-bar mb-0-4em h-0-2em w-1-8em rounded-2em group-hover:bg-sp-color-light bg-white transition-all duration-300 ease-in-out"
							:class="{ 'bg-main-color-dark scale-0 transform-gpu opacity-0': modal }"
						/>
						<div
							class="bottom-bar mb-0-4em h-0-2em w-1-8em rounded-2em group-hover:bg-sp-color-light bg-white transition-all duration-300 ease-in-out"
							:class="{ 'bg-main-color-dark -rotate-225 -translate-y-0-35em transform-gpu': modal }"
						/>
					</div>
				</div>
			</nav>
		</div>
	</div>
	<HeaderModal
		:is-visable="modal"
		data-testid="menu__modal"
	/>
</template>
