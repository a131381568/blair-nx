import { createRouter, createWebHistory } from 'vue-router';
import { clientRoute } from '@ctsf-src/router/client-route';
import { adminRoute } from '@ctsf-src/router/admin-route';
import NotFound from '@ctsf-src/views/NotFound.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		...clientRoute,
		...adminRoute,
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
