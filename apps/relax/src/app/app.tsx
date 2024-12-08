import { ThemeProvider } from 'styled-components';
import { theme } from '../components/styled/theme';
import { useTodoManager } from '../hooks/useTodoManager';
import { AddButton } from '../components/styled/TodoInputStyle';
import { TodoList } from './TodoList';
import { TodoInput } from './TodoInput';
import { TodoDetail } from './TodoDetail';

export function App() {
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
	} = useTodoManager();

	if (error) {
		return (
			<div className="text-red-500">
				Error:
				{error.message}
			</div>
		);
	}

	if (loading)
		return <div>Loading...</div>;

	return (
		<ThemeProvider theme={theme}>
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
		</ThemeProvider>
	);
}

export default App;
