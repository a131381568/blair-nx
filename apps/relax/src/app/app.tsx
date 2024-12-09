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
	const {
		loading,
		error,
		todos,
		isEditMode,
		activeId,
		handleAdd,
		handleToggle,
		handleDelete,
		handleSelect,
		activeTodo,
		toggleMode,
	} = useTodoContext();

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
			{!isEditMode && (<TodoInput onAdd={handleAdd} />)}
			<TodoList
				items={todos}
				activeId={activeId}
				onToggle={handleToggle}
				onDelete={handleDelete}
				onSelect={handleSelect}
				isDisable={isEditMode}
			/>
			{activeTodo && !isEditMode && (
				<TodoDetail
					item={activeTodo}
					onToggle={handleToggle}
					onDelete={handleDelete}
					isDisable={isEditMode}
				/>
			)}
			<AddButton className="mt-5" onClick={toggleMode}>
				{ isEditMode ? t('editMode') : t('saveList') }
			</AddButton>
		</div>
	);
}

export default App;
