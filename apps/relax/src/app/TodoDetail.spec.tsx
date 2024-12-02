import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { theme } from '../components/styled/theme';
import type { TodoItem } from '../types/list';
import { TodoDetail } from './TodoDetail';

const mockTodo: TodoItem = {
	id: 1,
	text: '測試待辦事項',
	completed: false,
};

const renderWithTheme = (component: React.ReactNode) => (
	render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
);

describe('todoDetail Component', () => {
	it('應該渲染待辦事項詳細資訊', () => {
		renderWithTheme(
			<TodoDetail
				item={mockTodo}
				onToggle={() => {}}
				onDelete={() => {}}
			/>,
		);

		expect(screen.getByText(mockTodo.text)).toBeInTheDocument();
		expect(screen.getByText('狀態: 未完成')).toBeInTheDocument();
	});

	it('切換完成狀態時應該顯示正確的按鈕文字', () => {
		const completedTodo = { ...mockTodo, completed: true };
		renderWithTheme(
			<TodoDetail
				item={completedTodo}
				onToggle={() => {}}
				onDelete={() => {}}
			/>,
		);

		expect(screen.getByText('標記未完成')).toBeInTheDocument();
		expect(screen.getByText('狀態: 已完成')).toBeInTheDocument();
	});

	it('點擊標記完成按鈕應該觸發 onToggle', () => {
		const onToggle = vi.fn();
		renderWithTheme(
			<TodoDetail
				item={mockTodo}
				onToggle={onToggle}
				onDelete={() => {}}
			/>,
		);

		fireEvent.click(screen.getByText('標記完成'));
		expect(onToggle).toHaveBeenCalledWith(mockTodo.id);
	});

	it('點擊刪除按鈕應該觸發 onDelete', () => {
		const onDelete = vi.fn();
		renderWithTheme(
			<TodoDetail
				item={mockTodo}
				onToggle={() => {}}
				onDelete={onDelete}
			/>,
		);

		fireEvent.click(screen.getByText('刪除'));
		expect(onDelete).toHaveBeenCalledWith(mockTodo.id);
	});
});
