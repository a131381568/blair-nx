import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { FocusedInput, type InputHandle } from './FocusedInput';
import { theme } from './styled/theme';

const renderWithTheme = (ui: React.ReactElement) => {
	return render(
		<ThemeProvider theme={theme}>{ui}</ThemeProvider>,
	);
};

describe('focusedInput', () => {
	it('應該正確渲染輸入框', () => {
		renderWithTheme(<FocusedInput placeholder="測試輸入" />);
		expect(screen.getByPlaceholderText('測試輸入')).toBeInTheDocument();
	});

	it('應該正確處理值的變化', () => {
		const onValueChange = vi.fn();
		renderWithTheme(<FocusedInput onValueChange={onValueChange} />);

		const input = screen.getByRole('textbox');
		fireEvent.change(input, { target: { value: 'test' } });

		expect(onValueChange).toHaveBeenCalledWith('test');
	});

	it('ref 方法應該正確運作', () => {
		const ref = { current: null } as React.MutableRefObject<InputHandle | null>;
		renderWithTheme(<FocusedInput ref={ref} />);

		// 等待 ref 被設置
		expect(ref.current).not.toBeNull();
		expect(typeof ref.current?.focus).toBe('function');
		expect(typeof ref.current?.clear).toBe('function');
		expect(typeof ref.current?.getValue).toBe('function');
	});

	// 測試受控組件行為
	it('應該作為受控組件正確運作', () => {
		const onValueChange = vi.fn();
		const { rerender } = renderWithTheme(
			<FocusedInput value="initial" onValueChange={onValueChange} />,
		);

		const input = screen.getByRole('textbox');
		expect(input).toHaveValue('initial');

		// 測試外部更新
		act(() => {
			rerender(
				<ThemeProvider theme={theme}>
					<FocusedInput value="updated" onValueChange={onValueChange} />
				</ThemeProvider>,
			);
		});

		expect(input).toHaveValue('updated');
	});

	// 測試清除功能
	it('clear 方法應該正確清除輸入值並觸發 onValueChange', () => {
		const onValueChange = vi.fn();
		const ref = { current: null } as React.MutableRefObject<InputHandle | null>;

		renderWithTheme(<FocusedInput ref={ref} onValueChange={onValueChange} />);

		// 先設置值
		act(() => {
			fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
		});

		// 清除值
		act(() => {
			ref.current?.clear();
		});

		expect(screen.getByRole('textbox')).toHaveValue('');
		expect(onValueChange).toHaveBeenLastCalledWith('');
	});

	// 測試 focus 方法
	it('focus 方法應該正確聚焦輸入框', () => {
		const ref = { current: null } as { current: InputHandle | null };
		renderWithTheme(<FocusedInput ref={ref} />);

		const input = screen.getByRole('textbox');
		ref.current?.focus();

		expect(input).toHaveFocus();
	});

	// 測試 getValue 方法
	it('getValue 方法應該返回當前輸入值', () => {
		const ref = { current: null } as React.MutableRefObject<InputHandle | null>;
		renderWithTheme(<FocusedInput ref={ref} />);

		const input = screen.getByRole('textbox');
		fireEvent.change(input, { target: { value: 'test value' } });

		expect(ref.current?.getValue()).toBe('test value');
	});

	// 測試空值和特殊字符
	it('應該正確處理空值和特殊字符', () => {
		const onValueChange = vi.fn();
		const { rerender } = renderWithTheme(
			<FocusedInput
				value="initial"
				onValueChange={onValueChange}
			/>,
		);

		const input = screen.getByRole('textbox') as HTMLInputElement;

		// 測試空值
		rerender(
			<ThemeProvider theme={theme}>
				<FocusedInput
					value=""
					onValueChange={onValueChange}
				/>
			</ThemeProvider>,
		);
		expect(input.value).toBe('');

		// 測試中文
		rerender(
			<ThemeProvider theme={theme}>
				<FocusedInput
					value="你好世界"
					onValueChange={onValueChange}
				/>
			</ThemeProvider>,
		);
		expect(input.value).toBe('你好世界');
	});

	// 測試禁用狀態
	it('在禁用狀態下應該正確運作', () => {
		renderWithTheme(<FocusedInput disabled />);

		const input = screen.getByRole('textbox');
		expect(input).toBeDisabled();

		// 確保禁用狀態下無法輸入
		fireEvent.change(input, { target: { value: 'test' } });
		expect(input).toHaveValue('');
	});
});
