import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { LanguageContext } from '../context/LanguageContext';
import { ThemeContext } from '../context/ThemeContext';
import type { LanguageContextType, ThemeContextType, TodoContextType } from '../context/types';

export const useTodoContext = (): TodoContextType => {
	const context = useContext(TodoContext);
	if (!context)
		throw new Error('useTodoContext must be used within TodoProvider');
	return context;
};

export function useThemeContext(): ThemeContextType {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useThemeContext must be used within ThemeProvider');
	}
	return context;
}

export function useLanguageContext(): LanguageContextType {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error('useLanguageContext must be used within LanguageProvider');
	}
	return context;
}
