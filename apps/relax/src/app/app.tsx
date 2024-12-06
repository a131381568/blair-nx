import { useCallback, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../components/styled/theme';
import { useInitialTodos } from '../hooks/useInitialTodos';
import { AddButton } from '../components/styled/TodoInputStyle';
import { TodoAPI } from '../api/todo';
import { TodoList } from './TodoList';
import { TodoInput } from './TodoInput';
import { TodoDetail } from './TodoDetail';

export function App() {
	const { todos, setTodos, loading, error } = useInitialTodos();
	const [activeId, setActiveId] = useState<number | null>(null);
	const [isDisable, setDisableState] = useState<boolean>(true);
	const { saveList } = TodoAPI;

	const handleAdd = useCallback((text: string) => {
		setTodos(prev => [...prev, {
			id: Math.max(0, ...prev.map(t => t.id)) + 1,
			text,
			completed: false,
		}]);
	}, [setTodos]);

	const handleToggle = useCallback((id: number) => {
		setTodos(prev => prev.map(todo =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo,
		));
	}, [setTodos]);

	const handleDelete = useCallback((id: number) => {
		setTodos(prev => prev.filter(todo => todo.id !== id));
		if (activeId === id)
			setActiveId(null);
	}, [activeId, setTodos]);

	const handleSelect = useCallback((id: number) => {
		setActiveId(prev => prev === id ? null : id);
	}, []);

	const activeTodo = useMemo(() =>
		todos.find(todo => todo.id === activeId), [todos, activeId]);

	const toggleMode = () => {
		setDisableState(!isDisable);
		if (!isDisable)
			saveList(todos);
	};

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
				{!isDisable && (<TodoInput onAdd={handleAdd} />)}
				<TodoList
					items={todos}
					activeId={activeId}
					onToggle={handleToggle}
					onDelete={handleDelete}
					onSelect={handleSelect}
					isDisable={isDisable}
				/>
				{activeTodo && !isDisable && (
					<TodoDetail
						item={activeTodo}
						onToggle={handleToggle}
						onDelete={handleDelete}
						isDisable={isDisable}
					/>
				)}
				<AddButton className="mt-5" onClick={toggleMode}>
					{ isDisable ? '開啟編輯模式' : '儲存清單' }
				</AddButton>
			</div>
		</ThemeProvider>
	);
}

export default App;
