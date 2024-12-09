import { type ReactNode, useMemo, useState } from 'react';
import type { Language, TranslationKey } from '../types';
import { LanguageContext } from '../LanguageContext';
import { translations } from '../../constants/language-translations';

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
