export interface TodoItem {
	id: number;
	text: string;
	completed: boolean;
}

// 定義 Props 介面
export interface TodoListProps {
	title?: string; // 可選的標題屬性
	items: TodoItem[];
}
