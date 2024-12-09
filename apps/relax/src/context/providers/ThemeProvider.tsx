import { type ReactNode, useMemo, useState } from 'react';
import { ThemeContext } from '../ThemeContext';

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [isDark, setIsDark] = useState(false);

	const value = useMemo(() => ({
		isDark,
		toggleTheme: () => setIsDark(prev => !prev),
		colors: {
			primary: isDark ? '#90cdf4' : '#196c24',
			background: isDark ? '#1a202c' : '#ffffff',
			text: isDark ? '#e2e8f0' : '#2d3748',
		},
	}), [isDark]);

	return (
		<ThemeContext.Provider value={value}>
			{children}
		</ThemeContext.Provider>
	);
}
