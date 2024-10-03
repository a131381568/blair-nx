import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
	state: () => ({
		isLoading: true,
		count: 0,
	}),
	getters: {},
	actions: {
		openLoading() {
			this.$state.isLoading = true;
		},
		closeLoading() {
			this.$state.isLoading = false;
		},
		increment() {
			this.count++;
		},
		resetCount() {
			this.count = 0;
		},
	},
});
