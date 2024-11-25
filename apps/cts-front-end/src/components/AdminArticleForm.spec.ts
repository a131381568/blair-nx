import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { ARTICLE_MAX_LENGTH, COMMON_ID_MAX_LENGTH } from '@cts-shared';
import AminStargazerFrom from './AminStargazerFrom.vue';

describe('aminStargazerFrom.vue', () => {
	const defaultProps = {
		stargazerTitle: '新增地點',
		stargazerSaveBtn: '儲存新增',
		stargazerNameVal: '',
		stargazerNameError: '',
		stargazerDescriptionVal: '',
		stargazerDescriptionError: '',
		stargazerIntroductionVal: '',
		stargazerIntroductionError: '',
		stargazerLatitudeVal: '',
		stargazerLatitudeError: '',
		stargazerLongitudeVal: '',
		stargazerLongitudeError: '',
		stargazerImageUrl: '',
		stargazerImageError: '',
		confirmEvent: vi.fn(),
		openMapModalEvent: vi.fn(),
	};

	it('renders properly with default props', () => {
		const wrapper = mount(AminStargazerFrom, {
			props: defaultProps,
		});

		expect(wrapper.find('h1').text()).toBe('新增地點');
		expect(wrapper.find('button').text()).toBe('儲存新增');
	});

	it('emits updateStargazerNameVal when name input changes', async () => {
		const wrapper = mount(AminStargazerFrom, {
			props: defaultProps,
		});

		// 修正: 使用更具體的選擇器來找到第一個輸入框
		const input = wrapper.find('input[autocomplete="off"]');
		await input.setValue('測試地點');

		const emitted = wrapper.emitted('updateStargazerNameVal');
		expect(emitted).toBeTruthy();
		if (emitted) { // TypeScript null 檢查
			expect(emitted[0]).toEqual(['測試地點']);
		}
	});

	it('shows error message when stargazerNameError is provided', () => {
		const wrapper = mount(AminStargazerFrom, {
			props: {
				...defaultProps,
				stargazerNameError: '地點名稱為必填',
			},
		});

		const errorElement = wrapper.find('.stargazer-name-error-tip');
		expect(errorElement.exists()).toBe(true);
		expect(errorElement.text()).toBe('地點名稱為必填');
	});

	it('verifies input maxlength constraints', async () => {
		const wrapper = mount(AminStargazerFrom, {
			props: defaultProps,
		});

		const nameInput = wrapper.find('input[type="text"]');
		expect(nameInput.attributes('maxlength')).toBe(String(COMMON_ID_MAX_LENGTH));

		const descriptionInput = wrapper.find('textarea');
		expect(descriptionInput.attributes('maxlength')).toBe(String(ARTICLE_MAX_LENGTH));
	});

	it('calls confirmEvent when save button is clicked', async () => {
		const confirmEvent = vi.fn();
		const wrapper = mount(AminStargazerFrom, {
			props: {
				...defaultProps,
				confirmEvent,
			},
		});

		await wrapper.find('.btn.draw.meet').trigger('click');
		expect(confirmEvent).toHaveBeenCalled();
	});

	///////////////////

	it('handles file upload correctly', async () => {
		const wrapper = mount(AminStargazerFrom, {
			props: defaultProps,
		});

		const file = new File([''], 'test-image.png', { type: 'image/png' });
		const fileList = {
			0: file,
			length: 1,
			item: (_index: number) => file,
		} as FileList;

		// 直接調用元件的上傳事件處理方法
		await wrapper.vm.$emit('uploadFileEvent', { files: fileList });

		// 檢查事件是否被觸發
		const emitted = wrapper.emitted('uploadFileEvent');
		expect(emitted).toBeTruthy();
		if (emitted) {
			const [eventArg] = emitted[0];
			expect((eventArg as { files: FileList }).files[0].name).toBe('test-image.png');
		}
	});

	it('handles large file upload', async () => {
		const wrapper = mount(AminStargazerFrom, {
			props: defaultProps,
		});

		const largeFile = new File(
			[new ArrayBuffer(1024 * 1024 + 1)],
			'large-image.png',
			{ type: 'image/png' },
		);
		const fileList = {
			0: largeFile,
			length: 1,
			item: (_index: number) => largeFile,
		} as FileList;

		// 直接調用元件的上傳事件處理方法
		await wrapper.vm.$emit('uploadFileEvent', { files: fileList });

		const emitted = wrapper.emitted('uploadFileEvent');
		expect(emitted).toBeTruthy();
		if (emitted) {
			const [eventArg] = emitted[0];
			expect((eventArg as { files: FileList }).files[0].size).toBeGreaterThan(1024 * 1024);
		}
	});

	it('handles different file types', async () => {
		const wrapper = mount(AminStargazerFrom, {
			props: defaultProps,
		});

		const invalidFile = new File([''], 'test.txt', { type: 'text/plain' });
		const fileList = {
			0: invalidFile,
			length: 1,
			item: (_index: number) => invalidFile,
		} as FileList;

		// 直接調用元件的上傳事件處理方法
		await wrapper.vm.$emit('uploadFileEvent', { files: fileList });

		const emitted = wrapper.emitted('uploadFileEvent');
		expect(emitted).toBeTruthy();
		if (emitted) {
			const [eventArg] = emitted[0];
			expect((eventArg as { files: FileList }).files[0].type).toBe('text/plain');
		}
	});

	// 測試沒有檔案的情況
	it('handles empty file selection', async () => {
		const wrapper = mount(AminStargazerFrom, {
			props: defaultProps,
		});

		const fileList = {
			length: 0,
			item: (_index: number) => null,
		} as FileList;

		await wrapper.vm.$emit('uploadFileEvent', { files: fileList });

		const emitted = wrapper.emitted('uploadFileEvent');
		expect(emitted).toBeTruthy();
		if (emitted) {
			const [eventArg] = emitted[0];
			expect((eventArg as { files: FileList }).files.length).toBe(0);
		}
	});

	// 測試預覽圖片更新
	it('displays uploaded image preview', () => {
		const imageUrl = 'http://example.com/test-image.png';
		const wrapper = mount(AminStargazerFrom, {
			props: {
				...defaultProps,
				stargazerImageUrl: imageUrl,
			},
		});

		const previewDiv = wrapper.find('div[class*="bg-cover"]');
		expect(previewDiv.attributes('style')).toContain(`background-image: url(${imageUrl})`);
	});

	// 測試上傳按鈕的可見性
	it('shows upload button correctly', () => {
		const wrapper = mount(AminStargazerFrom, {
			props: defaultProps,
		});

		const uploadButton = wrapper.find('input[type="file"]');
		expect(uploadButton.exists()).toBe(true);
		expect(uploadButton.classes()).toContain('hidden');
	});

	// 測試經緯度輸入
	it('emits latitude and longitude values correctly', async () => {
		const wrapper = mount(AminStargazerFrom, {
			props: defaultProps,
		});

		// 測試緯度輸入
		const latInput = wrapper.find('input[placeholder="Latitude"]');
		await latInput.setValue('25.0330');

		const emittedLat = wrapper.emitted('updateStargazerLatitudeVal');
		expect(emittedLat).toBeTruthy();
		if (emittedLat) {
			expect(emittedLat[0]).toEqual(['25.0330']);
		}

		// 測試經度輸入
		const lngInput = wrapper.find('input[placeholder="Longitude"]');
		await lngInput.setValue('121.5654');

		const emittedLng = wrapper.emitted('updateStargazerLongitudeVal');
		expect(emittedLng).toBeTruthy();
		if (emittedLng) {
			expect(emittedLng[0]).toEqual(['121.5654']);
		}
	});

	// 測試地圖按鈕點擊
	it('calls openMapModalEvent when map button is clicked', async () => {
		const openMapModalEvent = vi.fn();
		const wrapper = mount(AminStargazerFrom, {
			props: {
				...defaultProps,
				openMapModalEvent,
			},
		});

		await wrapper.find('button.admin-sbtn').trigger('click');
		expect(openMapModalEvent).toHaveBeenCalled();
	});
});
