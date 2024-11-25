<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { deleteCookie } from '@blair-nx-composables';
import { linkHome } from '@ctsf-src/helper/customCtsRoute';
import { ADMIN_MENU } from '@ctsf-src/constants/static-data';
import { AUTH_CONFIG } from '@cts-shared';
import LoginLogo from '@ctsf-src/components/svg/LoginLogo.vue';

const router = useRouter();
const toggleSideBar = ref(false);
const adminMenuData = ref(ADMIN_MENU);

const logoutAction = () => {
	deleteCookie(AUTH_CONFIG.ACCESS_TOKEN_KEY);
	deleteCookie(AUTH_CONFIG.REFRESH_TOKEN_KEY);
	linkHome(router);
};
</script>

<template>
	<div
		class="z-9999 bg-main-color-light mobile:overflow-hidden laptop:relative laptop:z-auto laptop:h-auto laptop:w-1/5 laptop:px-10 laptop:py-8 fixed h-full min-h-screen w-11 self-stretch px-2 pt-4 transition-all duration-1000"
		:class="{ 'mobile:w-full h-table:w-1/2 !overflow-y-auto': toggleSideBar }"
		data-testid="adminSidebar"
	>
		<div class="sidebar-logo inline-block">
			<router-link to="/board">
				<LoginLogo class="admin-login-svg-obj svg-obj laptop:w-64px mb-3 h-auto w-[29px]" />
			</router-link>
		</div>
		<ul
			class="laptop:visible"
			:class="[{ visible: toggleSideBar }, { invisible: !toggleSideBar }]"
		>
			<li
				v-for="(val, key) in adminMenuData"
				:key="key"
			>
				<h5
					v-if="val.path === 'title'"
					class="text-main-color-dark mt-6 text-xl font-semibold"
				>
					{{ val.title }}
				</h5>
				<h5
					v-else-if="val.path === 'logout'"
					class="text-main-color-dark hover:text-sub-color-dark mt-1 cursor-pointer transition-all duration-1000"
					@click.prevent="logoutAction"
				>
					登出
				</h5>
				<router-link
					v-else
					:to="val.path"
					class="text-main-color-dark hover:text-sub-color-dark mt-1 block transition-all duration-1000"
				>
					{{ val.title }}
				</router-link>
			</li>
		</ul>
		<button
			class="laptop:hidden laptop:px-4 fixed left-0 right-auto top-0 block h-full px-2 py-0 text-5xl shadow-2xl"
			:class="{ 'mobile:left-auto mobile:right-0 h-table:left-1/2 h-table:right-auto h-table:bg-main-color-light h-table:pr-2': toggleSideBar }"
			@click="toggleSideBar = !toggleSideBar"
		>
			<div class="bg-main-color-dark mb-[4px] h-[3px] w-[29px] rounded-[11px]" />
			<div class="bg-main-color-dark mb-[4px] h-[3px] w-[29px] rounded-[11px]" />
			<div class="bg-main-color-dark mb-[4px] h-[3px] w-[29px] rounded-[11px]" />
		</button>
	</div>
</template>
