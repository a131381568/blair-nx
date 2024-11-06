<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BgStar from '@ctsf-src/components/svg/BgStar.vue';
import Enter from '@ctsf-src/components/Enter.vue';

const fadeConfig = ref({
	enterActiveClass: 'transition-opacity duration-500 ease-out',
	enterFromClass: 'opacity-0',
	enterToClass: 'opacity-100',
	leaveActiveClass: 'transition-opacity duration-500 ease-in',
	leaveFromClass: 'opacity-100',
	leaveToClass: 'opacity-0',
});
const firstEnter = ref(true);
const canEnterMain = ref(false);

onMounted(() => (firstEnter.value = false));

const onAfterLeaveFirst = () => (canEnterMain.value = true);
</script>

<template>
	<router-view v-slot="{ Component, route }">
		<div
			class="relative overflow-y-auto overflow-x-hidden bg-cover bg-fixed bg-center bg-no-repeat"
			:class="{ 'bg-admin-featured': route.meta.manage	}"
		>
			<transition
				v-bind="fadeConfig"
				@after-leave="onAfterLeaveFirst"
			>
				<template v-if="firstEnter">
					<Enter />
				</template>
			</transition>
			<transition
				v-bind="fadeConfig"
				mode="out-in"
			>
				<template v-if="!firstEnter && canEnterMain">
					<span	:key="route.fullPath">
						<component :is="Component" />
					</span>
				</template>
			</transition>
			<div class="fixed left-0 top-0 -z-1 h-screen w-screen overflow-hidden bg-[linear-gradient(#16161d,#1f1f3a,#3b2f4a)]">
				<BgStar />
			</div>
		</div>
	</router-view>
</template>
