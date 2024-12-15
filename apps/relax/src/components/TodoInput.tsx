import { useRef, useState } from 'react';
import { useLanguageContext } from '../hooks/useContexts';
import { useTodoStore } from '../stores/useTodoStore';
import type { InputHandle } from './FocusedInput';
import { FocusedInput } from './FocusedInput';
import { AddButton, InputContainer } from './styled/TodoInputStyle';

export const TodoInput = () => {
	const { t } = useLanguageContext();
	const { addTodo, loadingStates } = useTodoStore();
	const inputRef = useRef<InputHandle>(null);
	const [inputValue, setInputValue] = useState(''); // 新增狀態來追踪輸入值

	const handleAdd = async () => {
		const text = inputValue.trim();
		if (text) {
			await addTodo(text);
			inputRef.current?.clear();
			setInputValue(''); // 清除狀態
		}
	};

	return (
		<InputContainer>
			<FocusedInput
				ref={inputRef}
				placeholder={t('addTodo')}
				disabled={loadingStates.add}
				onValueChange={setInputValue} // 監聽值的變化
				onKeyDown={e => e.key === 'Enter' && handleAdd()}
			/>
			<AddButton
				onClick={handleAdd}
				disabled={!inputValue.trim() || loadingStates.add} // 使用狀態來控制按鈕
			>
				{loadingStates.add ? t('addIng') : t('addTodo')}
			</AddButton>
		</InputContainer>
	);
};
