import { type ReactNode, useMemo, useState } from 'react';
import type { Language, TranslationKey } from '../types';
import { LanguageContext } from '../LanguageContext';

const translations = {
	zh: {
		addTodo: '新增待辦',
		deleteTodo: '刪除',
		editMode: '編輯模式',
		saveList: '儲存清單',
	},
	en: {
		addTodo: 'Add Todo',
		deleteTodo: 'Delete',
		editMode: 'Edit Mode',
		saveList: 'Save List',
	},
} as const;

export function LanguageProvider({ children }: { children: ReactNode }) {
	const [currentLang, setCurrentLang] = useState<Language>('zh');

	const value = useMemo(() => ({
		currentLang,
		setLanguage: setCurrentLang,
		t: (key: TranslationKey) => translations[currentLang][key],
	}), [currentLang]);

	return (
		<LanguageContext.Provider value={value}>
			{children}
		</LanguageContext.Provider>
	);
}
