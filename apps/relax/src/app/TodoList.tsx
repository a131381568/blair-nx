import cn from 'classnames';
import type { TodoListProps } from '../types/list';

// TodoList 組件 - 使用函數組件的方式宣告
export const TodoList = ({
	title = '待辦事項清單', // 提供預設值
	items,
}: TodoListProps) => {
	const completedCount = items.filter(item => item.completed).length;

	return (
		<div className="todo-list">
			{/* 使用 JSX 的大括號語法來嵌入 JavaScript 表達式 */}
			<h1 className="text-lg font-bold">{title}</h1>

			{/* 條件渲染：當 items 為空時顯示提示訊息 */}
			{!items.length
				? (<p>目前沒有待辦事項</p>)
				: (
						<ul>
							{/* 使用 map 方法渲染列表，記得提供 key */}
							{items.map(item => (
								<li
									key={item.id}
									className={cn(
										'ml-4 text-xs relative flex items-center gap-x-2',
										'before:content-[""] before:relative before:w-1 before:h-1 before:bg-black before:p-0',
										item.completed ? 'text-[#196c24]' : 'text-[#777]',
									)}
								>
									{item.text}
								</li>
							))}
						</ul>
					)}

			{/* 使用 JSX 的註解方式 */}
			{/* 顯示待辦事項統計 */}
			<div className="todo-stats italic text-sm">
				{`總計: ${items.length} 項 / 已完成:`}
				<span className={cn(
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
