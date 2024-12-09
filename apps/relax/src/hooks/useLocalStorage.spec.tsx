import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('讀取初始值', () => {
		const { result } = renderHook(() => useLocalStorage('theme', false));
		expect(result.current[0]).toBe(false);
	});

	it('讀取已存在的值', () => {
		localStorage.setItem('theme', JSON.stringify(true));
		const { result } = renderHook(() => useLocalStorage('theme', false));
		expect(result.current[0]).toBe(true);
	});

	it('更新值時同步到 localStorage', () => {
		const { result } = renderHook(() => useLocalStorage('language', 'zh'));

		act(() => {
			result.current[1]('en');
		});

		expect(JSON.parse(localStorage.getItem('language')!)).toBe('en');
		expect(result.current[0]).toBe('en');
	});
});
