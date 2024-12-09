import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { LanguageProvider } from '../context/providers/LanguageProvider';
import { theme } from './styled/theme';
import { TodoInput } from './TodoInput';

const renderWithProviders = (component: React.ReactNode) => {
	return render(
		<ThemeProvider theme={theme}>
			<LanguageProvider>
				{component}
			</LanguageProvider>
		</ThemeProvider>,
	);
};

describe('todoInput Component', () => {
	it('應該渲染輸入框和按鈕', () => {
		renderWithProviders(<TodoInput onAdd={() => {}} />);

		expect(screen.getByPlaceholderText('新增待辦')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: '新增待辦' })).toBeInTheDocument();
	});

	it('初始時按鈕應該被禁用', () => {
		renderWithProviders(<TodoInput onAdd={() => {}} />);

		expect(screen.getByRole('button', { name: '新增待辦' })).toBeDisabled();
	});

	it('輸入文字後應該啟用按鈕', () => {
		renderWithProviders(<TodoInput onAdd={() => {}} />);

		const input = screen.getByPlaceholderText('新增待辦') as HTMLInputElement;
		fireEvent.change(input, { target: { value: '新待辦事項' } });

		expect(screen.getByRole('button', { name: '新增待辦' })).toBeEnabled();
	});

	it('按下 Enter 鍵應該觸發新增', () => {
		const onAdd = vi.fn();
		renderWithProviders(<TodoInput onAdd={onAdd} />);

		const input = screen.getByPlaceholderText('新增待辦') as HTMLInputElement;
		fireEvent.change(input, { target: { value: '新待辦事項' } });
		fireEvent.keyDown(input, { key: 'Enter' });

		expect(onAdd).toHaveBeenCalledWith('新待辦事項');
		expect(input.value).toBe('');
	});

	it('點擊按鈕應該觸發新增', () => {
		const onAdd = vi.fn();
		renderWithProviders(<TodoInput onAdd={onAdd} />);

		const input = screen.getByPlaceholderText('新增待辦') as HTMLInputElement;
		const button = screen.getByRole('button', { name: '新增待辦' });

		fireEvent.change(input, { target: { value: '新待辦事項' } });
		fireEvent.click(button);

		expect(onAdd).toHaveBeenCalledWith('新待辦事項');
		expect(input.value).toBe('');
	});
});
