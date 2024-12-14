import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { LanguageProvider } from '../context/providers/LanguageProvider';
import * as todoStoreModule from '../stores/useTodoStore';
import { theme } from './styled/theme';
import { TodoList } from './TodoList';

const mockTodos = [
	{ id: 1, text: '學習 React 基礎', completed: true },
	{ id: 2, text: '理解 JSX 語法', completed: false },
];

vi.mock('../stores/useTodoStore', () => ({
	useTodoStore: vi.fn(() => ({
		todos: mockTodos,
		activeId: null,
		isEditMode: false,
		loadingStates: {},
		toggleTodo: vi.fn(),
		deleteTodo: vi.fn(),
		selectTodo: vi.fn(),
	})),
}));

const renderWithProviders = (storeOverrides = {}) => {
	const store = {
		todos: mockTodos,
		activeId: null,
		isEditMode: false,
		loadingStates: {},
		toggleTodo: vi.fn(),
		deleteTodo: vi.fn(),
		selectTodo: vi.fn(),
		...storeOverrides,
	};

	vi.mocked(todoStoreModule.useTodoStore).mockReturnValue(store);

	return render(
		<ThemeProvider theme={theme}>
			<LanguageProvider>
				<TodoList />
			</LanguageProvider>
		</ThemeProvider>,
	);
};

describe('todoList Component', () => {
	it('應該正確渲染標題', () => {
		renderWithProviders();
		expect(screen.getByText('待辦事項清單')).toBeInTheDocument();
	});

	it('當清單為空時應該顯示提示訊息', () => {
		renderWithProviders({ todos: [] });
		expect(screen.getByText('目前沒有待辦事項')).toBeInTheDocument();
	});

	it('應該正確渲染待辦事項列表', () => {
		renderWithProviders();
		mockTodos.forEach((todo) => {
			expect(screen.getByText(todo.text)).toBeInTheDocument();
		});
	});

	it('應該正確處理待辦事項的完成狀態', async () => {
		const toggleTodo = vi.fn();
		renderWithProviders({ toggleTodo });

		await act(async () => {
			fireEvent.click(screen.getAllByRole('checkbox')[0]);
		});

		expect(toggleTodo).toHaveBeenCalledWith(mockTodos[0].id);
	});

	it('應該正確處理待辦事項的刪除', async () => {
		const deleteTodo = vi.fn();
		renderWithProviders({ deleteTodo });

		await act(async () => {
			fireEvent.click(screen.getAllByText('刪除')[0]);
		});

		expect(deleteTodo).toHaveBeenCalledWith(mockTodos[0].id);
	});

	it('選中項目時應正確觸發選擇動作', async () => {
		const selectTodo = vi.fn();
		renderWithProviders({ selectTodo });

		await act(async () => {
			fireEvent.click(screen.getByText('學習 React 基礎'));
		});

		expect(selectTodo).toHaveBeenCalledWith(mockTodos[0].id);
	});

	it('編輯模式下應隱藏刪除按鈕', () => {
		renderWithProviders({ isEditMode: true });
		expect(screen.queryAllByText('刪除')).toHaveLength(0);
	});

	it('應該正確顯示待辦事項統計', () => {
		renderWithProviders();
		expect(screen.getByText(/總計:/)).toBeInTheDocument();
		expect(screen.getByText('1')).toHaveClass('completed');
	});
});
