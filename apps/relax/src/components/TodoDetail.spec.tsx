import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { TodoContext } from '../context/TodoContext';
import type { TodoContextType } from '../context/types';
import type { TodoItem } from '../types/list';
import { translations } from '../constants/language-translations';
import { LanguageProvider } from '../context/providers/LanguageProvider';
import { TodoDetail } from './TodoDetail';
import { theme } from './styled/theme';

const mockTodo: TodoItem = {
	id: 1,
	text: '測試待辦事項',
	completed: false,
};

const mockContext = (overrides: Partial<TodoContextType> = {}): TodoContextType => ({
	state: {
		todos: [mockTodo],
		loading: false,
		error: null,
		isEditMode: false,
		activeId: mockTodo.id,
	},
	dispatch: vi.fn(),
	activeTodo: mockTodo,
	api: {
		addTodo: vi.fn(),
		toggleTodo: vi.fn(),
		deleteTodo: vi.fn(),
		saveTodoList: vi.fn(),
		loadingStates: {},
	},
	...overrides,
});

const renderTodoDetail = (contextOverrides: Partial<TodoContextType> = {}) => {
	return render(
		<ThemeProvider theme={theme}>
			<TodoContext.Provider value={mockContext(contextOverrides)}>
				<LanguageProvider>
					<TodoDetail />
				</LanguageProvider>
			</TodoContext.Provider>
		</ThemeProvider>,
	);
};

describe('todoDetail Component', () => {
	it('當沒有選中項目時不應渲染', () => {
		renderTodoDetail({ activeTodo: undefined });
		expect(screen.queryByText(mockTodo.text)).not.toBeInTheDocument();
	});

	it('應該渲染待辦事項詳細資訊', () => {
		renderTodoDetail();
		expect(screen.getByText(mockTodo.text)).toBeInTheDocument();
		expect(screen.getByText(`${translations.zh.detailState}: ${translations.zh.detailInCompleted}`)).toBeInTheDocument();
	});

	it('切換完成狀態時應該顯示正確的按鈕文字', () => {
		const completedTodo = { ...mockTodo, completed: true };
		renderTodoDetail({
			activeTodo: completedTodo,
			state: { ...mockContext().state, todos: [completedTodo] },
		});

		expect(screen.getByText(translations.zh.detailMarkInCompleted)).toBeInTheDocument();
		expect(screen.getByText(`${translations.zh.detailState}: ${translations.zh.detailCompleted}`)).toBeInTheDocument();
	});

	it('點擊標記完成按鈕應該觸發 dispatch', () => {
		const dispatch = vi.fn();
		renderTodoDetail({ dispatch });

		fireEvent.click(screen.getByText(translations.zh.detailMarkCompleted));
		expect(dispatch).toHaveBeenCalledWith({ type: 'TOGGLE_TODO', payload: mockTodo.id });
	});

	it('點擊刪除按鈕應該觸發 dispatch', () => {
		const dispatch = vi.fn();
		renderTodoDetail({ dispatch });

		fireEvent.click(screen.getByText(translations.zh.deleteTodo));
		expect(dispatch).toHaveBeenCalledWith({ type: 'DELETE_TODO', payload: mockTodo.id });
	});
});
