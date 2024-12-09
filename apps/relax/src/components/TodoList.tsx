import type { TodoListProps } from '../types/list';
import { useLanguageContext } from '../hooks/useContexts';
import {
	DeleteButton,
	TodoCheckbox,
	TodoContainer,
	TodoHeader,
	TodoItem,
	TodoStats,
} from './styled/TodoStyles';

export const TodoList = ({
	title,
	items,
	activeId,
	onToggle,
	onDelete,
	onSelect,
	isDisable,
}: TodoListProps) => {
	const { t } = useLanguageContext();
	const completedCount = items.filter(item => item.completed).length;

	return (
		<TodoContainer>
			<TodoHeader>{title || t('mainTitle')}</TodoHeader>

			{!items.length
				? (
						<p>{t('nothing')}</p>
					)
				: (
						<ul>
							{items.map(item => (
								<TodoItem
									key={item.id}
									$completed={item.completed}
									$active={item.id === activeId}
									onClick={() => onSelect(item.id)}
								>
									<div>
										<TodoCheckbox
											checked={item.completed}
											disabled={isDisable}
											onChange={(e) => {
												e.stopPropagation();
												onToggle(item.id);
											}}
										/>
										<span>{item.text}</span>
									</div>
									{!isDisable && (
										<DeleteButton
											onClick={(e) => {
												e.stopPropagation();
												onDelete(item.id);
											}}
										>
											{t('deleteTodo')}
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
				{items.length}
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
