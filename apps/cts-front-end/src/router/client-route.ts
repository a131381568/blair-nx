export const clientRoute = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@ctsf-src/views/Home.vue'),
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
		component: () => import('@ctsf-src/views/About.vue'),
		meta: {
			title: '關於我們',
			manage: false,
		},
	},
	{
		path: '/science',
		name: 'Science',
		component: () => import('@ctsf-src/views/Science.vue'),
		meta: {
			title: '天文科普',
			manage: false,
		},
	},
	{
		path: '/science/:sid',
		name: 'SingleScience',
		component: () => import('@ctsf-src/views/SingleScience.vue'),
		meta: {
			title: '天文科普',
			manage: false,
		},
	},
	{
		path: '/story',
		name: 'Story',
		component: () => import('@ctsf-src/views/Story.vue'),
		meta: {
			title: '星星物語',
			manage: false,
		},
	},
	{
		path: '/story/:sid',
		name: 'SingleStory',
		component: () => import('@ctsf-src/views/SingleStory.vue'),
		meta: {
			title: '星星物語',
			manage: false,
		},
	},
	{
		path: '/stargazing',
		name: 'Stargazing',
		component: () => import('@ctsf-src/views/Stargazing.vue'),
		meta: {
			title: '觀星地點',
			manage: false,
		},
	},
	{
		path: '/facilities',
		name: 'Facilities',
		component: () => import('@ctsf-src/views/Facilities.vue'),
		meta: {
			title: '天文設施',
			manage: false,
		},
	},
	{
		path: '/search',
		name: 'Search',
		component: () => import('@ctsf-src/views/Search.vue'),
		meta: {
			title: '搜尋頁面',
			manage: false,
		},
	},
	{
		path: '/archive/:tagid',
		name: 'Archive',
		component: () => import('@ctsf-src/views/Archive.vue'),
		meta: {
			title: '標籤',
			manage: false,
		},
	},
];
