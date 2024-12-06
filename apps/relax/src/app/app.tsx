import { useCallback, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../components/styled/theme';
import { useInitialTodos } from '../hooks/useInitialTodos';
import { TodoAPI } from '../api/todo';
import { TodoList } from './TodoList';
import { TodoInput } from './TodoInput';
import { TodoDetail } from './TodoDetail';

export function App() {
	const { todos, setTodos, loading, error } = useInitialTodos();

	const [activeId, setActiveId] = useState<number | null>(null);

	const handleAdd = useCallback(async (text: string) => {
		try {
			const newTodo = await TodoAPI.create({ text, completed: false });
			setTodos(prev => [...prev, newTodo]);
		}
		catch (err) {
			console.error('Failed to add todo:', err);
		}
	}, [setTodos]);

	const handleToggle = useCallback(async (id: number) => {
		try {
			const todo = todos.find(t => t.id === id);
			if (!todo)
				return;

			const updated = await TodoAPI.update(id, { completed: !todo.completed });
			setTodos(prev => prev.map(t => t.id === id ? updated : t));
		}
		catch (err) {
			console.error('Failed to toggle todo:', err);
		}
	}, [todos, setTodos]);

	const handleDelete = useCallback(async (id: number) => {
		try {
			await TodoAPI.delete(id);
			setTodos(prev => prev.filter(todo => todo.id !== id));
			if (activeId === id)
				setActiveId(null);
		}
		catch (err) {
			console.error('Failed to delete todo:', err);
		}
	}, [activeId, setTodos]);

	const handleSelect = useCallback((id: number) => {
		setActiveId(prev => prev === id ? null : id);
	}, []);

	const activeTodo = useMemo(() =>
		todos.find(todo => todo.id === activeId), [todos, activeId]);

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
				<TodoInput onAdd={handleAdd} />
				<TodoList
					items={todos}
					activeId={activeId}
					onToggle={handleToggle}
					onDelete={handleDelete}
					onSelect={handleSelect}
				/>
				{activeTodo && (
					<TodoDetail
						item={activeTodo}
						onToggle={handleToggle}
						onDelete={handleDelete}
					/>
				)}
			</div>
		</ThemeProvider>
	);
}

export default App;
