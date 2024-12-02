import { useState } from 'react';
import type { TodoItem } from '../types/list';
import { TodoList } from './TodoList';

export function App() {
	const [todos, setTodos] = useState<TodoItem[]>([
		{ id: 1, text: '學習 React 基礎', completed: true },
		{ id: 2, text: '理解 JSX 語法', completed: false },
		{ id: 3, text: '練習使用 Props', completed: false },
	]);

	const handleToggle = (id: number) => {
		setTodos(prevTodos =>
			prevTodos.map(todo =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo,
			),
		);
	};

	const handleDelete = (id: number) => {
		setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
	};

	return (
		<div className="app">
			<TodoList
				items={todos}
				onToggle={handleToggle}
				onDelete={handleDelete}
			/>
		</div>
	);
}

export default App;
