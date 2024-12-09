import { createContext } from 'react';
import type { TodoContextType } from './types';

export const TodoContext = createContext<TodoContextType | null>(null);
