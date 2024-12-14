import { create } from 'zustand';
import { TodoAPI } from '../api/todo';
import type { TodoItem } from '../types/list';

interface TodoState {
	todos: TodoItem[];
	loading: boolean;
	error: Error | null;
	activeId: number | null;
	isEditMode: boolean;
	loadingStates: Record<string, boolean>;
}

interface TodoActions {
	setLoading: (isLoading: boolean) => void;
	setError: (error: Error | null) => void;
	setTodos: (todos: TodoItem[]) => void;
	addTodo: (text: string) => Promise<void>;
	toggleTodo: (id: number) => Promise<void>;
	deleteTodo: (id: number) => Promise<void>;
	selectTodo: (id: number) => void;
	toggleEditMode: () => void;
	saveTodoList: () => Promise<void>;
}

const initialState: TodoState = {
	todos: [],
	loading: true,
	error: null,
	activeId: null,
	isEditMode: false,
	loadingStates: {},
};

export const useTodoStore = create<TodoState & TodoActions>((set, get) => ({
	...initialState,

	setLoading: isLoading => set({ loading: isLoading }),

	setError: error => set({ error }),

	setTodos: todos => set({ todos }),

	addTodo: async (text) => {
		try {
			const { todos } = get();
			const newTodo: TodoItem = {
				id: Math.max(0, ...todos.map(t => t.id)) + 1,
				text,
				completed: false,
			};

			set(state => ({
				todos: [...state.todos, newTodo],
				loadingStates: { ...state.loadingStates, add: true },
			}));

			await TodoAPI.create({ text, completed: false });
		}
		catch (error) {
			set(state => ({
				todos: state.todos.slice(0, -1),
				error: error instanceof Error ? error : new Error('Failed to add todo'),
			}));
		}
		finally {
			set(state => ({
				loadingStates: { ...state.loadingStates, add: false },
			}));
		}
	},

	toggleTodo: async (id) => {
		try {
			const { todos } = get();
			const todo = todos.find(t => t.id === id);
			if (!todo)
				return;

			set(state => ({
				todos: state.todos.map(t =>
					t.id === id ? { ...t, completed: !t.completed } : t,
				),
				loadingStates: { ...state.loadingStates, [`toggle-${id}`]: true },
			}));

			await TodoAPI.update(id, { completed: !todo.completed });
		}
		catch (error) {
			set(state => ({
				todos: state.todos.map(t =>
					t.id === id ? { ...t, completed: !t.completed } : t,
				),
				error: error instanceof Error ? error : new Error('Failed to toggle todo'),
			}));
		}
		finally {
			set(state => ({
				loadingStates: { ...state.loadingStates, [`toggle-${id}`]: false },
			}));
		}
	},

	deleteTodo: async (id) => {
		const todoToDelete = get().todos.find(t => t.id === id);
		if (!todoToDelete)
			return;

		try {
			set(state => ({
				todos: state.todos.filter(t => t.id !== id),
				activeId: state.activeId === id ? null : state.activeId,
				loadingStates: { ...state.loadingStates, [`delete-${id}`]: true },
			}));

			await TodoAPI.delete(id);
		}
		catch (error) {
			set(state => ({
				todos: [...state.todos, todoToDelete],
				error: error instanceof Error ? error : new Error('Failed to delete todo'),
			}));
		}
		finally {
			set(state => ({
				loadingStates: { ...state.loadingStates, [`delete-${id}`]: false },
			}));
		}
	},

	selectTodo: (id) => {
		set(state => ({
			activeId: state.activeId === id ? null : id,
		}));
	},

	toggleEditMode: () => {
		set(state => ({ isEditMode: !state.isEditMode }));
	},

	saveTodoList: async () => {
		try {
			const { todos } = get();
			set(state => ({
				loadingStates: { ...state.loadingStates, save: true },
			}));

			await TodoAPI.saveList(todos);
		}
		catch (error) {
			set({
				error: error instanceof Error ? error : new Error('Failed to save todo list'),
			});
		}
		finally {
			set(state => ({
				loadingStates: { ...state.loadingStates, save: false },
			}));
		}
	},
}));
