<script setup lang="ts">
import { computed, nextTick, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { get, pick } from 'radash';
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@ctsf-src/stores/global';
import { aboutMutation, aboutQuery } from '@ctsf-src/services/apis/aboutApi';
import { pageMutation, pageQuery } from '@ctsf-src/services/apis/pageApi';
import AdminSidebar from '@ctsf-src/components/AdminSidebar.vue';
import Footer from '@ctsf-src/components/Footer.vue';
import { useDebounceFn, watchTriggerable } from '@vueuse/core';
import type { GetAboutInfoBaseDto } from '@cts-shared';
import { ARTICLE_MAX_LENGTH, COMMON_ID_MAX_LENGTH, defaultAboutInfoData, mutationPageItemSchema, updateAboutInfoSchema } from '@cts-shared';
import { useMessageModal } from '@blair-nx-ui';

const route = useRoute();
const router = useRouter();
const globalStore = useGlobalStore();
const { updatePageInfo } = globalStore;
const { pageInfo: pageInfoStoreData } = storeToRefs(globalStore);
const { data: aboutAPI, refetch: refetchAbout } = aboutQuery();
const { data: pageInfoData, refetch: refetchPage } = pageQuery();
const { showMsg } = useMessageModal();

const aboutSloganColRef = ref<HTMLElement | null>(null);
const editPageTitle = ref('');
const editPageSubTitle = ref('');
const sloganRef = ref('');
const philosophyRef = ref('');
const quoteRef = ref('');
const epilogueRef = ref('');
const homeData = computed(() => pageInfoStoreData.value.find(item => item.pageRoute === 'Home'));
const aboutData = ref<GetAboutInfoBaseDto>(defaultAboutInfoData);

interface InputInfo {
	placeholder: string;
	editMode: boolean;
	error: string;
}

interface SloganInputInfo {
	pageTitle: InputInfo;
	subPageTitle: InputInfo;
	slogan: InputInfo;
	philosophy: InputInfo;
	quote: InputInfo;
	epilogue: InputInfo;
}

const sloganInputInfo = ref<SloganInputInfo>({
	pageTitle: {
		placeholder: '主視覺標語',
		editMode: false,
		error: '',
	},
	subPageTitle: {
		placeholder: '主視覺引言',
		editMode: false,
		error: '',
	},
	slogan: {
		placeholder: '關於我們標語',
		editMode: false,
		error: '',
	},
	philosophy: {
		placeholder: '關於我們理念',
		editMode: false,
		error: '',
	},
	quote: {
		placeholder: '關於我們引言',
		editMode: false,
		error: '',
	},
	epilogue: {
		placeholder: '關於我們結語',
		editMode: false,
		error: '',
	},
});

// method
const setEditMode = (refName: string) => {
	switch (refName) {
		case 'homeSloganForm':
			sloganInputInfo.value.pageTitle.editMode = true;
			editPageTitle.value = homeData.value?.pageTitle || '';
			editPageSubTitle.value = homeData.value?.subPageTitle || '';
			break;
		case 'aboutSloganForm':
			sloganInputInfo.value.slogan.editMode = true;
			sloganRef.value = aboutData.value.slogan || '';
			philosophyRef.value = aboutData.value.philosophy || '';
			break;
		case 'aboutQuoteForm':
			sloganInputInfo.value.quote.editMode = true;
			quoteRef.value = aboutData.value.quote || '';
			break;
		case 'aboutEpilogueForm':
			sloganInputInfo.value.epilogue.editMode = true;
			epilogueRef.value = aboutData.value.epilogue || '';
			break;
		default:
			break;
	}
};

const submitAboutSloganForm = async (relevantList: (keyof SloganInputInfo)[]) => {
	const isAboutForm = !relevantList.includes('pageTitle') && !relevantList.includes('subPageTitle');
	const updateSchema = isAboutForm ? updateAboutInfoSchema : mutationPageItemSchema;

	const allAboutInputVal = {
		slogan: sloganRef.value,
		philosophy: philosophyRef.value,
		quote: quoteRef.value,
		epilogue: epilogueRef.value,
	};

	const aboutPayload = pick(allAboutInputVal, relevantList.filter((item): item is keyof Omit<SloganInputInfo, 'pageTitle' | 'subPageTitle'> => {
		return !['pageTitle', 'subPageTitle'].includes(item);
	}));

	const pagePayload = {
		pageTitle: editPageTitle.value,
		subPageTitle: editPageSubTitle.value,
		pageRoute: get(homeData.value, 'pageRoute', 'Home'),
		pageNanoId: get(homeData.value, 'pageNanoId', ''),
	};

	const { success, error } = updateSchema.safeParse(isAboutForm ? aboutPayload : pagePayload);

	// 初始化錯誤訊息
	relevantList.forEach((itemName: keyof SloganInputInfo) => {
		sloganInputInfo.value[itemName].error = '';
	});

	if (!success && error) {
		error.errors.forEach((info) => {
			relevantList.forEach((itemName: keyof SloganInputInfo) => {
				if (info.path.includes(itemName))
					sloganInputInfo.value[itemName].error = info.message;
			});
		});
	}

	if (success) {
		const mutationResult = isAboutForm ? await aboutMutation(aboutPayload) : await pageMutation(pagePayload);
		const isSuccess = mutationResult.status === 200;
		if (isSuccess) {
			isAboutForm ? await refetchAbout() : await refetchPage();
			// 頁面的 api 才去更新 store
			if (!isAboutForm && pageInfoData.value && pageInfoData.value.status === 200)
				updatePageInfo(pageInfoData.value.body.data);

			relevantList.forEach((itemName: keyof SloganInputInfo) => {
				sloganInputInfo.value[itemName].editMode = false;
			});
		}
		showMsg(
			isSuccess ? 'success' : 'error',
			get(mutationResult.body, isSuccess ? 'data' : 'message', ''),
			'更新訊息',
		);
	}
};

const setConfirmModal = useDebounceFn((formName: string) => {
	if (formName === 'homeSloganForm')
		submitAboutSloganForm(['pageTitle', 'subPageTitle']);
	if (formName === 'aboutSloganForm')
		submitAboutSloganForm(['slogan', 'philosophy']);
	if (formName === 'aboutQuoteForm')
		submitAboutSloganForm(['quote']);
	if (formName === 'aboutEpilogueForm')
		submitAboutSloganForm(['epilogue']);
}, 400);

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
	if (aboutAPI.value?.status === 200)
		aboutData.value = aboutAPI.value.body.data;
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
							v-if="sloganInputInfo.pageTitle.editMode"
							class="admin-edit-sbtn"
							@click.prevent="setConfirmModal('homeSloganForm')"
						>
							儲存標語
						</button>
						<button
							v-else
							class="admin-sbtn"
							@click.prevent="setEditMode('homeSloganForm')"
						>
							編輯標語
						</button>
					</div>
					<div
						v-if="sloganInputInfo.pageTitle.editMode"
						class="editer-inner edit-mode mb-8 grid gap-4"
					>
						<div>
							<input
								v-model="editPageTitle"
								type="text"
								autocomplete="off"
								class="home-title-input bottom-line-input-gray"
								:maxlength="COMMON_ID_MAX_LENGTH"
								:placeholder="sloganInputInfo.pageTitle.placeholder"
							>
							<span
								v-show="sloganInputInfo.pageTitle.error"
								class="mt-2 block h-5 text-xs text-sp-color-dark"
							>
								{{ sloganInputInfo.pageTitle.error }}
							</span>
						</div>
						<div>
							<input
								v-model="editPageSubTitle"
								type="text"
								autocomplete="off"
								class="home-slogan bottom-line-input-gray"
								:maxlength="ARTICLE_MAX_LENGTH"
								:placeholder="sloganInputInfo.subPageTitle.placeholder"
							>
							<span
								v-show="sloganInputInfo.subPageTitle.error"
								class="mt-2 block h-5 text-xs text-sp-color-dark"
							>
								{{ sloganInputInfo.subPageTitle.error }}
							</span>
						</div>
					</div>
					<div
						v-else
						class="editer-inner view-mode"
					>
						<h4 class="home-title home-content-title">
							{{ homeData?.pageTitle }}
						</h4>
						<p>{{ homeData?.subPageTitle }}</p>
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
							v-if="sloganInputInfo.slogan.editMode"
							class="admin-edit-sbtn"
							@click.prevent="setConfirmModal('aboutSloganForm')"
						>
							儲存標語
						</button>
						<button
							v-else
							class="admin-sbtn"
							@click.prevent="setEditMode('aboutSloganForm')"
						>
							編輯標語
						</button>
					</div>
					<div
						v-if="!sloganInputInfo.slogan.editMode"
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
						v-if="sloganInputInfo.slogan.editMode"
						class="editer-inner edit-mode md-container grid gap-4 bg-white px-10 pb-10 pt-6"
					>
						<span>
							<input
								v-model="sloganRef"
								name="sloganRule"
								class="bottom-line-input-gray"
								:placeholder="sloganInputInfo.slogan.placeholder"
								autocomplete="off"
								:maxlength="ARTICLE_MAX_LENGTH"
							>
							<span
								v-show="sloganInputInfo.slogan.error"
								class="mt-2 block h-5 text-xs text-sp-color-dark"
							>
								{{ sloganInputInfo.slogan.error }}
							</span>
						</span>
						<span>
							<v-md-editor
								v-model="philosophyRef"
								class="markdown-body"
								height="400px"
								:placeholder="sloganInputInfo.philosophy.placeholder"
							/>
							<span
								v-show="sloganInputInfo.philosophy.error"
								class="mt-2 block h-5 text-xs text-sp-color-dark"
							>
								{{ sloganInputInfo.philosophy.error }}
							</span>
						</span>
					</div>
				</div>
				<div class="about-quote mb-14 w-full">
					<div class="mb-8 flex flex-wrap justify-between mobile:mb-4">
						<h2 class="text-main-color-light mobile:mb-4 mobile:w-full mobile:text-3xl">
							關於我們—引言
						</h2>
						<button
							v-if="sloganInputInfo.quote.editMode"
							class="admin-edit-sbtn"
							@click.prevent="setConfirmModal('aboutQuoteForm')"
						>
							儲存標語
						</button>

						<button
							v-else
							class="admin-sbtn"
							@click.prevent="setEditMode('aboutQuoteForm')"
						>
							編輯標語
						</button>
					</div>
					<div
						v-if="sloganInputInfo.quote.editMode"
						class="editer-inner edit-mode md-container bg-white p-10"
					>
						<v-md-editor
							v-model="quoteRef"
							class="markdown-body"
							height="400px"
							:placeholder="sloganInputInfo.quote.placeholder"
						/>
						<span
							v-show="sloganInputInfo.quote.error"
							class="mt-2 block h-5 text-xs text-sp-color-dark"
						>
							{{ sloganInputInfo.quote.error }}
						</span>
					</div>
					<div
						v-else
						class="editer-inner view-mode mb-14"
					>
						<v-md-preview
							class="markdown-body"
							:text="aboutData?.quote"
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
							v-if="sloganInputInfo.epilogue.editMode"
							class="admin-edit-sbtn"
							@click.prevent="setConfirmModal('aboutEpilogueForm')"
						>
							儲存標語
						</button>
						<button
							v-else
							class="admin-sbtn"
							@click.prevent="setEditMode('aboutEpilogueForm')"
						>
							編輯標語
						</button>
					</div>
					<div
						v-if="sloganInputInfo.epilogue.editMode"
						class="editer-inner edit-mode md-container bg-white p-10"
					>
						<v-md-editor
							v-model="epilogueRef"
							class="markdown-body"
							height="400px"
							:placeholder="sloganInputInfo.epilogue.placeholder"
						/>
						<span
							v-show="sloganInputInfo.epilogue.error"
							class="mt-2 block h-5 text-xs text-sp-color-dark"
						>
							{{ sloganInputInfo.epilogue.error }}
						</span>
					</div>
					<div
						v-else
						class="editer-inner view-mode mb-14"
					>
						<v-md-preview
							class="markdown-body"
							:text="aboutData?.epilogue"
							height="400px"
						/>
					</div>
				</div>
			</div>
			<Footer class="absolute bottom-0 mobile:left-0" />
		</div>
	</div>
</template>
