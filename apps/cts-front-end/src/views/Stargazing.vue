<script setup lang="ts">
import { mapValues } from 'radash';
import { computed, nextTick, ref } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@ctsf-src/stores/global';
import { until, useToggle } from '@vueuse/core';
import type { SingleStargazingDetailDto } from '@cts-shared';
import { defaultStargazingItemDetail } from '@cts-shared';
import useLeafletMap from '@ctsf-src/composables/useLeafletMap';
import L from 'leaflet';
import markSvg from '@ctsf-src/assets/img/mark-op.png';
import actMarkSvg from '@ctsf-src/assets/img/mark-op-act.png';
import Header from '@ctsf-src/components/Header.vue';
import TitleBox from '@ctsf-src/components/TitleBox.vue';
import Footer from '@ctsf-src/components/Footer.vue';
import ArrowDown from '@ctsf-src/components/svg/ArrowDown.vue';
import { stargazingListQuery } from '@ctsf-src/services/apis/stargazingApi';

const route = useRoute();
const globalStore = useGlobalStore();
const { currentPageMeta } = storeToRefs(globalStore);
const { createMap, settingDefaultState, composableMap, addMarker, generateIcon, changeCenter } = useLeafletMap();
const [togglePlaceVal, togglePlace] = useToggle();
const mapContainer = ref(null);
const isReady = ref(true);
const actMarkName = ref('請選擇地點');
const stargazingList = ref<SingleStargazingDetailDto[]>([]);
const infoBoxState = ref(false);
const activeInfo = ref(defaultStargazingItemDetail);

const normalMarkConfig = {
	iconUrl: markSvg,
	iconSize: new L.Point(50, 50),
	iconAnchor: new L.Point(25, 50),
	className: 'single__stargazing__mark',
};
const activeMarkConfig = {
	iconUrl: actMarkSvg,
	iconSize: new L.Point(50, 50),
	iconAnchor: new L.Point(25, 50),
	className: 'single__stargazing__mark single__stargazing__active__mark',
};

const initMarkState = () => {
	composableMap.value?.eachLayer((layer) => {
		if (layer instanceof L.Marker)
			layer.setIcon(generateIcon(normalMarkConfig));
	});
};

const actMarkBycoordinate = (latitude: number, longitude: number) => {
	composableMap.value?.eachLayer((layer) => {
		if (layer instanceof L.Marker) {
			const { lat, lng } = layer.getLatLng();
			if (lat === latitude && lng === longitude) {
				layer.setIcon(generateIcon(activeMarkConfig));
				changeCenter([latitude, longitude]);
			}
		}
	});
};

const showInfoBox = () => (infoBoxState.value = true);
const hideInfoBox = () => (infoBoxState.value = false);
const closeInfoBox = () => {
	hideInfoBox();
	initMarkState();
};

const clickSingleInfo = (singleData: SingleStargazingDetailDto) => {
	// 先全部設成一般顏色, 點擊處再設成 active 色
	initMarkState();
	actMarkBycoordinate(Number(singleData.stargazingLatitude), Number(singleData.stargazingLongitude));
	// 已開啟 infoBox, 就關閉後再開啟
	const currentInfoBoxShow = Boolean(infoBoxState.value);
	currentInfoBoxShow && hideInfoBox();
	setTimeout(() => {
		showInfoBox();
		activeInfo.value = singleData;
		actMarkName.value = singleData.stargazingTitle || '';
	}, currentInfoBoxShow ? 300 : 0);
	// 如果已開啟手機版選單, 就關閉選單
	togglePlaceVal.value && togglePlace();
};

const { data: stargazingListAPI, isLoading } = stargazingListQuery({
	activePage: ref(1),
	queryMode: 'map',
});

// DOM 已經掛載好才初始化地圖
nextTick(() => {
	requestAnimationFrame(async () => {
		if (!mapContainer.value)
			return;

		if (!composableMap.value)
			createMap({ mapRef: mapContainer.value });

		await until(isLoading).toBe(false);
		if (stargazingListAPI.value?.status === 200) {
			// 資料綁定地圖
			const newList = stargazingListAPI.value.body.data.list as SingleStargazingDetailDto[];
			stargazingList.value = newList.map((item) => {
				return mapValues(item, value => value || '');
			});

			composableMap.value?.whenReady(() => {
				stargazingList.value.forEach((item, index) => {
					if (!index) {
						// 將第一筆位置設定成地圖中心
						composableMap.value?.whenReady(() => {
							settingDefaultState({ coordinate: [Number(item.stargazingLatitude), Number(item.stargazingLongitude)] });
						});
					}
					// 地圖插點相關事件
					const marker = addMarker([Number(item.stargazingLatitude), Number(item.stargazingLongitude)], {
						icon: generateIcon(normalMarkConfig),
						zIndexOffset: 1,
					});
					marker.on('click', () => {
						clickSingleInfo(item);
					});
				});
			});
		}
	});
});

