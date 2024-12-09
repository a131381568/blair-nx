import { useLanguageContext } from '../hooks/useContexts';

export function LanguageSwitcher() {
	const { currentLang, setLanguage } = useLanguageContext();

	return (
		<select
			value={currentLang}
			onChange={e => setLanguage(e.target.value as 'zh' | 'en')}
			className="bg-white border border-gray-300 rounded px-2 py-1"
		>
			<option value="zh">中文</option>
			<option value="en">English</option>
		</select>
	);
}
