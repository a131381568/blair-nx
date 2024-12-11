import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { TodoContext } from '../context/TodoContext';
import { LanguageProvider } from '../context/providers/LanguageProvider';
import type { TodoContextType } from '../context/types';
import type { TodoItem } from '../types/list';
import { theme } from './styled/theme';
import { TodoList } from './TodoList';

const mockTodos: TodoItem[] = [
	{ id: 1, text: '學習 React 基礎', completed: true },
	{ id: 2, text: '理解 JSX 語法', completed: false },
];

const mockTodoContext: TodoContextType = {
	state: {
		todos: mockTodos,
		loading: false,
		error: null,
		isEditMode: false,
		activeId: null,
	},
	dispatch: vi.fn(),
	activeTodo: undefined,
	api: {
		addTodo: vi.fn(),
		toggleTodo: vi.fn().mockImplementation(() => Promise.resolve()),
		deleteTodo: vi.fn().mockImplementation(() => Promise.resolve()),
		saveTodoList: vi.fn(),
		loadingStates: {},
	},
};

interface ContextOverrides {
	state?: Partial<TodoContextType['state']>;
	api?: Partial<TodoContextType['api']>;
	dispatch?: typeof mockTodoContext.dispatch;
}

const renderWithProviders = (contextOverrides: ContextOverrides = {}) => {
	const contextValue = {
		...mockTodoContext,
		state: { ...mockTodoContext.state, ...contextOverrides.state },
		api: { ...mockTodoContext.api, ...contextOverrides.api },
		dispatch: contextOverrides.dispatch || mockTodoContext.dispatch,
	};

	return render(
		<ThemeProvider theme={theme}>
			<TodoContext.Provider value={contextValue}>
				<LanguageProvider>
					<TodoList />
				</LanguageProvider>
			</TodoContext.Provider>
		</ThemeProvider>,
	);
};

describe('todoList Component', () => {
	it('應該正確渲染標題', () => {
		renderWithProviders();
		expect(screen.getByText('待辦事項清單')).toBeInTheDocument();
	});

	it('當清單為空時應該顯示提示訊息', () => {
		renderWithProviders({
			state: { todos: [] },
		});
		expect(screen.getByText('目前沒有待辦事項')).toBeInTheDocument();
	});

	it('應該正確渲染待辦事項列表', () => {
		renderWithProviders();
		mockTodos.forEach((todo) => {
			expect(screen.getByText(todo.text)).toBeInTheDocument();
		});
	});

	it('應該正確處理待辦事項的完成狀態', async () => {
		const toggleTodo = vi.fn().mockImplementation(() => Promise.resolve());

		renderWithProviders({
			api: { toggleTodo },
		});

		const checkbox = screen.getAllByRole('checkbox')[0];

		await act(async () => {
			fireEvent.click(checkbox);
			await Promise.resolve();
		});

		expect(toggleTodo).toHaveBeenCalledWith(mockTodos[0].id);
	});

	it('應該正確處理待辦事項的刪除', async () => {
		const deleteTodo = vi.fn().mockImplementation(() => Promise.resolve());

		renderWithProviders({
			api: { deleteTodo },
		});

		const deleteButtons = screen.getAllByText('刪除');

		await act(async () => {
			fireEvent.click(deleteButtons[0]);
			await Promise.resolve();
		});

		expect(deleteTodo).toHaveBeenCalledWith(mockTodos[0].id);
	});

	it('應該正確顯示待辦事項統計', () => {
		renderWithProviders();

		expect(screen.getByText(/總計:/)).toHaveTextContent('2');
		expect(screen.getByText('1')).toHaveClass('completed');
	});

	it('選中項目時應正確觸發 dispatch', async () => {
		const dispatch = vi.fn();

		renderWithProviders({
			dispatch,
		});

		await act(async () => {
			fireEvent.click(screen.getByText('學習 React 基礎'));
		});

		expect(dispatch).toHaveBeenCalledWith({
			type: 'SELECT_TODO',
			payload: mockTodos[0].id,
		});
	});

	it('編輯模式下應隱藏刪除按鈕', () => {
		renderWithProviders({
			state: { isEditMode: true },
		});

		const deleteButtons = screen.queryAllByText('刪除');
		expect(deleteButtons).toHaveLength(0);
	});
});
