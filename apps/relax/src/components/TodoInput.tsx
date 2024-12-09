import { type KeyboardEvent, useState } from 'react';
import { AddButton, Input, InputContainer } from './styled/TodoInputStyle';

interface TodoInputProps {
	onAdd: (text: string) => void;
}

export const TodoInput = ({ onAdd }: TodoInputProps) => {
	const [text, setText] = useState('');

	const handleAdd = () => {
		if (text.trim()) {
			onAdd(text.trim());
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
				placeholder="請輸入待辦事項"
				data-testid="todo-input"
			/>
			<AddButton
				onClick={handleAdd}
				disabled={!text.trim()}
				data-testid="add-button"
			>
				新增
			</AddButton>
		</InputContainer>
	);
};

export default TodoInput;
