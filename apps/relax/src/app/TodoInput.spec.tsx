import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { theme } from '../components/styled/theme';
import { TodoInput } from './TodoInput';

const renderWithTheme = (component: React.ReactNode) => {
	return render(
		<ThemeProvider theme={theme}>
			{component}
		</ThemeProvider>,
	);
};

describe('todoInput Component', () => {
	it('應該渲染輸入框和按鈕', () => {
		renderWithTheme(<TodoInput onAdd={() => {}} />);

		expect(screen.getByTestId('todo-input')).toBeInTheDocument();
		expect(screen.getByTestId('add-button')).toBeInTheDocument();
	});

	it('初始時按鈕應該被禁用', () => {
		renderWithTheme(<TodoInput onAdd={() => {}} />);

		expect(screen.getByTestId('add-button')).toBeDisabled();
	});

	it('輸入文字後應該啟用按鈕', () => {
		renderWithTheme(<TodoInput onAdd={() => {}} />);

		const input = screen.getByTestId('todo-input');
		fireEvent.change(input, { target: { value: '新待辦事項' } });

		expect(screen.getByTestId('add-button')).toBeEnabled();
	});

	it('按下 Enter 鍵應該觸發新增', () => {
		const onAdd = vi.fn();
		renderWithTheme(<TodoInput onAdd={onAdd} />);

		const input = screen.getByTestId('todo-input');
		fireEvent.change(input, { target: { value: '新待辦事項' } });
		fireEvent.keyDown(input, { key: 'Enter' });

		expect(onAdd).toHaveBeenCalledWith('新待辦事項');
		expect(input).toHaveValue('');
	});

	it('點擊按鈕應該觸發新增', () => {
		const onAdd = vi.fn();
		renderWithTheme(<TodoInput onAdd={onAdd} />);

		const input = screen.getByTestId('todo-input');
		const button = screen.getByTestId('add-button');

		fireEvent.change(input, { target: { value: '新待辦事項' } });
		fireEvent.click(button);

		expect(onAdd).toHaveBeenCalledWith('新待辦事項');
		expect(input).toHaveValue('');
	});

	it('不應該新增空白的待辦事項', () => {
		const onAdd = vi.fn();
		renderWithTheme(<TodoInput onAdd={onAdd} />);

		const input = screen.getByTestId('todo-input');
		const button = screen.getByTestId('add-button');

		fireEvent.change(input, { target: { value: '   ' } });
		fireEvent.click(button);

		expect(onAdd).not.toHaveBeenCalled();
	});
});
