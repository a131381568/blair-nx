import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import CountInfo from './CountInfo.vue';
import { useGlobalStore } from '@/stores/global';

function mountComponent<T>(component: T) {
	return mount(component);
}

type WrapperType<T> = ReturnType<typeof mountComponent<T>>;

describe('pinia 驗證', () => {
	let wrapper: WrapperType<typeof CountInfo>;

	beforeEach(() => {
		setActivePinia(createPinia());
		wrapper = mount(CountInfo, {
			global: {
				plugins: [createTestingPinia({
					// 預設不會實際執行, 必須要關掉才會真正執行 action
					stubActions: false,
				})],
			},
			attachTo: document.body,
		});
	});

	describe('驗證預設', () => {
		const ORI_VAL = '0';

		it('store 狀態', () => {
			const globalStore = useGlobalStore();
			const { count } = storeToRefs(globalStore);
			expect(String(count.value)).eq(ORI_VAL);
		});

		it('組件顯示', () => {
			expect(wrapper.find(`[data-name="countState"]`).text()).eq(ORI_VAL);
		});
	});

	describe('驗證新增', () => {
		const OUTPUT_VAL = '1';

		it('執行函式', () => {
			const globalStore = useGlobalStore();
			const { count } = storeToRefs(globalStore);
			globalStore.increment();
			expect(globalStore.increment).toHaveBeenCalledTimes(1);
			expect(String(count.value)).eq(OUTPUT_VAL);
		});

		it('點擊組件', async () => {
			await wrapper.find(`[data-name="addCountBtn"]`).trigger('click');
			// await flushPromises();
			// await nextTick();
			expect(wrapper.find(`[data-name="countState"]`).text()).eq(OUTPUT_VAL);
		});
	});

	describe('驗證初始化', () => {
		const OUTPUT_VAL = '0';

		it('執行函式', () => {
			const globalStore = useGlobalStore();
			const { count } = storeToRefs(globalStore);
			globalStore.increment();
			globalStore.increment();
			globalStore.resetCount();

			expect(globalStore.increment).toHaveBeenCalledTimes(2);
			expect(globalStore.resetCount).toHaveBeenCalledTimes(1);
			expect(String(count.value)).eq(OUTPUT_VAL);
		});

		it('點擊組件', async () => {
			await wrapper.find(`[data-name="addCountBtn"]`).trigger('click');
			await wrapper.find(`[data-name="addCountBtn"]`).trigger('click');
			await wrapper.find(`[data-name="resetCountBtn"]`).trigger('click');

			expect(wrapper.find(`[data-name="countState"]`).text()).eq(OUTPUT_VAL);
		});
	});
});
