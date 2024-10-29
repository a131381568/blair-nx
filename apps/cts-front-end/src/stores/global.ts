import { defineStore } from 'pinia';
import type { PageListDto } from '@cts-shared';
import { get } from 'radash';

export const useGlobalStore = defineStore('global', {
	state: () => ({
		isLoading: true,
		count: 0,
		pageInfo: [] as PageListDto,
	}),
	getters: {
		currentPageMeta: state => (currentRouteName: string) => {
			const currentInfo = state.pageInfo.find(({ pageRoute }) => pageRoute === currentRouteName);
			return {
				pageTitle: String(get(currentInfo, 'pageTitle', '')),
				subPageTitle: String(get(currentInfo, 'subPageTitle', '')),
				pageRoute: String(get(currentInfo, 'pageRoute', '')),
			};
		},
	},
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
		updatePageInfo(pageList: PageListDto) {
			this.pageInfo = pageList;
		},
	},
});
