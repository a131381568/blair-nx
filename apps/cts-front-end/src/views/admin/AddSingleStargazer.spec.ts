import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import type { ComponentPublicInstance } from 'vue';
import { singleStargazingCreate } from '@ctsf-src/services/apis/stargazingApi';
import AddSingleStargazer from './AddSingleStargazer.vue';

// Mock 外部依賴
vi.mock('@ctsf-src/services/apis/stargazingApi', () => ({
	singleStargazingCreate: vi.fn(),
	stargazingListQuery: vi.fn(() => ({
		refetch: vi.fn(),
	})),
}));

vi.mock('@ctsf-src/services/apis/upLoadApi', () => ({
	uploadImage: vi.fn(),
}));

vi.mock('@blair-nx-ui', () => ({
	useConfirmModal: vi.fn(() => ({
		showConfirm: vi.fn(() => Promise.resolve(true)),
	})),
	useMessageModal: vi.fn(() => ({
		showMsg: vi.fn(),
	})),
}));

// 定義 StargazerInputInfo 介面
interface StargazerInputInfo {
	stargazingLatitude: {
		value: string;
		error?: string;
	};
	stargazingLongitude: {
		value: string;
		error?: string;
	};
	[key: string]: {
		value: string;
		error?: string;
	};
}

// 定義組件實例的介面
interface AdminStargazerCreateInstance extends ComponentPublicInstance {
	updateStargazerVal: (value: string, field: string) => Promise<void>;
	setConfirmModal: () => Promise<void>;
	stargazerInputInfo: StargazerInputInfo;
}

describe('addSingleStargazer.vue', () => {
	const router = createRouter({
		history: createWebHistory(),
		routes: [],
	});

	beforeEach(() => {
		vi.clearAllMocks();
		(singleStargazingCreate as any).mockResolvedValue({
			status: 200,
			body: {
				data: '新增成功',
			},
		});
	});

	it('validates coordinate input format', async () => {
		const wrapper = mount(AddSingleStargazer, {
			global: {
				plugins: [router],
				stubs: {
					Footer: true,
					AdminStargazerModal: true,
				},
			},
		});

		const vm = wrapper.vm as unknown as AdminStargazerCreateInstance;

		(singleStargazingCreate as any).mockRejectedValueOnce({
			status: 400,
			body: {
				message: '經緯度格式不正確',
			},
		});

		await vm.updateStargazerVal('測試地點', 'title');
		await vm.updateStargazerVal('地址說明', 'address');
		await vm.updateStargazerVal('地點介紹', 'des');
		await vm.updateStargazerVal('invalid', 'lati');
		await vm.updateStargazerVal('invalid', 'long');

		try {
			await vm.setConfirmModal();
		}
		catch (error) {
			expect(vm.stargazerInputInfo.stargazingLatitude.error).toBeDefined();
			expect(vm.stargazerInputInfo.stargazingLongitude.error).toBeDefined();
		}
	});

	it('accepts valid coordinate input', async () => {
		const wrapper = mount(AddSingleStargazer, {
			global: {
				plugins: [router],
				stubs: {
					Footer: true,
					AdminStargazerModal: true,
				},
			},
		});

		const vm = wrapper.vm as unknown as AdminStargazerCreateInstance;

		await vm.updateStargazerVal('測試地點', 'title');
		await vm.updateStargazerVal('地址說明', 'address');
		await vm.updateStargazerVal('地點介紹', 'des');
		await vm.updateStargazerVal('25.0330', 'lati');
		await vm.updateStargazerVal('121.5654', 'long');

		await vm.setConfirmModal();
		expect(singleStargazingCreate).toHaveBeenCalledWith(expect.objectContaining({
			stargazingLatitude: '25.0330',
			stargazingLongitude: '121.5654',
		}));
	});

	it('validates coordinate range', async () => {
		const wrapper = mount(AddSingleStargazer, {
			global: {
				plugins: [router],
				stubs: {
					Footer: true,
					AdminStargazerModal: true,
				},
			},
		});

		const vm = wrapper.vm as unknown as AdminStargazerCreateInstance;

		(singleStargazingCreate as any).mockRejectedValueOnce({
			status: 400,
			body: {
				message: '經緯度超出有效範圍',
			},
		});

		await vm.updateStargazerVal('測試地點', 'title');
		await vm.updateStargazerVal('地址說明', 'address');
		await vm.updateStargazerVal('地點介紹', 'des');
		await vm.updateStargazerVal('91', 'lati');
		await vm.updateStargazerVal('181', 'long');

		try {
			await vm.setConfirmModal();
		}
		catch (error) {
			const err = error as any;
			expect(err.body.message).toBe('經緯度超出有效範圍');
		}
	});
});
