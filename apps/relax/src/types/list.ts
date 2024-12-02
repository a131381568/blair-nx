export interface TodoItem {
	id: number;
	text: string;
	completed: boolean;
}

export interface TodoListProps {
	title?: string;
	items: TodoItem[];
	activeId?: number | null;
	onToggle: (id: number) => void;
	onDelete: (id: number) => void;
	onSelect: (id: number) => void;
}

export interface TodoDetailProps {
	item: TodoItem;
	onToggle: (id: number) => void;
	onDelete: (id: number) => void;
}
