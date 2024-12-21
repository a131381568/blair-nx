import { useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import { router } from '../routes';
import { theme } from '../components/styled/theme';
import { TodoListSkeleton } from '../components/TodoListSkeleton';
import { AddButton } from '../components/styled/TodoInputStyle';
import { TodoList } from '../components/TodoList';
import { TodoInput } from '../components/TodoInput';
import { TodoDetail } from '../components/TodoDetail';
import { useLanguageContext } from '../hooks/useContexts';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { LanguageProvider } from '../context/providers/LanguageProvider';
import { ThemeToggle } from '../components/ThemeToggle';
import { ThemeProvider } from '../context/providers/ThemeProvider';
import { useTodoStore } from '../stores/useTodoStore';
import { TodoAPI } from '../api/todo';

export function App() {
	return (
		<StyledThemeProvider theme={theme}>
			<ThemeProvider>
				<LanguageProvider>
					<RouterProvider router={router} />
				</LanguageProvider>
			</ThemeProvider>
		</StyledThemeProvider>
	);
}

export default App;
