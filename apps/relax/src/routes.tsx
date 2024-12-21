import { createBrowserRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { DocPage } from './pages/DocPage';
import { Layout } from './components/Layout';

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: '/doc',
				element: <DocPage />,
			},
		],
	},
];

export const router = createBrowserRouter(routes);
