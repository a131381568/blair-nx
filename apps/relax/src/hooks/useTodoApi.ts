import { useState } from 'react';
import { TodoAPI } from '../api/todo';
import type { TodoAction, TodoState } from '../context/types';
import type { TodoItem } from '../types/list';

export function useTodoApi(state: TodoState, dispatch: React.Dispatch<TodoAction>) {
	const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

	const setLoading = (operation: string, isLoading: boolean) => {
		setLoadingStates(prev => ({ ...prev, [operation]: isLoading }));
	};

	const handleError = (error: unknown) => {
		dispatch({
			type: 'SET_ERROR',
			payload: error instanceof Error ? error : new Error('Operation failed'),
		});
	};

	const addTodo = async (text: string) => {
		setLoading('add', true);
		const optimisticId = Math.max(0, ...state.todos.map(t => t.id)) + 1;
		const optimisticTodo = { id: optimisticId, text, completed: false };

		try {
			// 先更新 UI
			dispatch({ type: 'SET_TODOS', payload: [...state.todos, optimisticTodo] });
			// API 請求
			await TodoAPI.create({ text, completed: false });
		}
		catch (error) {
			// 失敗時回滾
			dispatch({
				type: 'SET_TODOS',
				payload: state.todos.filter(t => t.id !== optimisticId),
			});
			handleError(error);
		}
		finally {
			setLoading('add', false);
		}
	};

	const toggleTodo = async (id: number) => {
		setLoading(`toggle-${id}`, true);
		const todo = state.todos.find(t => t.id === id);
		if (!todo)
			return;

		try {
			dispatch({ type: 'TOGGLE_TODO', payload: id });
			await TodoAPI.update(id, { completed: !todo.completed });
		}
		catch (error) {
			// Rollback on failure
			dispatch({ type: 'TOGGLE_TODO', payload: id });
			handleError(error);
		}
		finally {
			setLoading(`toggle-${id}`, false);
		}
	};

	const deleteTodo = async (id: number) => {
		setLoading(`delete-${id}`, true);
		const deletedTodo = state.todos.find(t => t.id === id);
		if (!deletedTodo)
			return;

		try {
			dispatch({ type: 'DELETE_TODO', payload: id });
			await TodoAPI.delete(id);
		}
		catch (error) {
			// Rollback on failure
			if (deletedTodo) {
				dispatch({
					type: 'SET_TODOS',
					payload: [...state.todos, deletedTodo],
				});
			}
			handleError(error);
		}
		finally {
			setLoading(`delete-${id}`, false);
		}
	};

	const saveTodoList = async (todos: TodoItem[]) => {
		setLoading('save', true);
		const previousTodos = [...state.todos];

		try {
			dispatch({ type: 'SET_TODOS', payload: todos });
			await TodoAPI.saveList(todos);
		}
		catch (error) {
			// Rollback on failure
			dispatch({ type: 'SET_TODOS', payload: previousTodos });
			handleError(error);
		}
		finally {
			setLoading('save', false);
		}
	};

	return {
		addTodo,
		toggleTodo,
		deleteTodo,
		saveTodoList,
		loadingStates,
	};
}
