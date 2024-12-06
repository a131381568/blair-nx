import { useEffect, useState } from 'react';
import type { TodoItem } from '../types/list';
import { TodoAPI } from '../api/todo';

export const useInitialTodos = () => {
	const [todos, setTodos] = useState<TodoItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

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
	}, []);

	return { todos, setTodos, loading, error };
};