const stargazingMeta = computed(() => currentPageMeta.value(String(route.name)));
</script>

<template>
	<Header />
	<div
		class="mobile:pt-32 h-table:flex h-table:px-6 h-table:pt-32 middle-pc:px-20 middle-pc:pt-72 flex-wrap items-start justify-center px-8 pb-7"
	>
		<TitleBox
			:page-title="stargazingMeta.pageTitle"
			:page-sub-title="stargazingMeta.subPageTitle"
		/>
	</div>
	<!---------- 地點列表 ---------->
	<!-- 手機板選單樣式 -->
	<div class="dropdown-menu mobile:block absolute z-[401] ml-2 mt-2 hidden shadow-2xl">
		<button
			id=" dropdownDefault"
			class="text-main-color-black relative inline-flex w-full items-center border border-white/60 bg-white py-3 pl-4 pr-12 text-center text-lg font-medium tracking-normal duration-1000"
			type="button"
			@click.prevent="togglePlace()"
		>
			{{ actMarkName }}
			<ArrowDown />
		</button>
		<!-- Dropdown menu -->
		<div
			v-show="togglePlaceVal"
			id="dropdown"
			class="bg-main-color-light absolute z-10 w-full divide-y divide-gray-100"
		>
			<ul class="text-main-color-black h-[200px] cursor-pointer overflow-y-auto py-1 text-sm">
				<li
					v-for="(val, key) in stargazingList"
					:key="key"
					class="hover:text-sub-color-dark block px-4 py-2 tracking-normal"
					@click.stop="clickSingleInfo(val)"
				>
					{{ val.stargazingTitle }}
				</li>
			</ul>
		</div>
	</div>
	<!-- 桌機左側列表樣式 -->
	<div class="stargazing-menu animate-slideInLeft h-table:block h-table:w-5/12 w-table:w-1/3 middle-pc:w-1/5 absolute z-[401] hidden h-[80vh] w-full overflow-x-hidden bg-white px-7 py-8 shadow-2xl">
		<h2 class="mb-9 font-normal">
			地點列表
		</h2>
		<ul data-testid="stargazing__list">
			<li
				v-for="(val, key) in stargazingList"
				:key="key"
				class="text-main-color-middle group mb-3 flex cursor-pointer items-center font-normal tracking-wide"
				data-testid="stargazing__li"
				@click.stop="clickSingleInfo(val)"
			>
				<img
					class="mr-2 w-[15px]"
					src="/svg/mark.svg"
				>
				<span
					class="group-hover:text-sp-color-light whitespace-nowrap delay-75 duration-1000"
					data-testid="stargazing__li__title"
				>
					{{ val.stargazingTitle }}
				</span>
			</li>
		</ul>
	</div>
	<!-- 單一地點介紹 -->
	<div
		class="stargazing-info-card grid-flow-rows animate-slideInLeft h-table:w-1/2 w-table:w-5/12 middle-pc:w-1/3 absolute z-[401] grid	h-[80vh] w-full bg-white shadow-2xl"
		:class="{ '-z-9999': isReady, 'animate-slideOutLeft': !infoBoxState }"
		data-testid="stargazing__drawer__container"
	>
		<div class="row-span-1 flex w-full items-center justify-between p-4">
			<h2
				class="mobile:text-xl h-table:text-xl middle-pc:text-4xl truncate font-normal tracking-normal"
				data-testid="stargazing__drawer__title"
			>
				{{ activeInfo.stargazingTitle }}
			</h2>
			<button
				class="close-stargazing-menu-btn mobile:right-2 relative bottom-[7px] right-7 -m-6 size-[15px] p-6 before:absolute before:left-[15px] before:h-[15px] before:w-[2px] before:rotate-45 before:bg-black after:absolute after:left-[15px] after:h-[15px] after:w-[2px] after:-rotate-45 after:bg-black"
				data-testid="stargazing__drawer__close"
				@click.stop="closeInfoBox"
			/>
		</div>
		<div
			class="row-span-6 min-h-[100px] w-full bg-cover bg-bottom bg-no-repeat"
			:style="`background-image: url(${activeInfo.stargazingImage})`"
		/>
		<div class="text-main-color-middle row-span-4 p-4">
			<div class="stargazing-info-description">
				{{ activeInfo.stargazingDescription }}
			</div>
		</div>
		<div class="text-sub-color-light mobile:pb-2 row-span-1 flex items-center px-4">
			<img
				class="mr-2 w-[15px]"
				src="/svg/mark.svg"
			>
			<a
				:href="`https://maps.google.com?q=${activeInfo.stargazingLatitude},${activeInfo.stargazingLongitude}`"
				target="_blank"
			>{{
				activeInfo.stargazingAddress
			}}</a>
		</div>
	</div>
	<!-- 地圖容器 -->
	<div
		id="map-container"
		ref="mapContainer"
		data-testid="map-container"
		class="h-table:mb-24 middle-pc:mb-60 z-0 h-[80vh] w-full"
	/>
	<Footer />
</template>
