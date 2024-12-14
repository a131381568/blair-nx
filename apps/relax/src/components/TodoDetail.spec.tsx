import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { LanguageProvider } from '../context/providers/LanguageProvider';
import * as todoStoreModule from '../stores/useTodoStore';
import type { TodoItem } from '../types/list';
import { theme } from './styled/theme';
import { TodoDetail } from './TodoDetail';

const mockTodo: TodoItem = {
	id: 1,
	text: '測試待辦事項',
	completed: false,
};

vi.mock('../stores/useTodoStore', () => ({
	useTodoStore: vi.fn(() => ({
		todos: [mockTodo],
		activeId: mockTodo.id,
		toggleTodo: vi.fn(),
		deleteTodo: vi.fn(),
		loadingStates: {},
	})),
}));

const renderTodoDetail = (storeOverrides = {}) => {
	const store = {
		todos: [mockTodo],
		activeId: mockTodo.id,
		toggleTodo: vi.fn(),
		deleteTodo: vi.fn(),
		loadingStates: {},
		...storeOverrides,
	};

	vi.mocked(todoStoreModule.useTodoStore).mockReturnValue(store);

	return render(
		<ThemeProvider theme={theme}>
			<LanguageProvider>
				<TodoDetail />
			</LanguageProvider>
		</ThemeProvider>,
	);
};

describe('todoDetail Component', () => {
	it('當沒有選中項目時不應渲染', () => {
		renderTodoDetail({ activeId: null });
		expect(screen.queryByText(mockTodo.text)).not.toBeInTheDocument();
	});

	it('應該渲染待辦事項詳細資訊', () => {
		renderTodoDetail();
		expect(screen.getByText(mockTodo.text)).toBeInTheDocument();
		const detailStateContainer = screen.getByTestId('detail-state');
		expect(detailStateContainer).toBeInTheDocument();
		expect(detailStateContainer).toHaveTextContent('未完成');
	});

	it('切換完成狀態時應該顯示正確的按鈕文字', () => {
		const completedTodo = { ...mockTodo, completed: true };
		renderTodoDetail({
			todos: [completedTodo],
			activeId: completedTodo.id,
		});

		expect(screen.getByText('標記未完成')).toBeInTheDocument();
		const detailStateContainer = screen.getByTestId('detail-state');
		expect(detailStateContainer).toHaveTextContent('已完成');
	});

	it('點擊標記完成按鈕應該觸發 toggleTodo', () => {
		const toggleTodo = vi.fn();
		renderTodoDetail({ toggleTodo });

		fireEvent.click(screen.getByText('標記已完成'));
		expect(toggleTodo).toHaveBeenCalledWith(mockTodo.id);
	});

	it('點擊刪除按鈕應該觸發 deleteTodo', () => {
		const deleteTodo = vi.fn();
		renderTodoDetail({ deleteTodo });

		fireEvent.click(screen.getByText('刪除'));
		expect(deleteTodo).toHaveBeenCalledWith(mockTodo.id);
	});

	it('在載入狀態下應該禁用按鈕', () => {
		renderTodoDetail({
			loadingStates: {
				[`toggle-${mockTodo.id}`]: true,
				[`delete-${mockTodo.id}`]: true,
			},
		});

		expect(screen.getByText('處理中...')).toBeDisabled();
		expect(screen.getByText('刪除中...')).toBeDisabled();
	});
});
