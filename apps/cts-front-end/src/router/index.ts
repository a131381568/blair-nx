import { createRouter, createWebHistory } from 'vue-router';
import About from '@ctsf-src/views/About.vue';
import NotFound from '@ctsf-src/views/NotFound.vue';
import Science from '@ctsf-src/views/Science.vue';
import Home from '@ctsf-src/views/Home.vue';
import SingleScience from '@ctsf-src/views/SingleScience.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home,
			meta: {
				title: '首頁',
				manage: false,
			},
		},
		{
			path: '/home',
			redirect: '/',
		},
		{
			path: '/about',
			name: 'About',
			component: About,
			meta: {
				title: '關於我們',
				manage: false,
			},
		},
		{
			path: '/science',
			name: 'Science',
			component: Science,
			meta: {
				title: '天文科普',
				manage: false,
			},
		},
		{
			path: '/science/:sid',
			name: 'SingleScience',
			component: SingleScience,
			meta: {
				title: '天文科普',
				manage: false,
			},
		},
		{
			path: '/:pathMatch(.*)',
			name: 'NotFound',
			component: NotFound,
			meta: {
				title: '404',
				manage: false,
			},
		},
	],
});

export default router;
