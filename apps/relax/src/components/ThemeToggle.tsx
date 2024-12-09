import { useThemeContext } from '../hooks/useContexts';

export function ThemeToggle() {
	const { isDark, toggleTheme } = useThemeContext();

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md ml-2"
		>
			{isDark ? '🌞' : '🌙'}
		</button>
	);
}
