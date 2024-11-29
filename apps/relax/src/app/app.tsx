import type { TodoItem } from '../types/list';
import NxWelcome from './nx-welcome';
import '../assets/style.css';
import { TodoList } from './TodoList';

export function App() {
	const todos: TodoItem[] = [
		{ id: 1, text: '學習 React 基礎', completed: true },
		{ id: 2, text: '理解 JSX 語法', completed: false },
		{ id: 3, text: '練習使用 Props', completed: false },
	];

	return (
		<div>
			<div className="app">
				{/* 使用 TodoList 組件並傳入 props */}
				<TodoList items={todos} />

				{/* 使用自定義標題 */}
				<TodoList
					title="學習清單"
					items={todos.filter(todo => !todo.completed)}
				/>
			</div>

			<NxWelcome title="relax" />
		</div>
	);
}

export default App;
