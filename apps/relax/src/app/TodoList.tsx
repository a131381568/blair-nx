import cn from 'classnames';
import type { TodoListProps } from '../types/list';

// TodoList 組件 - 使用函數組件的方式宣告
export const TodoList = ({
	title = '待辦事項清單 - function',
	items,
	onToggle,
	onDelete,
}: TodoListProps) => {
	const completedCount = items.filter(item => item.completed).length;

	const handleToggle = (id: number) => (onToggle?.(id));

	const handleDelete = (id: number) => (onDelete?.(id));

	return (
		<div className="todo-list p-4">
			<h1 className="text-lg font-bold mb-4">{title}</h1>

			{!items.length
				? (
						<p>目前沒有待辦事項</p>
					)
				: (
						<ul className="space-y-2">
							{items.map(item => (
								<li
									key={item.id}
									className={cn(
										'flex items-center justify-between p-2 rounded',
										'hover:bg-gray-50',
										item.completed ? 'text-[#196c24]' : 'text-[#777]',
									)}
								>
									<div className="flex items-center gap-2">
										<input
											type="checkbox"
											checked={item.completed}
											onChange={() => handleToggle(item.id)}
											className="h-4 w-4"
										/>
										<span>{item.text}</span>
									</div>
									<button
										type="button"
										onClick={() => handleDelete(item.id)}
										className="text-red-500 hover:text-red-700"
									>
										刪除
									</button>
								</li>
							))}
						</ul>
					)}

			<div className="todo-stats mt-4 text-sm italic">
				{`總計: ${items.length} 項 / 已完成:`}
				<span
					className={cn(
						'mx-1',
						completedCount ? 'text-[#196c24]' : 'text-[#f00]',
					)}
				>
					{completedCount}
				</span>
				項
			</div>
		</div>
	);
};
