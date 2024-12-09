import type { ReactNode } from 'react';
import { useTodoManager } from '../../hooks/useTodoManager';
import { TodoContext } from '../TodoContext';

export function TodoProvider({ children }: { children: ReactNode }) {
	const todoManager = useTodoManager();

	return (
		<TodoContext.Provider value={todoManager}>
			{children}
		</TodoContext.Provider>
	);
}
