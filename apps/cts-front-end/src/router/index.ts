import { createRouter, createWebHistory } from 'vue-router';
import About from '@ctsf-src/views/About.vue';
import NotFound from '@ctsf-src/views/NotFound.vue';
import Science from '@ctsf-src/views/Science.vue';
import Home from '@ctsf-src/views/Home.vue';
import SingleScience from '@ctsf-src/views/SingleScience.vue';
import Story from '@ctsf-src/views/Story.vue';
import SingleStory from '@ctsf-src/views/SingleStory.vue';
import Stargazing from '@ctsf-src/views/Stargazing.vue';
import Facilities from '@ctsf-src/views/Facilities.vue';
import Search from '@ctsf-src/views/Search.vue';
import Archive from '@ctsf-src/views/Archive.vue';
import Login from '@ctsf-src/views/admin/Login.vue';
import Board from '@ctsf-src/views/admin/Board.vue';

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
			path: '/story',
			name: 'Story',
			component: Story,
			meta: {
				title: '星星物語',
				manage: false,
			},
		},
		{
			path: '/story/:sid',
			name: 'SingleStory',
			component: SingleStory,
			meta: {
				title: '星星物語',
				manage: false,
			},
		},
		{
			path: '/stargazing',
			name: 'Stargazing',
			component: Stargazing,
			meta: {
				title: '觀星地點',
				manage: false,
			},
		},
		{
			path: '/facilities',
			name: 'Facilities',
			component: Facilities,
			meta: {
				title: '天文設施',
				manage: false,
			},
		},
		{
			path: '/search',
			name: 'Search',
			component: Search,
			meta: {
				title: '搜尋頁面',
				manage: false,
			},
		},
		{
			path: '/archive/:tagid',
			name: 'Archive',
			component: Archive,
			meta: {
				title: '標籤',
				manage: false,
			},
		},
		// admin pages
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: {
				title: '後台系統登入',
				manage: true,
			},
		},
		{
			path: '/board',
			name: 'Board',
			component: Board,
			meta: {
				title: '後台系統管理',
				manage: true,
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
