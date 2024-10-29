import * as L from 'leaflet';
import { onUnmounted, ref } from 'vue';
import '@raruto/leaflet-gesture-handling';
import 'leaflet/dist/leaflet.css';

interface ExtendedMapOptions extends L.MapOptions {
	gestureHandling?: boolean;
	gestureHandlingOptions?: {
		text: {
			touch: string;
			scroll: string;
			scrollMac: string;
		};
	};
}

export default function () {
	const composableMap = ref<L.Map | null>(null);
	const mapInstance = ref<L.Map | null>(null);

	const createMap = ({ mapRef, setting = {} }: { mapRef: HTMLElement | null; setting?: L.MapOptions }) => {
		const defaultConfig: ExtendedMapOptions = {
			maxZoom: 12,
			minZoom: 8,
			zoom: 10,
			center: [22.637063296718924, 120.95311619835444],
			attributionControl: false,
			zoomControl: true,
			scrollWheelZoom: false,
			doubleClickZoom: false,
			zoomAnimation: true,
			fadeAnimation: true,
			markerZoomAnimation: true,
			tapHold: true,
			touchZoom: true,
			dragging: true,
			// tap: true,
			gestureHandling: true,
			gestureHandlingOptions: {
				text: {
					touch: '請使用兩指滑動地圖',
					scroll: '請加上 Ctrl 鍵縮放地圖',
					scrollMac: '請加上 \u2318 鍵縮放地圖',
				},
			},
		};

		if (mapRef) {
			mapInstance.value = L.map(mapRef, { ...defaultConfig, ...setting });
			mapInstance.value.zoomControl.setPosition('topright');
			L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png').addTo(mapInstance.value as L.Map);
			L.control.attribution({ position: 'bottomright' }).addTo(mapInstance.value as L.Map);
		}

		composableMap.value = mapInstance.value;
	};

	const clearLayer = (house: [number, number]) => {
		composableMap.value?.eachLayer((layer) => {
			if ((layer instanceof L.Polygon || layer instanceof L.Circle || layer instanceof L.Marker) && 'getLatLng' in layer) {
				const latlng = layer.getLatLng();
				if (latlng.lat === house[0] && latlng.lng === house[1])
					return;
				composableMap.value?.removeLayer(layer);
			}
		});
	};

	const changeCenter = (location: [number, number]) => {
		composableMap.value?.panTo(location, { animate: true, duration: 0.7 });
	};

	const addMarker = (position: [number, number], setting: L.MarkerOptions) => {
		return L.marker(position, setting).addTo(composableMap.value as L.Map);
	};

	const generateIcon = (setting: L.IconOptions) => L.icon(setting);

	const clearPoint = (point: [number, number]) => {
		composableMap.value?.eachLayer((layer) => {
			if (layer instanceof L.Marker && 'getLatLng' in layer) {
				const latlng = layer.getLatLng();
				if (latlng.lat === point[0] && latlng.lng === point[1]) {
					composableMap.value?.removeLayer(layer);
				}
			}
		});
	};

	const relocationToHome = (
		targetLocation: [number, number],
		iconInformation: { icon: L.IconOptions; targetMarker: L.Marker },
	) => {
		const { icon, targetMarker } = iconInformation;
		targetMarker.setIcon(generateIcon(icon));
		changeCenter(targetLocation);
	};

	const settingDefaultState = ({ coordinate }: { coordinate: [number, number] }) => {
		// addMarker(coordinate, { icon: generateIcon(homeIcon) });
		changeCenter(coordinate);
	};

	const closeMapPopup = () => composableMap.value?.closePopup();

	const generateCustomMark = ({
		lat,
		lng,
		iconSetting,
	}: {
		lat: number;
		lng: number;
		iconSetting: L.DivIconOptions;
	}) => {
		return addMarker([lat, lng], {
			icon: L.divIcon(iconSetting),
			zIndexOffset: 1,
		});
	};

	const panToOffset = ({
		latlng,
		offset,
		options,
	}: {
		latlng: L.LatLngExpression;
		offset: [number, number];
		options: L.ZoomPanOptions;
	}) => {
		if (!composableMap.value)
			return;

		const x = composableMap.value.latLngToContainerPoint(latlng).x - offset[0];
		const y = composableMap.value.latLngToContainerPoint(latlng).y - offset[1];
		const point = composableMap.value?.containerPointToLatLng([x, y]);

		if (point) {
			const zoomLevel = (mapInstance as any)._zoom as number;
			return composableMap.value.setView(point, zoomLevel, options);
		}
	};

	onUnmounted(() => composableMap.value?.remove());

	return {
		createMap,
		clearLayer,
		changeCenter,
		addMarker,
		generateIcon,
		clearPoint,
		relocationToHome,
		settingDefaultState,
		closeMapPopup,
		generateCustomMark,
		panToOffset,
		composableMap,
	};
}
