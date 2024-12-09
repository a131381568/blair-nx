import { ThemeProvider } from 'styled-components';
import { theme } from '../components/styled/theme';
import { TodoListSkeleton } from '../components/TodoListSkeleton';
import { AddButton } from '../components/styled/TodoInputStyle';
import { TodoList } from '../components/TodoList';
import { TodoInput } from '../components/TodoInput';
import { TodoDetail } from '../components/TodoDetail';
import { TodoProvider } from '../context/providers/TodoProvider';
import { useTodoContext } from '../hooks/useContexts';

export function App() {
	return (
		<ThemeProvider theme={theme}>
			<TodoProvider>
				<TodoApp />
			</TodoProvider>
		</ThemeProvider>
	);
}

function TodoApp() {
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
				{ isEditMode ? '開啟編輯模式' : '儲存清單' }
			</AddButton>
		</div>
	);
}

export default App;
