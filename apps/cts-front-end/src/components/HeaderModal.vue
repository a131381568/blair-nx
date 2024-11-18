<script setup lang="ts">
import type { Ref } from 'vue';
import { computed, ref, watch } from 'vue';
import { DialogModal } from '@blair-nx-ui';
import { useGlobalStore } from '@ctsf-src/stores/global';
import { CLIENT_MENU_INFO } from '@ctsf-src/constants/static-data';
import { listify, mapValues } from 'radash';
import { useElementHover, watchThrottled } from '@vueuse/core';

const props = defineProps({
	isVisable: Boolean,
});

const globalStore = useGlobalStore();
const { pageInfo } = globalStore;
const localHasContent = listify(CLIENT_MENU_INFO, key => (key));

const isHoveredList = ref<Ref<boolean>[]>([]);
const activeTopic = ref({
	title: '關於我們',
	enTitle: 'About',
	path: CLIENT_MENU_INFO.about.path,
	img: CLIENT_MENU_INFO.about.img,
	refId: 'about',
});

const menuList = computed(() => {
	if (pageInfo.length) {
		return localHasContent.map((name) => {
			const findInfo = pageInfo.find(({ pageRoute }) => pageRoute?.toLowerCase() === name);
			return {
				path: CLIENT_MENU_INFO[name].path,
				img: CLIENT_MENU_INFO[name].img,
				title: findInfo?.pageTitle,
				enTitle: findInfo?.pageRoute,
				refId: name,
			};
		});
	}
	return [];
});

const bindModal = () => requestAnimationFrame(() => {
	localHasContent.forEach((name, index) => {
		const liDOM = document.getElementById(name);
		const isHoveredForItem = useElementHover(liDOM, { delayEnter: 200, delayLeave: 600 });
		isHoveredList.value[index] = isHoveredForItem;
	});
});

watch(() => props.isVisable, newVal => (newVal && bindModal()));

watchThrottled(
	isHoveredList,
	(newVal) => {
		const activeOrder = newVal.findIndex(item => item.value);
		if (activeOrder >= 0)
			activeTopic.value = mapValues(menuList.value[activeOrder], value => String(value));
	},
	{ throttle: 300, deep: true },
);
</script>

<template>
	<DialogModal
		:is-visable="isVisable"
		:fullscreen="true"
		inner-class="m-auto flex flex-col items-center overflow-auto rounded-lg bg-white text-center text-lg leading-normal"
		class="h-full"
		modal-content-animation="vfm-slide-up"
	>
		<template #body>
			<div class="modal-content bg-secondary screens-h-900:overflow-y-auto relative m-auto size-full overflow-auto">
				<div class="mobile:grid-cols-none mobile:px-9 h-table:grid-cols-none h-table:px-20 h-table:pb-14 h-table:pt-32 w-table:grid-cols-2 laptop:px-40 grid h-screen overflow-auto py-20">
					<ul class="menu-grid-ul w-table:gap-9 large-pc:auto-rows-auto large-pc:gap-12 screens-h-900:auto-rows-max grid grid-flow-row auto-rows-max gap-7 text-left">
						<li
							v-for="({ path, title, enTitle, refId }, index) in menuList"
							:key="index"
						>
							<router-link
								:id="refId"
								:to="path"
								:title="title"
								:data-testid="title"
								class="tracking-wide-menu text-main-color-dark hover:text-sp-color-light mobile:text-5xl h-table:text-8xl w-table:text-7xl large-pc:text-menu-title screens-h-900:text-5xl font-serif duration-1000"
							>
								{{ enTitle }}
							</router-link>
						</li>
					</ul>
					<div
						class="mobile:hidden mobile:text-5xl h-table:hidden w-table:block large-pc:mb-16 relative -top-4 bg-cover bg-center bg-no-repeat transition-all duration-[400ms]"
						:style="{
							'background-image': `url(${activeTopic.img})`,
						}"
					>
						<!-- :class="`bg-menu-${activeTopic.refId}`" -->
						<router-link
							:to="activeTopic.path"
							class="text-shadow hover:text-sub-color-light absolute bottom-12 right-12 text-3xl text-white duration-1000"
						>
							{{ activeTopic.title }}
						</router-link>
					</div>
				</div>
			</div>
		</template>
	</DialogModal>
</template>
