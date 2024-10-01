import { createRouter, createWebHistory } from 'vue-router';
import Home from '@demo-src/views/Home.vue';
import Welcome from '@demo-src/views/Welcome.vue';
import NotFound from '@demo-src/views/NotFound.vue';

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
			path: '/welcome',
			name: 'Welcome',
			component: Welcome,
		},
		{
			path: '/:pathMatch(.*)',
			name: 'NotFound',
			component: NotFound,
		},
	],
});

export default router;
