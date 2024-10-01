import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { createPinia, setActivePinia } from 'pinia';
import Home from './Home.vue';

describe('測試用 Home', () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	it('檢查 render 字串', async () => {
		const wrapper = mount(Home, {
			global: {
				plugins: [createTestingPinia()],
			},
		});
		expect(wrapper.text()).toContain('Home');
	});
});
