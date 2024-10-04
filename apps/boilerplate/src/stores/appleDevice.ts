import { defineStore } from 'pinia';
import type { AdItemDetail, AdItemUpdate, AppleDeviceState, BaseAdItem } from '@demo-src/types';

export const useAppleDeviceStore = defineStore('appleDevice', {
	state: (): AppleDeviceState => ({
		list: [],
		latestItem: null,
	}),
	getters: {},
	actions: {
		updateList(payload: BaseAdItem[]) {
			this.$state.list = payload;
		},
		updateLastItem(payload: AdItemDetail | AdItemUpdate | null) {
			this.$state.latestItem = payload;
		},
	},
});
