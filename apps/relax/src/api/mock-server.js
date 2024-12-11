const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3333;
let todoList = [
	{ id: 1, text: '學習 React 基礎', completed: true },
	{ id: 2, text: '理解 JSX 語法', completed: false },
	{ id: 3, text: '練習使用 Props', completed: false },
];

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));

app.get('/api/users', async (req, res) => {
	const randomuserInfo = await fetch('https://randomuser.me/api/?nat=us&randomapi');
	const data = await randomuserInfo.json();
	res.json(data);
});

app.get('/api/todo', (_req, res) => {
	res.json(todoList);
});

app.post('/api/todo', (req, res) => {
	const { text } = req.body;
	if (!text) {
		return res.status(400).json({ error: 'Text is required' });
	}

	const newTodo = {
		id: Math.max(0, ...todoList.map(t => t.id)) + 1,
		text,
		completed: false,
	};
	todoList.push(newTodo);
	res.status(201).json(newTodo);
});

app.patch('/api/todo/:id', (req, res) => {
	const id = Number.parseInt(req.params.id);
	const todoIndex = todoList.findIndex(t => t.id === id);

	if (todoIndex === -1) {
		return res.status(404).json({ error: 'Todo not found' });
	}

	const updatedTodo = {
		...todoList[todoIndex],
		...req.body,
	};

	todoList[todoIndex] = updatedTodo;
	res.json(updatedTodo);
});

app.delete('/api/todo/:id', (req, res) => {
	const id = Number.parseInt(req.params.id);
	const todoIndex = todoList.findIndex(t => t.id === id);

	if (todoIndex === -1) {
		return res.status(404).json({ error: 'Todo not found' });
	}

	todoList = todoList.filter(t => t.id !== id);
	res.status(204).send();
});

app.put('/api/todo', (req, res) => {
	todoList = req.body;
	res.json(todoList);
});

app.use('/', express.static('public'));

app.listen(port, () => {
	// console.log(`Example app listening at http://localhost:${port}`);
});
