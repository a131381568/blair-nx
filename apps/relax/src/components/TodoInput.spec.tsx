import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { TodoContext } from '../context/TodoContext';
import { LanguageProvider } from '../context/providers/LanguageProvider';
import type { TodoContextType } from '../context/types';
import { theme } from './styled/theme';
import { TodoInput } from './TodoInput';

interface ContextOverrides {
	api?: Partial<TodoContextType['api']>;
}

const mockTodoContext: TodoContextType = {
	state: {
		todos: [],
		loading: false,
		error: null,
		isEditMode: false,
		activeId: null,
	},
	dispatch: vi.fn(),
	activeTodo: undefined,
	api: {
		addTodo: vi.fn().mockImplementation(() => Promise.resolve()),
		toggleTodo: vi.fn(),
		deleteTodo: vi.fn(),
		saveTodoList: vi.fn(),
		loadingStates: {},
	},
};

const renderWithProviders = (contextOverrides: ContextOverrides = {}) => {
	const contextValue = {
		...mockTodoContext,
		api: { ...mockTodoContext.api, ...contextOverrides.api },
	};

	return render(
		<ThemeProvider theme={theme}>
			<TodoContext.Provider value={contextValue}>
				<LanguageProvider>
					<TodoInput />
				</LanguageProvider>
			</TodoContext.Provider>
		</ThemeProvider>,
	);
};

describe('todoInput Component', () => {
	it('應該渲染輸入框和按鈕', () => {
		renderWithProviders();
		expect(screen.getByPlaceholderText('新增待辦')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: '新增待辦' })).toBeInTheDocument();
	});

	it('初始時按鈕應該被禁用', () => {
		renderWithProviders();
		expect(screen.getByRole('button', { name: '新增待辦' })).toBeDisabled();
	});

	it('輸入文字後應該啟用按鈕', () => {
		renderWithProviders();

		act(() => {
			fireEvent.change(screen.getByPlaceholderText('新增待辦'), {
				target: { value: '新待辦事項' },
			});
		});

		expect(screen.getByRole('button', { name: '新增待辦' })).toBeEnabled();
	});

	it('按下 Enter 鍵應該觸發新增', async () => {
		const addTodo = vi.fn().mockImplementation(() => Promise.resolve());
		renderWithProviders({
			api: { addTodo },
		});

		const input = screen.getByPlaceholderText('新增待辦');

		await act(async () => {
			fireEvent.change(input, { target: { value: '新待辦事項' } });
			fireEvent.keyDown(input, { key: 'Enter' });
			// 等待 Promise resolve
			await Promise.resolve();
		});

		expect(addTodo).toHaveBeenCalledWith('新待辦事項');
		expect(input).toHaveValue('');
	});

	it('點擊按鈕應該觸發新增', async () => {
		const addTodo = vi.fn().mockImplementation(() => Promise.resolve());
		renderWithProviders({
			api: { addTodo },
		});

		const input = screen.getByPlaceholderText('新增待辦');
		const button = screen.getByRole('button', { name: '新增待辦' });

		await act(async () => {
			fireEvent.change(input, { target: { value: '新待辦事項' } });
			fireEvent.click(button);
			// 等待 Promise resolve
			await Promise.resolve();
		});

		expect(addTodo).toHaveBeenCalledWith('新待辦事項');
		expect(input).toHaveValue('');
	});
});
