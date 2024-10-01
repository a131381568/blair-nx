import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Welcome from '@/views/Welcome.vue';
import NotFound from '@/views/NotFound.vue';

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
