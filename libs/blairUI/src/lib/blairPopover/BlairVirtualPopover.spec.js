import { mount } from '@vue/test-utils';
import BlariVirtualPopover from './BlariVirtualPopover.vue';

const waitMs = (ms) => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(null, ms));
	});
};

describe('blariVirtualPopover', () => {
	let wrapper = null;
	const SLOT_CONTENT = '我是內容';
	const getTipDom = () => wrapper.find(`[data-name="BlariVirtualPopover__tip"]`);

	beforeEach(() => {
		wrapper = mount(BlariVirtualPopover, {
			slots: {
				default: SLOT_CONTENT,
			},
		});
	});

	it('檢查 tip & slot 渲染顯示', async () => {
		// 預設不顯示
		expect(getTipDom().exists()).toBe(false);
		await wrapper.setProps({ visible: true });
		expect(getTipDom().exists()).toBe(true);
		expect(getTipDom().text()).toContain(SLOT_CONTENT);
	});

	it('客製化 class', async () => {
		const CUSTOM_CLASS = 'spClass';
		await wrapper.setProps({
			visible: true,
			popperClass: CUSTOM_CLASS,
		});
		expect(getTipDom().classes()).toContain(CUSTOM_CLASS);
	});

	it('檢查傳入動態 ref', async () => {
		const VIRTUAL_EL = {
			getBoundingClientRect() {
				return {
					x: 851.671875,
					y: 200.046875,
					width: 8.34375,
					height: 17,
					top: 967.046875,
					right: 860.015625,
					bottom: 984.046875,
					left: 851.671875,
				};
			},
		};

		await wrapper.setProps({
			visible: true,
			currentRef: VIRTUAL_EL,
		});
		// 在 vitest 裡面沒有瀏覽器的環境，所以一定要用手動等待
		await waitMs(100);

		const parseStyleString = (style) => {
			return style.split(';').reduce((acc, property) => {
				if (property.trim()) {
					const [key, value] = property.split(':');
					acc[key.trim()] = value.trim();
				}
				return acc;
			}, {});
		};

		const extractPxValues = (str) => {
			const regex = /translate\((\d+)px, (\d+)px\)/;
			const match = str.match(regex);
			if (match) {
				return {
					x: Number.parseInt(match[1], 10),
					y: Number.parseInt(match[2], 10),
				};
			}
			return null;
		};

		const inlineStyleString = getTipDom().attributes().style;
		const transformVal = parseStyleString(inlineStyleString).transform;
		const pxValues = extractPxValues(transformVal);
		// 從 dom 上面挖到的 transform 就會是經計算過的定位
		expect(pxValues.x !== 0).toBe(true);
		expect(pxValues.y !== 0).toBe(true);
	});
});
