import type { TodoListProps } from '../types/list';
import { useLanguageContext } from '../hooks/useContexts';
import { useTodoStore } from '../stores/useTodoStore';
import {
	DeleteButton,
	TodoCheckbox,
	TodoContainer,
	TodoHeader,
	TodoItem,
	TodoStats,
} from './styled/TodoStyles';

export const TodoList = ({ title }: TodoListProps) => {
	const { t } = useLanguageContext();
	const {
		todos,
		activeId,
		isEditMode,
		loadingStates,
		toggleTodo,
		deleteTodo,
		selectTodo,
	} = useTodoStore();

	const completedCount = todos.filter(item => item.completed).length;

	return (
		<TodoContainer>
			<TodoHeader>{title || t('mainTitle')}</TodoHeader>

			{!todos.length
				? (
						<p>{t('nothing')}</p>
					)
				: (
						<ul>
							{todos.map(item => (
								<TodoItem
									key={item.id}
									$completed={item.completed}
									$active={item.id === activeId}
									onClick={() => selectTodo(item.id)}
								>
									<div>
										<TodoCheckbox
											checked={item.completed}
											disabled={isEditMode || loadingStates[`toggle-${item.id}`]}
											onChange={async (e) => {
												e.stopPropagation();
												await toggleTodo(item.id);
											}}
										/>
										<span>{item.text}</span>
									</div>
									{!isEditMode && (
										<DeleteButton
											disabled={loadingStates[`delete-${item.id}`]}
											onClick={async (e) => {
												e.stopPropagation();
												await deleteTodo(item.id);
											}}
										>
											{loadingStates[`delete-${item.id}`] ? t('deleteIng') : t('deleteTodo')}
										</DeleteButton>
									)}
								</TodoItem>
							))}
						</ul>
					)}

			<TodoStats>
				{t('total')}
				:
				{' '}
				{todos.length}
				{' '}
				{t('count')}
				{' '}
				/
				{t('finished')}
				:
				<span className={completedCount ? 'completed' : 'pending'}>
					{completedCount}
				</span>
				{t('count')}
			</TodoStats>
		</TodoContainer>
	);
};

export default TodoList;
