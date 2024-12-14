import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { LanguageProvider } from '../context/providers/LanguageProvider';
import * as todoStoreModule from '../stores/useTodoStore';
import { theme } from './styled/theme';
import { TodoInput } from './TodoInput';

vi.mock('../stores/useTodoStore', () => ({
	useTodoStore: vi.fn(() => ({
		addTodo: vi.fn(),
		loadingStates: {},
	})),
}));

const renderWithProviders = (storeOverrides = {}) => {
	const store = {
		addTodo: vi.fn(),
		loadingStates: {},
		...storeOverrides,
	};

	vi.mocked(todoStoreModule.useTodoStore).mockReturnValue(store);

	return render(
		<ThemeProvider theme={theme}>
			<LanguageProvider>
				<TodoInput />
			</LanguageProvider>
		</ThemeProvider>,
	);
};

describe('todoInput Component', () => {
	it('應該渲染輸入框和按鈕', () => {
		renderWithProviders();
		expect(screen.getByPlaceholderText('新增待辦')).toBeInTheDocument();
		expect(screen.getByText('新增待辦')).toBeInTheDocument();
	});

	it('初始時按鈕應該被禁用', () => {
		renderWithProviders();
		expect(screen.getByText('新增待辦')).toBeDisabled();
	});

	it('輸入文字後應該啟用按鈕', () => {
		renderWithProviders();
		fireEvent.change(screen.getByPlaceholderText('新增待辦'), {
			target: { value: '新待辦事項' },
		});
		expect(screen.getByText('新增待辦')).toBeEnabled();
	});

	it('按下 Enter 鍵應該觸發新增', async () => {
		const addTodo = vi.fn().mockResolvedValue(undefined);
		renderWithProviders({ addTodo });

		const input = screen.getByPlaceholderText('新增待辦');
		await act(async () => {
			fireEvent.change(input, { target: { value: '新待辦事項' } });
			fireEvent.keyDown(input, { key: 'Enter' });
		});

		expect(addTodo).toHaveBeenCalledWith('新待辦事項');
		expect(input).toHaveValue('');
	});

	it('在加載狀態下應該禁用輸入框和按鈕', () => {
		renderWithProviders({
			loadingStates: { add: true },
		});

		expect(screen.getByPlaceholderText('新增待辦')).toBeDisabled();
		expect(screen.getByText('新增中...')).toBeDisabled();
	});
});
