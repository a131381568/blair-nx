import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme } from '../components/styled/theme';
import { TodoListSkeleton } from '../components/TodoListSkeleton';
import { AddButton } from '../components/styled/TodoInputStyle';
import { TodoList } from '../components/TodoList';
import { TodoInput } from '../components/TodoInput';
import { TodoDetail } from '../components/TodoDetail';
import { TodoProvider } from '../context/providers/TodoProvider';
import { useLanguageContext, useTodoContext } from '../hooks/useContexts';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { LanguageProvider } from '../context/providers/LanguageProvider';
import { ThemeToggle } from '../components/ThemeToggle';
import { ThemeProvider } from '../context/providers/ThemeProvider';

export function App() {
	return (
		<StyledThemeProvider theme={theme}>
			<ThemeProvider>
				<LanguageProvider>
					<TodoProvider>
						<TodoApp />
					</TodoProvider>
				</LanguageProvider>
			</ThemeProvider>
		</StyledThemeProvider>
	);
}

function TodoApp() {
	const { t } = useLanguageContext();
	const { state, dispatch, activeTodo, api } = useTodoContext();
	const { loading, error, isEditMode } = state;

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
			{activeTodo && !isEditMode && <TodoDetail />}
			<AddButton
				className="mt-5"
				onClick={async () => {
					try {
						dispatch({ type: 'TOGGLE_MODE' });
						if (!isEditMode) {
							await api.saveTodoList(state.todos);
						}
					}
					catch (err) {
						console.error(err);
					}
				}}
			>
				{isEditMode ? t('editMode') : (api.loadingStates.save ? '儲存中...' : t('saveList'))}
			</AddButton>
		</div>
	);
}

export default App;
