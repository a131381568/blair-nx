export interface TodoItem {
	id: number;
	text: string;
	completed: boolean;
}

// 定義 Props 介面
export interface TodoListProps {
	title?: string;
	items: TodoItem[];
	onToggle?: (id: number) => void;
	onDelete?: (id: number) => void;
}
