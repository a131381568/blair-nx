import type { TodoAction, TodoState } from '../context/types';

export const initialState: TodoState = {
	todos: [],
	loading: true,
	error: null,
	isEditMode: true,
	activeId: null,
};

export function todoReducer(state: TodoState, action: TodoAction): TodoState {
	switch (action.type) {
		case 'ADD_TODO':
			return {
				...state,
				todos: [
					...state.todos,
					{
						id: Math.max(0, ...state.todos.map(t => t.id)) + 1,
						text: action.payload,
						completed: false,
					},
				],
			};

		case 'TOGGLE_TODO':
			return {
				...state,
				todos: state.todos.map(todo =>
					todo.id === action.payload
						? { ...todo, completed: !todo.completed }
						: todo,
				),
			};

		case 'DELETE_TODO':
			return {
				...state,
				todos: state.todos.filter(todo => todo.id !== action.payload),
				activeId: state.activeId === action.payload ? null : state.activeId,
			};

		case 'SELECT_TODO':
			return {
				...state,
				activeId: state.activeId === action.payload ? null : action.payload,
			};

		case 'TOGGLE_MODE':
			return {
				...state,
				isEditMode: !state.isEditMode,
			};

		case 'SET_TODOS':
			return {
				...state,
				todos: action.payload,
			};

		case 'SET_ERROR':
			return {
				...state,
				error: action.payload,
			};

		case 'SET_LOADING':
			return {
				...state,
				loading: action.payload,
			};

		default:
			return state;
	}
}
