import L from 'leaflet';
import { ref } from 'vue';
import actMarkSvg from '@ctsf-src/assets/img/mark-op-act.png';
import useLeafletMap from '@ctsf-src/composables/useLeafletMap';

export default function () {
	const mapModalShow = ref(false);
	const { createMap, composableMap, addMarker, generateIcon, changeCenter, clearLayer } = useLeafletMap();

	const activeMarkConfig = {
		iconUrl: actMarkSvg,
		iconSize: new L.Point(50, 50),
		iconAnchor: new L.Point(25, 50),
		className: 'single__stargazing__mark single__stargazing__active__mark',
	};

	const setMarkEvent = ({
		lat,
		lng,
		clickPopEvent,
		id,
	}: {
		lat: number;
		lng: number;
		clickPopEvent: () => void;
		id: string;
	}) => {
		const marker = addMarker([lat, lng], {
			icon: generateIcon(activeMarkConfig),
			zIndexOffset: 1,
		});

		marker.bindPopup(
			`<div class="admin-stargazer-pop">緯度：${lat}<br/>經度：${lng}<br /><button id="${id}">套用座標</button></div>`,
			{
				closeButton: false, // 是否顯示關閉按鈕
				autoClose: false, // 點選其他標記時不自動關閉這個 popup
				closeOnClick: true, // 點選地圖時不關閉 popup
				offset: [-2, -36],
			},
		).on('popupopen', () => {
			const popBtn = document.getElementById(id);
			if (popBtn) {
				// 清除先前的事件繫結，避免重複繫結
				L.DomEvent.off(popBtn, 'click', clickPopEvent);
				L.DomEvent.on(popBtn, 'click', clickPopEvent);
			}
		}).on('popupclose', () => {
			clearLayer([lat, lng]);
			// 移除事件以防止重複綁定
			const popBtn = document.getElementById(id);
			if (popBtn)
				L.DomEvent.off(popBtn, 'click', clickPopEvent);
		}).openPopup();

		changeCenter([lat, lng]);
	};

	const openMapModal = () => (mapModalShow.value = true);

	const closeMapModal = () => (mapModalShow.value = false);

	return {
		mapModalShow,
		createMap,
		composableMap,
		setMarkEvent,
		clearLayer,
		openMapModal,
		closeMapModal,
	};
}
