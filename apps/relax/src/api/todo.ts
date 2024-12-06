import axios from 'axios';
import type { TodoItem } from '../types/list';

const apiClient = axios.create({
	baseURL: 'http://localhost:3333/api',
	timeout: 5000,
});

export const TodoAPI = {
	async getAll() {
		const { data } = await apiClient.get<TodoItem[]>('/todo');
		return data;
	},

	async create(todo: Omit<TodoItem, 'id'>) {
		const { data } = await apiClient.post<TodoItem>('/todo', todo);
		return data;
	},

	async update(id: number, todo: Partial<TodoItem>) {
		const { data } = await apiClient.patch<TodoItem>(`/todo/${id}`, todo);
		return data;
	},

	async delete(id: number) {
		await apiClient.delete(`/todo/${id}`);
	},
};
