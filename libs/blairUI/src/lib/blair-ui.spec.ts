import { mount } from '@vue/test-utils';
import BlairUi from './blair-ui.vue';

describe('blairUi', () => {
	it('renders properly', () => {
		const wrapper = mount(BlairUi, {});
		expect(wrapper.text()).toContain('Welcome to BlairUi');
	});
});
