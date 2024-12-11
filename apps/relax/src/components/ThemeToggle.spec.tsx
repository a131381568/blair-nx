import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from '../context/providers/ThemeProvider';
import { ThemeToggle } from './ThemeToggle';

describe('themeToggle', () => {
	it('應該正確切換主題', () => {
		render(
			<ThemeProvider>
				<ThemeToggle />
			</ThemeProvider>,
		);

		const button = screen.getByRole('button');
		expect(button).toHaveTextContent('🌙');

		fireEvent.click(button);
		expect(button).toHaveTextContent('🌞');
	});
});
