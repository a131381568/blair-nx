import type { ReactNode } from 'react';
import { useEffect, useMemo, useReducer } from 'react';
import { TodoAPI } from '../../api/todo';
import { initialState, todoReducer } from '../../reducers/todoReducer';
import { TodoContext } from '../TodoContext';
import { useTodoApi } from '../../hooks/useTodoApi';

export function TodoProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(todoReducer, initialState);
	const todoAPI = useTodoApi(state, dispatch);

	const activeTodo = useMemo(() =>
		state.todos.find(todo => todo.id === state.activeId), [state.todos, state.activeId]);

	useEffect(() => {
		let mounted = true;

		async function fetchTodos() {
			try {
				const data = await TodoAPI.getAll();
				if (mounted) {
					dispatch({ type: 'SET_TODOS', payload: data });
					dispatch({ type: 'SET_ERROR', payload: null });
				}
			}
			catch (err) {
				if (mounted) {
					dispatch({
						type: 'SET_ERROR',
						payload: err instanceof Error ? err : new Error('Failed to fetch todos'),
					});
				}
			}
			finally {
				if (mounted) {
					dispatch({ type: 'SET_LOADING', payload: false });
				}
			}
		}

		fetchTodos();
		return () => {
			mounted = false;
		};
	}, []);

	const value = useMemo(() => ({
		state,
		dispatch,
		activeTodo,
		api: todoAPI,
	}), [state, activeTodo, todoAPI]);

	return (
		<TodoContext.Provider value={value}>
			{children}
		</TodoContext.Provider>
	);
}
