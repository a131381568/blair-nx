<script setup lang="ts">
import { computed, nextTick, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { get } from 'radash';
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@ctsf-src/stores/global';
import { aboutQuery } from '@ctsf-src/services/apis/aboutApi';
import { pageMutation, pageQuery } from '@ctsf-src/services/apis/pageApi';
import AdminSidebar from '@ctsf-src/components/AdminSidebar.vue';
import Footer from '@ctsf-src/components/Footer.vue';
import { useDebounceFn, watchTriggerable } from '@vueuse/core';
import type { GetAboutInfoBaseDto } from '@cts-shared';
import { ARTICLE_MAX_LENGTH, COMMON_ID_MAX_LENGTH, defaultAboutInfoData, mutationPageItemSchema } from '@cts-shared';
import { useMessageModal } from '@blair-nx-ui';

const route = useRoute();
const router = useRouter();
const globalStore = useGlobalStore();
const { updatePageInfo } = globalStore;
const { pageInfo: pageInfoStoreData } = storeToRefs(globalStore);
const { data: aboutAPI } = aboutQuery();
const { data: pageInfoData, refetch } = pageQuery();
const { showMsg } = useMessageModal();

const homeSloganEditMode = ref(false);
const aboutSloganEditMode = ref(false);
const aboutQuoteEditMode = ref(false);
const aboutEpilogueEditMode = ref(false);
const aboutSloganColRef = ref<HTMLElement | null>(null);
const editPageTitle = ref('');
const editPageSubTitle = ref('');
const sloganRef = ref('');
const philosophyRef = ref('');
const quoteRef = ref('');
const epilogueRef = ref('');
const homeData = computed(() => pageInfoStoreData.value.find(item => item.pageRoute === 'Home'));
const aboutData = ref<GetAboutInfoBaseDto>(defaultAboutInfoData);

const homeInputInfo = ref({
	pageTitle: {
		placeholder: '主視覺標語',
		error: '',
	},
	subPageTitle: {
		placeholder: '主視覺引言',
		error: '',
	},
});

// method
const setEditMode = (refName: string) => {
	switch (refName) {
		case 'homeSloganForm':
			homeSloganEditMode.value = true;
			editPageTitle.value = homeData.value?.pageTitle || '';
			editPageSubTitle.value = homeData.value?.subPageTitle || '';
			break;
		case 'aboutSloganForm':
			aboutSloganEditMode.value = true;
			break;
		case 'aboutQuoteForm':
			aboutQuoteEditMode.value = true;
			break;
		case 'aboutEpilogueForm':
			aboutEpilogueEditMode.value = true;
			break;
		default:
			break;
	}
};

const submitHomeSloganForm = async () => {
	const UPDATE_PAYLOAD = {
		pageTitle: editPageTitle.value,
		subPageTitle: editPageSubTitle.value,
		pageRoute: get(homeData.value, 'pageRoute', 'Home'),
		pageNanoId: get(homeData.value, 'pageNanoId', ''),
	};

	const { success, error } = mutationPageItemSchema.safeParse(UPDATE_PAYLOAD);
	// 初始化錯誤訊息
	homeInputInfo.value.pageTitle.error = '';
	homeInputInfo.value.subPageTitle.error = '';

	if (!success && error) {
		error.errors.forEach((info) => {
			if (info.path.includes('pageTitle'))
				homeInputInfo.value.pageTitle.error = info.message;
			if (info.path.includes('subPageTitle'))
				homeInputInfo.value.subPageTitle.error = info.message;
		});
	}

	if (success) {
		const homeInfoMutationResult = await pageMutation(UPDATE_PAYLOAD);
		const isSuccess = homeInfoMutationResult.status === 200;
		if (isSuccess) {
			await refetch();
			if (pageInfoData.value && pageInfoData.value.status === 200)
				updatePageInfo(pageInfoData.value.body.data);
			homeSloganEditMode.value = false;
		}
		showMsg(
			isSuccess ? 'success' : 'error',
			get(homeInfoMutationResult.body, isSuccess ? 'data' : 'message', ''),
			'更新訊息',
		);
	}
};

const setConfirmModal = useDebounceFn(async (formName: string) => {
	if (formName === 'homeSloganForm') {
		submitHomeSloganForm();
	};
}, 1000);

// watch
const { trigger: watchAboutQuery } = watchTriggerable(() => route.query.edit === 'about', (isAbout) => {
	if (isAbout) {
		aboutSloganColRef.value?.scrollIntoView();
		router.replace({ query: undefined });
	}
});

nextTick(() => {
	watchAboutQuery();
});

watchEffect(() => {
	if (aboutAPI.value?.status === 200) {
		aboutData.value = aboutAPI.value.body.data;
	}
});
</script>

<template>
	<div class="flex items-stretch">
		<AdminSidebar />
		<div class="relative left-7 w-full flex-wrap content-start items-start justify-center px-8 pb-52 mobile:left-11 mobile:w-admin-m-content mobile:pt-32 h-table:flex h-table:px-6 h-table:pt-32 laptop:left-0 laptop:w-4/5 middle-pc:px-20 middle-pc:pt-36">
			<!-- 標題區塊 -->
			<div class="mb-20 flex w-full flex-wrap justify-between mobile:mx-auto mobile:mb-9 mobile:block h-table:w-9/12">
				<h1 class="admin-title relative mb-5 w-full text-white mobile:w-full mobile:text-5xl w-table:m-0 w-table:w-3/4">
					標語管理
				</h1>
			</div>
			<!-- 編輯區塊 -->
			<div class="editer-container w-full h-table:w-9/12">
				<div class="home-slogan mb-14 w-full">
					<div class="mb-8 flex flex-wrap justify-between mobile:mb-4">
						<h2 class="text-main-color-light mobile:mb-4 mobile:w-full mobile:text-3xl">
							首頁—主視覺文字
						</h2>
						<button
							v-if="!homeSloganEditMode"
							class="admin-sbtn"
							@click.prevent="setEditMode('homeSloganForm')"
						>
							編輯標語
						</button>
						<button
							v-if="homeSloganEditMode"
							class="admin-edit-sbtn"
							@click.prevent="setConfirmModal('homeSloganForm')"
						>
							儲存標語
						</button>
					</div>
					<div
						v-if="!homeSloganEditMode"
						class="editer-inner view-mode"
					>
						<h4 class="home-title home-content-title">
							{{ homeData?.pageTitle }}
						</h4>
						<p>{{ homeData?.subPageTitle }}</p>
					</div>
					<div
						v-if="homeSloganEditMode"
						class="editer-inner edit-mode mb-8 grid gap-4"
					>
						<div>
							<input
								v-model="editPageTitle"
								type="text"
								autocomplete="off"
								class="home-title-input bottom-line-input-gray"
								:maxlength="COMMON_ID_MAX_LENGTH"
								:placeholder="homeInputInfo.pageTitle.placeholder"
							>
							<span
								v-show="homeInputInfo.pageTitle.error"
								class="mt-2 block h-5 text-xs text-sp-color-dark"
							>
								{{ homeInputInfo.pageTitle.error }}
							</span>
						</div>
						<div>
							<input
								v-model="editPageSubTitle"
								type="text"
								autocomplete="off"
								class="home-slogan bottom-line-input-gray"
								:maxlength="ARTICLE_MAX_LENGTH"
								:placeholder="homeInputInfo.subPageTitle.placeholder"
							>
							<span
								v-show="homeInputInfo.subPageTitle.error"
								class="mt-2 block h-5 text-xs text-sp-color-dark"
							>
								{{ homeInputInfo.subPageTitle.error }}
							</span>
						</div>
					</div>
				</div>
				<div
					id="aboutSloganColRef"
					class="about-slogan mb-14 w-full"
				>
					<div class="mb-8 flex flex-wrap justify-between mobile:mb-4">
						<h2
							ref="aboutSloganColRef"
							class="text-main-color-light mobile:mb-4 mobile:w-full mobile:text-3xl"
						>
							關於我們—理念
						</h2>
						<button
							v-if="!aboutSloganEditMode"
							class="admin-sbtn"
							@click.prevent="setEditMode('aboutSloganForm')"
						>
							編輯標語
						</button>
						<button
							v-if="aboutSloganEditMode"
							class="admin-edit-sbtn"
							@click.prevent="setConfirmModal('aboutSloganForm')"
						>
							儲存標語
						</button>
					</div>
					<div
						v-if="!aboutSloganEditMode"
						class="editer-inner view-mode mb-14"
					>
						<h4 class="about-content-title text-xl">
							{{ aboutData?.slogan }}
						</h4>
						<hr class="my-8 border-main-color-middle">
						<v-md-preview
							class="markdown-body"
							:text="aboutData?.philosophy"
							height="400px"
						/>
					</div>
					<div
						v-if="aboutSloganEditMode"
						class="editer-inner edit-mode md-container"
					>
						<input
							v-model="sloganRef"
							name="sloganRule"
							class="p-6"
							placeholder="關於我們標語"
							autocomplete="off"
						>
						<input
							v-show="false"
							v-model="philosophyRef"
							name="philosophyRule"
							autocomplete="off"
						>
						<v-md-editor
							v-model="philosophyRef"
							class="markdown-body"
							height="400px"
						/>
					</div>
				</div>
				<div class="about-quote mb-14 w-full">
					<div class="mb-8 flex flex-wrap justify-between mobile:mb-4">
						<h2 class="text-main-color-light mobile:mb-4 mobile:w-full mobile:text-3xl">
							關於我們—引言
						</h2>
						<button
							v-if="!aboutQuoteEditMode"
							class="admin-sbtn"
							@click.prevent="setEditMode('aboutQuoteForm')"
						>
							編輯標語
						</button>
						<button
							v-if="aboutQuoteEditMode"
							class="admin-edit-sbtn"
							@click.prevent="setConfirmModal('aboutQuoteForm')"
						>
							儲存標語
						</button>
					</div>
					<div
						v-if="!aboutQuoteEditMode"
						class="editer-inner view-mode mb-14"
					>
						<v-md-preview
							class="markdown-body"
							:text="aboutData?.quote"
							height="400px"
						/>
					</div>
					<div
						v-if="aboutQuoteEditMode"
						class="editer-inner edit-mode md-container"
					>
						<input
							v-show="false"
							v-model="quoteRef"
							name="quoteRule"
							autocomplete="off"
						>
						<v-md-editor
							v-model="quoteRef"
							class="markdown-body"
							height="400px"
						/>
					</div>
				</div>
				<div class="about-epilogue mb-14 w-full">
					<div class="mb-8 flex flex-wrap justify-between mobile:mb-4">
						<h2 class="text-main-color-light mobile:mb-4 mobile:w-full mobile:text-3xl">
							關於我們—結語
						</h2>
						<button
							v-if="!aboutEpilogueEditMode"
							class="admin-sbtn"
							@click.prevent="setEditMode('aboutEpilogueForm')"
						>
							編輯標語
						</button>
						<button
							v-if="aboutEpilogueEditMode"
							class="admin-edit-sbtn"
							@click.prevent="setConfirmModal('aboutEpilogueForm')"
						>
							儲存標語
						</button>
					</div>
					<div
						v-if="!aboutEpilogueEditMode"
						class="editer-inner view-mode mb-14"
					>
						<v-md-preview
							class="markdown-body"
							:text="aboutData?.epilogue"
							height="400px"
						/>
					</div>
					<div
						v-if="aboutEpilogueEditMode"
						class="editer-inner edit-mode md-container"
					>
						<input
							v-show="false"
							v-model="epilogueRef"
							name="epilogueRule"
							autocomplete="off"
						>
						<v-md-editor
							v-model="epilogueRef"
							class="markdown-body"
							height="400px"
						/>
					</div>
				</div>
			</div>
			<Footer class="absolute bottom-0 mobile:left-0" />
		</div>
	</div>
</template>
