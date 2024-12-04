import { useEffect, useState } from 'react';
import type { TodoItem } from '../types/list';

const STORAGE_KEY = 'todos';

export function useTodoStorage(initialTodos: TodoItem[] = []) {
	const [todos, setTodos] = useState<TodoItem[]>(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? JSON.parse(stored) : initialTodos;
	});

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
		// console.log('update-localStorage');
	}, [todos]);

	return [todos, setTodos] as const;
}
