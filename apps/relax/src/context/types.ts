import type { TodoItem } from '../types/list';
import { translations } from '../constants/language-translations';

export type TodoAction =
	| { type: 'ADD_TODO'; payload: string }
	| { type: 'TOGGLE_TODO'; payload: number }
	| { type: 'DELETE_TODO'; payload: number }
	| { type: 'SELECT_TODO'; payload: number }
	| { type: 'TOGGLE_MODE' }
	| { type: 'SET_TODOS'; payload: TodoItem[] }
	| { type: 'SET_ERROR'; payload: Error | null }
	| { type: 'SET_LOADING'; payload: boolean };

export interface TodoState {
	todos: TodoItem[];
	loading: boolean;
	error: Error | null;
	isEditMode: boolean;
	activeId: number | null;
}

export interface TodoContextType {
	state: TodoState;
	dispatch: React.Dispatch<TodoAction>;
	activeTodo: TodoItem | undefined;
	api: {
		addTodo: (text: string) => Promise<void>;
		toggleTodo: (id: number) => Promise<void>;
		deleteTodo: (id: number) => Promise<void>;
		saveTodoList: (todos: TodoItem[]) => Promise<void>;
		loadingStates: Record<string, boolean>;
	};
}

export type Language = 'zh' | 'en';
export type TranslationKey = keyof (typeof translations)['zh'];

export interface LanguageContextType {
	currentLang: Language;
	setLanguage: (lang: Language) => void;
	t: (key: TranslationKey) => string;
}

export interface ThemeContextType {
	isDark: boolean;
	toggleTheme: () => void;
	colors: {
		primary: string;
		background: string;
		text: string;
	};
}
