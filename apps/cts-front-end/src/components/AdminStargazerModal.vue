<script setup lang="ts">
import { ref } from 'vue';
import { DialogModal } from '@blair-nx-ui';
import useStargazingMap from '@ctsf-src/composables/useStargazingMap';

const props = defineProps({
	currentLati: {
		type: String,
		default: '',
	},
	currentLong: {
		type: String,
		default: '',
	},
});
const emit = defineEmits(['updateCoordinate']);

const { openMapModal, closeMapModal, mapModalShow, createMap, composableMap, setMarkEvent, clearLayer } = useStargazingMap();

const mapContainer = ref(null);

const initMap = () => {
	createMap({ mapRef: mapContainer.value });

	composableMap.value?.whenReady(() => {
		if (props.currentLati && props.currentLong) {
		// 直接顯示當下 mark
			setMarkEvent({
				lat: Number(props.currentLati),
				lng: Number(props.currentLong),
				clickPopEvent: () => closeMapModal(),
				id: 'uniqueButtonIdCurrent',
			});
		}
		// 遍歷一般點擊地圖事件
		composableMap.value?.on('click', (event) => {
			const { lat, lng } = event.latlng;
			clearLayer([lat, lng]);
			setMarkEvent({ lat, lng, clickPopEvent: () => {
				emit('updateCoordinate', [String(lat), String(lng)]);
				closeMapModal();
			}, id: `useMapCoordinateBtn-${Date.now()}` });
		});
	});
};

defineExpose({ openMapModal });
</script>

<template>
	<DialogModal
		:is-visable="mapModalShow"
		width-style="83.3%"
		class="h-full"
		@before-close="closeMapModal"
		@emit-opened="initMap"
	>
		<template #body>
			<div
				ref="mapContainer"
				class="h-[600px] w-full"
			/>
		</template>
	</DialogModal>
</template>
