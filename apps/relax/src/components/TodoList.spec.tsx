import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { LanguageProvider } from '../context/providers/LanguageProvider';
import type { TodoItem } from '../types/list';
import { theme } from './styled/theme';
import { TodoList } from './TodoList';

const mockTodos: TodoItem[] = [
	{ id: 1, text: '學習 React 基礎', completed: true },
	{ id: 2, text: '理解 JSX 語法', completed: false },
];

const defaultProps = {
	items: [] as TodoItem[],
	onToggle: vi.fn(),
	onDelete: vi.fn(),
	onSelect: vi.fn(),
	isDisable: false,
};

const renderWithTheme = (component: React.ReactNode) => {
	return render(
		<ThemeProvider theme={theme}>
			<LanguageProvider>
				{component}
			</LanguageProvider>
		</ThemeProvider>,
	);
};

describe('todoList Component', () => {
	it('應該正確渲染標題', () => {
		renderWithTheme(<TodoList {...defaultProps} />);
		expect(screen.getByText('待辦事項清單')).toBeInTheDocument();
	});

	it('應該顯示自定義標題', () => {
		const customTitle = '我的待辦清單';
		renderWithTheme(<TodoList {...defaultProps} title={customTitle} />);
		expect(screen.getByText(customTitle)).toBeInTheDocument();
	});

	it('當清單為空時應該顯示提示訊息', () => {
		renderWithTheme(<TodoList {...defaultProps} />);
		expect(screen.getByText('目前沒有待辦事項')).toBeInTheDocument();
	});

	it('應該正確渲染待辦事項列表', () => {
		renderWithTheme(<TodoList {...defaultProps} items={mockTodos} />);
		mockTodos.forEach((todo) => {
			expect(screen.getByText(todo.text)).toBeInTheDocument();
		});
	});

	it('應該正確處理待辦事項的完成狀態', () => {
		const onToggle = vi.fn();
		renderWithTheme(
			<TodoList {...defaultProps} items={mockTodos} onToggle={onToggle} />,
		);

		const checkboxes = screen.getAllByRole('checkbox');
		fireEvent.click(checkboxes[0]);

		expect(onToggle).toHaveBeenCalledWith(mockTodos[0].id);
	});

	it('應該正確處理待辦事項的刪除', () => {
		const onDelete = vi.fn();
		renderWithTheme(
			<TodoList {...defaultProps} items={mockTodos} onDelete={onDelete} />,
		);

		const deleteButtons = screen.getAllByText('刪除');
		fireEvent.click(deleteButtons[0]);

		expect(onDelete).toHaveBeenCalledWith(mockTodos[0].id);
	});

	it('應該正確顯示待辦事項統計', () => {
		renderWithTheme(<TodoList {...defaultProps} items={mockTodos} />);

		const statsDiv = screen.getByText(/總計:/);
		expect(statsDiv).toHaveTextContent('2');
		expect(statsDiv).toHaveTextContent('項');

		const completedSpan = screen.getByText('1');
		expect(completedSpan).toHaveClass('completed');
	});

	it('應該正確處理選中狀態', () => {
		const onSelect = vi.fn();
		renderWithTheme(
			<TodoList
				{...defaultProps}
				items={mockTodos}
				activeId={1}
				onSelect={onSelect}
			/>,
		);

		const listItems = screen.getAllByRole('listitem');
		expect(listItems[0]).toHaveStyle({ borderColor: theme.colors.primary });

		fireEvent.click(listItems[1]);
		expect(onSelect).toHaveBeenCalledWith(mockTodos[1].id);
	});

	it('點擊按鈕時不應該觸發選中', () => {
		const onSelect = vi.fn();
		const onDelete = vi.fn();
		renderWithTheme(
			<TodoList
				{...defaultProps}
				items={mockTodos}
				onDelete={onDelete}
				onSelect={onSelect}
			/>,
		);

		const deleteButton = screen.getAllByText('刪除')[0];
		fireEvent.click(deleteButton);

		expect(onSelect).not.toHaveBeenCalled();
		expect(onDelete).toHaveBeenCalledWith(mockTodos[0].id);
	});
});
