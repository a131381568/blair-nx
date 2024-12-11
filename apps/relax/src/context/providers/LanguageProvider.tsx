import { type ReactNode, useMemo } from 'react';
import type { Language, TranslationKey } from '../types';
import { LanguageContext } from '../LanguageContext';
import { translations } from '../../constants/language-translations';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export function LanguageProvider({ children }: { children: ReactNode }) {
	const [currentLang, setCurrentLang] = useLocalStorage<Language>('language', 'zh');

	const value = useMemo(() => ({
		currentLang,
		setLanguage: setCurrentLang,
		t: (key: TranslationKey) => translations[currentLang][key],
	}), [currentLang, setCurrentLang]);

	return (
		<LanguageContext.Provider value={value}>
			{children}
		</LanguageContext.Provider>
	);
}
