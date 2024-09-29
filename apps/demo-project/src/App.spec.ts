import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import App from './App.vue';

describe('測試用 app', () => {
	it('開始 renders properly', async () => {
		const wrapper = mount(App, {});

		expect(wrapper.text()).toContain('Welcome demo-project 👋');
	});
});
