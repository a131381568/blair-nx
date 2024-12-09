import type { TodoItem } from '../types/list';
import { translations } from '../constants/language-translations';

export interface TodoContextType {
	loading: boolean;
	error: Error | null;
	todos: TodoItem[];
	isEditMode: boolean;
	activeId: number | null;
	handleAdd: (text: string) => void;
	handleToggle: (id: number) => void;
	handleDelete: (id: number) => void;
	handleSelect: (id: number) => void;
	activeTodo: TodoItem | undefined;
	toggleMode: () => Promise<void>;
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
