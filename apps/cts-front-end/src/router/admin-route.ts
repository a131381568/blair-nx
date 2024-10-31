import Login from '@ctsf-src/views/admin/Login.vue';
import Board from '@ctsf-src/views/admin/Board.vue';
import UserList from '@ctsf-src/views/admin/UserList.vue';
import Slogan from '@ctsf-src/views/admin/Slogan.vue';

export const adminRoute = [
	{
		path: '/users',
		name: 'Users',
		component: UserList,
		meta: {
			title: '管理者列表',
			manage: true,
		},
	},
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
		path: '/board/slogan',
		name: 'Slogan',
		component: Slogan,
		meta: {
			title: '標語管理',
			manage: true,
		},
	},
];
