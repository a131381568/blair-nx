import { type KeyboardEvent, useState } from 'react';
import { useLanguageContext, useTodoContext } from '../hooks/useContexts';
import { AddButton, Input, InputContainer } from './styled/TodoInputStyle';

export const TodoInput = () => {
	const { t } = useLanguageContext();
	const { api } = useTodoContext();
	const [text, setText] = useState('');

	const handleAdd = async () => {
		if (text.trim()) {
			await api.addTodo(text.trim());
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
				data-testid="todo-input"
			/>
			<AddButton
				onClick={handleAdd}
				disabled={!text.trim()}
				data-testid="add-button"
			>
				{t('addTodo')}
			</AddButton>
		</InputContainer>
	);
};

export default TodoInput;
