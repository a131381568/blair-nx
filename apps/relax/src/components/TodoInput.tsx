import { type KeyboardEvent, useState } from 'react';
import { useLanguageContext } from '../hooks/useContexts';
import { useTodoStore } from '../stores/useTodoStore';
import { AddButton, Input, InputContainer } from './styled/TodoInputStyle';

export const TodoInput = () => {
	const { t } = useLanguageContext();
	const { addTodo, loadingStates } = useTodoStore();
	const [text, setText] = useState('');

	const handleAdd = async () => {
		if (text.trim()) {
			await addTodo(text.trim());
			setText('');
		}
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleAdd();
		}
	};

	return (
		<InputContainer>
			<Input
				type="text"
				value={text}
				onChange={e => setText(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder={t('addTodo')}
				disabled={loadingStates.add}
			/>
			<AddButton
				onClick={handleAdd}
				disabled={!text.trim() || loadingStates.add}
			>
				{loadingStates.add ? t('addIng') : t('addTodo')}
			</AddButton>
		</InputContainer>
	);
};

export default TodoInput;
