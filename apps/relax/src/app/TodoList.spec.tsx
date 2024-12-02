import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { theme } from '../components/styled/theme';
import type { TodoItem } from '../types/list';
import { TodoList } from './TodoList';

// 測試資料
const mockTodos: TodoItem[] = [
	{ id: 1, text: '學習 React 基礎', completed: true },
	{ id: 2, text: '理解 JSX 語法', completed: false },
];

// 包裝元件以提供 theme
const renderWithTheme = (component: React.ReactNode) => {
	return render(
		<ThemeProvider theme={theme}>
			{component}
		</ThemeProvider>,
	);
};

describe('todoList Component', () => {
	it('應該正確渲染標題', () => {
		renderWithTheme(<TodoList items={[]} />);
		expect(screen.getByText('待辦事項清單')).toBeInTheDocument();
	});

	it('應該顯示自定義標題', () => {
		const customTitle = '我的待辦清單';
		renderWithTheme(<TodoList title={customTitle} items={[]} />);
		expect(screen.getByText(customTitle)).toBeInTheDocument();
	});

	it('當清單為空時應該顯示提示訊息', () => {
		renderWithTheme(<TodoList items={[]} />);
		expect(screen.getByText('目前沒有待辦事項')).toBeInTheDocument();
	});

	it('應該正確渲染待辦事項列表', () => {
		renderWithTheme(<TodoList items={mockTodos} />);
		mockTodos.forEach((todo) => {
			expect(screen.getByText(todo.text)).toBeInTheDocument();
		});
	});

	it('應該正確處理待辦事項的完成狀態', () => {
		const onToggle = vi.fn();
		renderWithTheme(
			<TodoList items={mockTodos} onToggle={onToggle} />,
		);

		const checkboxes = screen.getAllByRole('checkbox');
		fireEvent.click(checkboxes[0]);

		expect(onToggle).toHaveBeenCalledWith(mockTodos[0].id);
	});

	it('應該正確處理待辦事項的刪除', () => {
		const onDelete = vi.fn();
		renderWithTheme(
			<TodoList items={mockTodos} onDelete={onDelete} />,
		);

		const deleteButtons = screen.getAllByText('刪除');
		fireEvent.click(deleteButtons[0]);

		expect(onDelete).toHaveBeenCalledWith(mockTodos[0].id);
	});

	it('應該正確顯示待辦事項統計', () => {
		renderWithTheme(<TodoList items={mockTodos} />);

		const statsDiv = screen.getByText(/總計:/);
		expect(statsDiv).toHaveTextContent('2');
		expect(statsDiv).toHaveTextContent('項');

		const completedSpan = screen.getByText('1');
		expect(completedSpan).toHaveClass('completed');
	});
});
