import { useCallback, useEffect, useMemo, useState } from 'react';
import type { TodoItem } from '../types/list';
import { TodoAPI } from '../api/todo';

export function useTodoManager() {
	const [todos, setTodos] = useState<TodoItem[]>([]);
	const [isEditMode, setIsEditMode] = useState(true);
	const [activeId, setActiveId] = useState<number | null>(null);
	const { saveList } = TodoAPI;

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

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
		setIsEditMode(!isEditMode);
		if (!isEditMode)
			saveList(todos);
	};

	useEffect(() => {
		let mounted = true;

		const fetchTodos = async () => {
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
		};

		fetchTodos();

		return () => {
			mounted = false;
		};
	}, []);

	return {
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
	};
};
