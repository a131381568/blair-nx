import type { TodoListProps } from '../types/list';
import { useLanguageContext, useTodoContext } from '../hooks/useContexts';
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
	const { state, dispatch, api } = useTodoContext();
	const { todos, activeId, isEditMode } = state;

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
									onClick={() => dispatch({ type: 'SELECT_TODO', payload: item.id })}
								>
									<div>
										<TodoCheckbox
											checked={item.completed}
											disabled={isEditMode || api.loadingStates[`toggle-${item.id}`]}
											onChange={async (e) => {
												e.stopPropagation();
												await api.toggleTodo(item.id);
											}}
										/>
										<span>{item.text}</span>
									</div>
									{!isEditMode && (
										<DeleteButton
											disabled={api.loadingStates[`delete-${item.id}`]}
											onClick={async (e) => {
												e.stopPropagation();
												await api.deleteTodo(item.id);
											}}
										>
											{api.loadingStates[`delete-${item.id}`] ? '刪除中...' : t('deleteTodo')}
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
