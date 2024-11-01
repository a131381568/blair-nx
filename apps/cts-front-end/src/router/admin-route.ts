import Login from '@ctsf-src/views/admin/Login.vue';
import Board from '@ctsf-src/views/admin/Board.vue';
import UserList from '@ctsf-src/views/admin/UserList.vue';
import Slogan from '@ctsf-src/views/admin/Slogan.vue';
import Categories from '@ctsf-src/views/admin/Categories.vue';
import EditSingleCategories from '@ctsf-src/views/admin/EditSingleCategories.vue';
import AddSingleCategories from '@ctsf-src/views/admin/AddSingleCategories.vue';
import Article from '@ctsf-src/views/admin/Article.vue';
import EditSingleArticle from '@ctsf-src/views/admin/EditSingleArticle.vue';
import AddSingleArticle from '@ctsf-src/views/admin/AddSingleArticle.vue';

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
	{
		path: '/board/categories',
		name: 'Categories',
		component: Categories,
		meta: {
			title: '文章分類管理',
			manage: true,
		},
	},
	{
		path: '/board/categories/edit/:cid',
		name: 'EditSingleCategories',
		component: EditSingleCategories,
		meta: {
			title: '編輯文章分類',
			manage: true,
		},
	},
	{
		path: '/board/categories/add',
		name: 'AddSingleCategories',
		component: AddSingleCategories,
		meta: {
			title: '新增文章分類',
			manage: true,
		},
	},
	{
		path: '/board/article',
		name: 'Article',
		component: Article,
		meta: {
			title: '文章列表',
			manage: true,
		},
	},
	{
		path: '/board/article/edit/:pid',
		name: 'EditSingleArticle',
		component: EditSingleArticle,
		meta: {
			title: '編輯文章',
			manage: true,
		},
	},
	{
		path: '/board/article/add',
		name: 'AddSingleArticle',
		component: AddSingleArticle,
		meta: {
			title: '新增文章',
			manage: true,
		},
	},
];
