export interface TodoItem {
	id: number;
	text: string;
	completed: boolean;
}

export interface TodoListProps {
	title?: string;
}

export interface TodoDetailProps {
	item: TodoItem;
	onToggle: (id: number) => void;
	onDelete: (id: number) => void;
	isDisable: boolean;
}
