import { useCallback, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../components/styled/theme';
import { useTodoStorage } from '../hooks/useTodoStorage';
import { TodoList } from './TodoList';
import { TodoInput } from './TodoInput';
import { TodoDetail } from './TodoDetail';

export function App() {
	const [todos, setTodos] = useTodoStorage([
		{ id: 1, text: '學習 React 基礎', completed: true },
		{ id: 2, text: '理解 JSX 語法', completed: false },
		{ id: 3, text: '練習使用 Props', completed: false },
	]);

	const [activeId, setActiveId] = useState<number | null>(null);

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
