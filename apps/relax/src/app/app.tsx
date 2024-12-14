import { useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
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
					<TodoApp />
				</LanguageProvider>
			</ThemeProvider>
		</StyledThemeProvider>
	);
}

function TodoApp() {
	const { t } = useLanguageContext();
	const {
		loading,
		error,
		isEditMode,
		setTodos,
		setLoading,
		setError,
		toggleEditMode,
		saveTodoList,
		loadingStates,
	} = useTodoStore();

	useEffect(() => {
		let mounted = true;

		async function fetchTodos() {
			try {
				const data = await TodoAPI.getAll();
				if (mounted) {
					setTodos(data);
					setError(null);
				}
			}
			catch (err) {
				if (mounted) {
					setError(err instanceof Error ? err : new Error('Failed to fetch todos'));
				}
			}
			finally {
				if (mounted) {
					setLoading(false);
				}
			}
		}

		fetchTodos();
		return () => {
			mounted = false;
		};
	}, [setTodos, setError, setLoading]);

	if (error) {
		return (
			<div className="text-red-500">
				Error:
				{error.message}
			</div>
		);
	}

	if (loading)
		return <TodoListSkeleton />;

	return (
		<div className="app max-w-2xl mx-auto mt-8 px-4">
			<div className="flex justify-end mb-4">
				<LanguageSwitcher />
				<ThemeToggle />
			</div>
			{!isEditMode && <TodoInput />}
			<TodoList />
			{!isEditMode && <TodoDetail />}
			<AddButton
				className="mt-5"
				onClick={async () => {
					toggleEditMode();
					if (!isEditMode) {
						await saveTodoList();
					}
				}}
			>
				{isEditMode ? t('editMode') : (loadingStates.save ? t('saveIng') : t('saveList'))}
			</AddButton>
		</div>
	);
}

export default App;
