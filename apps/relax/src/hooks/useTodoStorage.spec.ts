import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useTodoStorage } from './useTodoStorage';

describe('useTodoStorage Hook', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('初始化時若 localStorage 為空應使用預設值', () => {
		const initialTodos = [{ id: 1, text: '預設項目', completed: false }];
		const { result } = renderHook(() => useTodoStorage(initialTodos));
		expect(result.current[0]).toEqual(initialTodos);
	});

	it('應從 localStorage 讀取現有資料', () => {
		const storedTodos = [{ id: 1, text: '已存項目', completed: true }];
		localStorage.setItem('todos', JSON.stringify(storedTodos));

		const { result } = renderHook(() => useTodoStorage([]));
		expect(result.current[0]).toEqual(storedTodos);
	});

	it('更新時應同步到 localStorage', () => {
		const { result } = renderHook(() => useTodoStorage([]));
		const newTodo = { id: 1, text: '新項目', completed: false };

		act(() => {
			result.current[1]([newTodo]);
		});

		const stored = JSON.parse(localStorage.getItem('todos') || '[]');
		expect(stored).toEqual([newTodo]);
	});

	it('多次更新應維持資料一致性', () => {
		const { result } = renderHook(() => useTodoStorage([]));

		act(() => {
			result.current[1]([{ id: 1, text: '第一項', completed: false }]);
		});

		act(() => {
			result.current[1](prev => [...prev, { id: 2, text: '第二項', completed: true }]);
		});

		const stored = JSON.parse(localStorage.getItem('todos') || '[]');
		expect(stored).toHaveLength(2);
		expect(stored[1].completed).toBe(true);
	});
});
