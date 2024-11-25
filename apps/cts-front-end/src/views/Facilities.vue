<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@ctsf-src/stores/global';
import { until, useIntersectionObserver } from '@vueuse/core';
import { mapValues } from 'radash';
import type { GetFacilitiesListBaseWithNanoIdDto, ObservatoriesListDto } from '@cts-shared';
import { facilitiesQuery } from '@ctsf-src/services/apis/facilitiesApi';
import { observatoriesQuery } from '@ctsf-src/services/apis/observatoriesApi';
import Header from '../components/Header.vue';
import TitleBox from '../components/TitleBox.vue';
import Footer from '../components/Footer.vue';

const route = useRoute();
const globalStore = useGlobalStore();
const { currentPageMeta } = storeToRefs(globalStore);

const eduCategories = ref<GetFacilitiesListBaseWithNanoIdDto>([]);
const observatoryCategories = ref<ObservatoriesListDto>([]);
const selectCat = ref<string>('');

const block_observatory_target = ref(null);
const block_observatory_target_isVisible = ref(false);
const { stop } = useIntersectionObserver(
	block_observatory_target,
	([{ isIntersecting }]) => {
		block_observatory_target_isVisible.value = isIntersecting;
		if (isIntersecting) {
			stop();
		}
	},
);

const facilitiesMeta = computed(() => currentPageMeta.value(String(route.name)));

const { data: facilitiesListAPI, isLoading: facilitiesLoading } = facilitiesQuery();

const { data: observatoriesListAPI, isLoading: observatoriesLoading } = observatoriesQuery();

const handleEduCategoriesData = async () => {
	await until(facilitiesLoading).toBe(false);
	if (facilitiesListAPI.value?.status === 200) {
		eduCategories.value = facilitiesListAPI.value.body.data.map((item) => {
			return mapValues(item, value => value || '');
		});
	}
};

const handleObservatoriesData = async () => {
	await until(observatoriesLoading).toBe(false);
	if (observatoriesListAPI.value?.status === 200) {
		observatoryCategories.value = observatoriesListAPI.value.body.data.map((item) => {
			return mapValues(item, value => value || '');
		});
		selectCat.value = String(observatoryCategories.value[0].observatoryCategoryId);
	}
};

handleEduCategoriesData();
handleObservatoriesData();
</script>

<template>
	<Header />
	<div
		class="mobile:pt-32 h-table:flex h-table:px-6 h-table:pt-32 middle-pc:px-20 middle-pc:pt-72 flex-wrap items-start justify-center px-8 pb-32"
	>
		<TitleBox
			:page-title="facilitiesMeta.pageTitle"
			:page-sub-title="facilitiesMeta.subPageTitle"
		/>
		<div class="mb-14 mt-8 w-10/12">
			<h2
				class="text-main-color-light text-left"
				data-testid="promotional__agency__title"
			>
				推廣機構
			</h2>
		</div>
		<!-- post grid -->
		<div
			class="facility-items h-table:w-10/12 h-table:gap-10 h-table:pr-36 laptop:grid-cols-3 laptop:pr-0 large-pc:gap-24 grid grid-cols-1 gap-8 overflow-hidden"
			data-testid="facility__items"
		>
			<div
				v-for="(val, key) in eduCategories"
				:key="key"
				class="facility-item animate-fadeInUp group"
				data-testid="facility__item"
			>
				<img
					class="h-[130px] w-full border border-b-0 border-white/0 object-cover delay-75 duration-1000 group-hover:border-white/60"
					:src="String(val.facilitiesImage)"
				>
				<!-- card -->
				<div
					class="h-72 border border-t-0 border-white/0 bg-white px-8 py-7 delay-75 duration-1000 group-hover:border-white/60 group-hover:bg-white/0"
					:class="[
						{ 'bg-white/18': (key + 1) % 3 === 0 },
						{ 'bg-white/12': (key + 3) % 3 === 1 },
						{ 'bg-white/6': (key + 4) % 3 === 1 },
					]"
				>
					<!-- title -->
					<p class="facility-item-title truncate text-3xl font-normal text-white">
						{{ val.facilitiesTitle }}
					</p>
					<!-- des -->
					<p class="grid-des-box text-main-color-light mt-6 text-lg font-light">
						{{ val.facilitiesDescription }}
					</p>
					<!-- link -->
					<a
						class="btn draw meet mt-7 inline-block"
						:href="String(val.facilitiesLink)"
						target="_blank"
					>
						<span>查看更多</span>
					</a>
				</div>
			</div>
		</div>
		<!-- 小標題 -->
		<div
			ref="block_observatory_target"
			class="mb-0 mt-28 w-10/12"
		>
			<h2
				class="text-main-color-light text-left"
				data-testid="observatory__table__title"
			>
				天文台
			</h2>
		</div>
		<!-- 篩選列 -->
		<div class="table-filter mb-8 mt-14 inline-flex w-10/12">
			<ul
				v-if="observatoryCategories"
				class="flex flex-wrap"
				data-testid="observatory__categories__container"
			>
				<li
					v-for="(val, key) in observatoryCategories"
					:key="key"
					data-testid="observatory__category"
				>
					<div class="group mr-10 flex items-center">
						<input
							:id="String(val.observatoryCategoryId)"
							v-model="selectCat"
							type="radio"
							name="radio"
							class="hidden"
							:value="val.observatoryCategoryId"
						>
						<label
							:for="String(val.observatoryCategoryId)"
							class="table-name group-hover:text-sp-color-light flex cursor-pointer items-center text-2xl delay-75 duration-1000"
							:class="[
								{ 'text-sub-color-light': val.observatoryCategoryId === selectCat },
								{ 'text-main-color-light': val.observatoryCategoryId !== selectCat },
							]"
						>
							<span
								class="border-grey flex-no-shrink group-hover:bg-sp-color-light mr-2 inline-block size-3 rounded-full border delay-75 duration-1000"
								:class="{ 'bg-sub-color-light': val.observatoryCategoryId === selectCat }"
							/>
							{{ val.observatoryCategoryName }}
						</label>
					</div>
				</li>
			</ul>
		</div>
		<!-- 瀏覽 md 區塊 -->
		<div
			v-if="observatoryCategories"
			class="md-container facilities-md-container text-main-color-light h-table:w-10/12"
		>
			<v-md-preview
				v-for="(val, key) in observatoryCategories"
				v-show="selectCat === val.observatoryCategoryId"
				:key="key"
				class="animate-fadeIn"
				:text="val.observatoryPostContent"
			/>
		</div>
	</div>
	<Footer />
</template>
