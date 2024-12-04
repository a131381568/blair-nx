import type { TodoItem } from '../types/list';
import { axiosInstance } from './config';

export const TodoAPI = {
	getAll() {
		return axiosInstance.get<TodoItem[]>('/todo');
	},
	create(todo: Omit<TodoItem, 'id'>) {
		return axiosInstance.post<TodoItem>('/todo', todo);
	},
	update(id: number, todo: Partial<TodoItem>) {
		return axiosInstance.patch<TodoItem>(`/todo/${id}`, todo);
	},
	delete(id: number) {
		return axiosInstance.delete(`/todo/${id}`);
	},
};
