import { mount } from '@vue/test-utils';
import BlairPopover from './BlairPopover.vue';

describe('blairPopover', () => {
	let wrapper = null;
	let btnDom = null;
	const CONTENT_TEXT = 'This is text';
	const TIP_CLASS = 'testTipName';
	const BTN_CLASS = 'testBtnName';
	const SLOT_SPAN_DATA_NAME = 'innerBtnName';
	const SLOT_SPAN_HTML = `<span data-name="${SLOT_SPAN_DATA_NAME}">testTriggerBtn</span>`;
	const getTipDom = () => wrapper.find(`[data-name="blariPopover__tip"]`);

	describe('預設產生組件', () => {
		beforeEach(() => {
			wrapper = mount(BlairPopover, {
				slots: {
					default: CONTENT_TEXT,
				},
				data() {
					return {
						isVisible: false,
					};
				},
			});
			btnDom = wrapper.find(`[data-name="blariPopover__button"]`);
		});

		it('驗證按鈕正常渲染', () => {
			// 只帶 slot 文字, 會產生一個『問號』的 svg 按鈕
			expect(wrapper.exists()).toBe(true);
			expect(btnDom.exists()).toBe(true);
			expect(btnDom.find('svg').exists()).toBe(true);
		});

		it('開啟 tip 驗證 slot 存在', async () => {
			await btnDom.trigger('click');
			expect(wrapper.find(`[data-name="blariPopover__tip"]`).exists()).toBe(true);
			expect(wrapper.find(`[data-name="blariPopover__tip"]`).text()).toContain(CONTENT_TEXT);
		});

		it('測試關閉', async () => {
			await btnDom.trigger('click');
			expect(getTipDom().exists()).toBe(true);
			// // 點擊 tip 不會被關閉
			await getTipDom().trigger('click');
			expect(getTipDom().exists()).toBe(true);

			// 觸發 onClickOutside 關閉事件
			window.dispatchEvent(new Event('click'));
			await nextTick();
			expect(getTipDom().exists()).toBe(false);
		});
	});

	describe('客製化', () => {
		it('檢查 props 傳遞的參數', async () => {
			wrapper = mount(BlairPopover, {
				slots: {
					default: CONTENT_TEXT,
				},
				props: {
					popperClass: TIP_CLASS,
					btnContainerClass: BTN_CLASS,
				},
			});

			// 按鈕上的 class
			btnDom = wrapper.find(`[data-name="blariPopover__button"]`);
			expect(btnDom.classes()).toContain(BTN_CLASS);

			// 開啟 tip 檢查 class 和 slot
			await btnDom.trigger('click');
			const tipDom = wrapper.find(`.${TIP_CLASS}`);
			expect(tipDom.text()).toContain(CONTENT_TEXT);
		});

		it('驗證 slot 按鈕', () => {
			wrapper = mount(BlairPopover, {
				slots: {
					default: CONTENT_TEXT,
					button: SLOT_SPAN_HTML,
				},
			});
			btnDom = wrapper.find(`[data-name="blariPopover__button"]`);

			// 按鈕是否包含 slot span
			expect(btnDom.html()).toContain(SLOT_SPAN_HTML);
		});

		it('開關客製化 tip & btn', async () => {
			wrapper = mount(BlairPopover, {
				slots: {
					default: CONTENT_TEXT,
					button: SLOT_SPAN_HTML,
				},
				props: {
					popperClass: TIP_CLASS,
					btnContainerClass: BTN_CLASS,
				},
			});

			// 驗證 slot btn
			const spanDom = wrapper.find(`[data-name="${SLOT_SPAN_DATA_NAME}"]`);
			expect(spanDom.exists()).toBe(true);

			// 開啟 tip
			btnDom = wrapper.find(`[data-name="blariPopover__button"]`);
			await btnDom.trigger('click');

			// 點擊 tip 不會被關閉
			const tipDom = wrapper.find(`[data-name="blariPopover__tip"].${TIP_CLASS}`);
			expect(tipDom.text()).toContain(CONTENT_TEXT);

			await tipDom.trigger('click');
			expect(wrapper.find(`[data-name="blariPopover__tip"].${TIP_CLASS}`).exists()).toBe(true);

			// 關閉後只剩下 btn 的 dom
			window.dispatchEvent(new Event('click'));
			await nextTick();
			expect(getTipDom().exists()).toBe(false);
		});
	});
});
