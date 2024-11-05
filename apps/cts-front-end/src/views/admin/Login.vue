<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LoginLogo from '@ctsf-src/components/svg/LoginLogo.vue';
import Footer from '@ctsf-src/components/Footer.vue';
import { useDebounceFn } from '@vueuse/core';
import { AUTH_CONFIG, COMMON_ID_MAX_LENGTH, loginInputSchema } from '@cts-shared';
import { useMessageModal } from '@blair-nx-ui';
import { get } from 'radash';
import type { ApiResponse, SystemErrorDto, TokenGroupDto } from '@cts-shared';
import type { vueQueryRes } from '@ctsf-src/services/utils/vue-query-client';
import { queryClient } from '@ctsf-src/services/utils/vue-query-client';
import { setCookie } from '@blair-nx-composables';
import { linkBoardPage } from '@ctsf-src/helper/customCtsRoute';

const { showMsg } = useMessageModal();

const router = useRouter();
const loginAccount = ref('');
const loginPassword = ref('');
const validateLoginMsg = ref({
	email: '',
	password: '',
});

const validateForm = useDebounceFn(async () => {
	const { success, error } = loginInputSchema.safeParse({
		email: loginAccount.value,
		password: loginPassword.value,
	});
	// 初始化錯誤訊息
	validateLoginMsg.value.email = '';
	validateLoginMsg.value.password = '';

	if (!success && error) {
		error.errors.forEach((info) => {
			if (info.path.includes('email'))
				validateLoginMsg.value.email = info.message;
			if (info.path.includes('password'))
				validateLoginMsg.value.password = info.message;
		});
	}

	if (success) {
		const result = await queryClient.login.mutation({
			body: {
				email: loginAccount.value,
				password: loginPassword.value,
			},
		}) as vueQueryRes<ApiResponse<TokenGroupDto | SystemErrorDto>>;

		if (result.status === 201) {
			const { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, TOKEN_EXPIRY, REFRESH_EXPIRY } = AUTH_CONFIG;
			setCookie(ACCESS_TOKEN_KEY, get(result.body.data, ACCESS_TOKEN_KEY, ''), TOKEN_EXPIRY);
			setCookie(REFRESH_TOKEN_KEY, get(result.body.data, REFRESH_TOKEN_KEY, ''), REFRESH_EXPIRY);
			linkBoardPage(router);
		}
		else {
			showMsg('error', get(result.body, 'message', '登入失敗'), '登入訊息');
		}
	}
}, 1000);
</script>

<template>
	<div
		class="items-center justify-center p-8 mobile:pb-20 mobile:pt-32 h-table:flex h-table:px-6 h-table:py-32 middle-pc:px-28 middle-pc:pb-44 middle-pc:pt-64"
	>
		<div class="w-full bg-main-color-light/90 py-16 shadow-30-box h-table:w-10/12 w-table:w-7/12 laptop:w-1/2 large-pc:w-1/3">
			<div class="m-auto mb-8 block self-center">
				<LoginLogo class="admin-login-svg-obj svg-obj mx-auto h-auto w-[77px]" />
				<div class="mt-2 text-center font-serif text-4xl font-medium tracking-wider text-main-color-dark">
					Catch the stars
				</div>
			</div>
			<form
				class="relative"
			>
				<span>
					<input
						v-model="loginAccount"
						name="email"
						type="text"
						autocomplete="off"
						:maxlength="COMMON_ID_MAX_LENGTH"
						class="m-auto block h-8 w-10/12 border-x-0 border-b-2 border-t-0 bg-transparent px-0 py-7 text-middle placeholder:text-main-color-dark focus:border-main-color-black/70 focus:outline-0 focus:ring-0 focus:placeholder:text-transparent h-table:w-5/12"
						:class="[
							{ 'border-sp-color-dark': validateLoginMsg.email },
							{ 'border-main-color-black/30': !validateLoginMsg.email },
						]"
						placeholder="帳號"
					>
					<span
						v-show="validateLoginMsg.email"
						class="errors-tip mx-auto mb-auto mt-1 block h-5 w-10/12 text-xs text-sp-color-dark h-table:w-5/12"
					>
						{{ validateLoginMsg.email }}
					</span>
				</span>
				<span>
					<input
						v-model="loginPassword"
						name="password"
						type="password"
						autocomplete="off"
						:maxlength="COMMON_ID_MAX_LENGTH"
						class="m-auto mt-2 block h-8 w-10/12 border-x-0 border-b-2 border-t-0 bg-transparent px-0 py-7 text-middle placeholder:text-main-color-dark focus:border-main-color-black/70 focus:outline-0 focus:ring-0 focus:placeholder:text-transparent h-table:w-5/12"
						:class="[
							{ 'border-sp-color-dark': validateLoginMsg.password },
							{ 'border-main-color-black/30': !validateLoginMsg.password },
						]"
						placeholder="密碼"
					>
					<span
						v-show="validateLoginMsg.password"
						class="errors-tip mx-auto mb-auto mt-1 block h-5 w-10/12 text-xs text-sp-color-dark h-table:w-5/12"
					>
						{{ validateLoginMsg.password }}
					</span>
				</span>
				<button
					id="submit-login"
					class="btn m-auto mt-14 block h-12 w-10/12 items-center justify-center border border-main-color-black p-0 text-center text-middle font-bold tracking-wide-content text-main-color-black shadow-none transition-all duration-300 hover:bg-main-color-dark hover:text-main-color-light h-table:w-5/12"
					@click.prevent="validateForm"
				>
					登入後台
				</button>
			</form>
		</div>
	</div>
	<Footer />
</template>
