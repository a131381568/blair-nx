import { useEffect, useRef } from 'react';
import { TodoInput } from '../components/TodoInput';
import { TodoList } from '../components/TodoList';
import { TodoDetail } from '../components/TodoDetail';
import { AddButton } from '../components/styled/TodoInputStyle';
import { useLanguageContext } from '../hooks/useContexts';
import { useTodoStore } from '../stores/useTodoStore';
import { useTodoData } from '../hooks/useTodoData';

export function HomePage() {
	const { t } = useLanguageContext();
	const {
		isEditMode,
		toggleEditMode,
		saveTodoList,
		loadingStates,
	} = useTodoStore();

	const { fetchTodos } = useTodoData();

	useEffect(() => {
		fetchTodos();
	}, [fetchTodos]);

	return (
		<div className="max-w-2xl mx-auto mt-8 px-4">
			{!isEditMode && <TodoInput />}
			<TodoList />
			{!isEditMode && <TodoDetail />}
			<AddButton
				className="mt-5"
				onClick={async () => {
					toggleEditMode();
					if (!isEditMode) {
						await saveTodoList();
					}
				}}
			>
				{isEditMode ? t('editMode') : (loadingStates.save ? t('saveIng') : t('saveList'))}
			</AddButton>
		</div>
	);
}
