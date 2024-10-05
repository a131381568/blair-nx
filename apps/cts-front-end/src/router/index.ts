import { createRouter, createWebHistory } from 'vue-router';
import Home from '@cts-fe-src/views/Home.vue';
import NotFound from '@cts-fe-src/views/NotFound.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home,
		},
		{
			path: '/home',
			redirect: '/',
		},
		{
			path: '/:pathMatch(.*)',
			name: 'NotFound',
			component: NotFound,
		},
	],
});

export default router;
