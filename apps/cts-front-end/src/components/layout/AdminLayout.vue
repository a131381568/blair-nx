<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AdminSidebar from '@ctsf-src/components/AdminSidebar.vue';
import { linkLoginPage } from '@ctsf-src/helper/customCtsRoute';
import { getToken } from '@blair-nx-composables';
import { AUTH_CONFIG } from '@cts-shared';

const router = useRouter();
const canEnterMain = ref(false);

if (getToken(AUTH_CONFIG.REFRESH_TOKEN_KEY))
	canEnterMain.value = true;
else
	linkLoginPage(router);
</script>

<template>
	<div class="relative overflow-y-auto overflow-x-hidden bg-admin-featured bg-cover bg-fixed bg-center bg-no-repeat">
		<div
			v-if="canEnterMain"
			class="flex items-stretch"
		>
			<AdminSidebar class="animate-[fadeInLeft_0.5s]" />
			<router-view class="animate-fadeIn" />
		</div>
	</div>
</template>
