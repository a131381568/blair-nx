import type { TodoListProps } from '../types/list';
import {
	DeleteButton,
	TodoCheckbox,
	TodoContainer,
	TodoHeader,
	TodoItem,
	TodoStats,
} from '../components/styled/TodoStyles';

export const TodoList = ({
	title = '待辦事項清單',
	items,
	activeId,
	onToggle,
	onDelete,
	onSelect,
}: TodoListProps) => {
	const completedCount = items.filter(item => item.completed).length;

	return (
		<TodoContainer>
			<TodoHeader>{title}</TodoHeader>

			{!items.length
				? (
						<p>目前沒有待辦事項</p>
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
											onChange={(e) => {
												e.stopPropagation();
												onToggle(item.id);
											}}
										/>
										<span>{item.text}</span>
									</div>
									<DeleteButton
										onClick={(e) => {
											e.stopPropagation();
											onDelete(item.id);
										}}
									>
										刪除
									</DeleteButton>
								</TodoItem>
							))}
						</ul>
					)}

			<TodoStats>
				總計:
				{' '}
				{items.length}
				{' '}
				項 / 已完成:
				<span className={completedCount ? 'completed' : 'pending'}>
					{completedCount}
				</span>
				項
			</TodoStats>
		</TodoContainer>
	);
};

export default TodoList;
