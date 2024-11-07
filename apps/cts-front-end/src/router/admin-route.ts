export const adminRoute = [
	{
		path: '/login',
		name: 'Login',
		component: () => import('@ctsf-src/views/admin/Login.vue'),
		meta: {
			title: '後台系統登入',
		},
	},
	{
		path: '/board',
		name: 'Board',
		component: () => import('@ctsf-src/views/admin/Board.vue'),
		meta: {
			title: '後台系統管理',
			manage: true,
		},
	},
	{
		path: '/board/slogan',
		name: 'Slogan',
		component: () => import('@ctsf-src/views/admin/Slogan.vue'),
		meta: {
			title: '標語管理',
			manage: true,
		},
	},
	{
		path: '/board/categories',
		name: 'Categories',
		component: () => import('@ctsf-src/views/admin/Categories.vue'),
		meta: {
			title: '文章分類管理',
			manage: true,
		},
	},
	{
		path: '/board/categories/edit/:cid',
		name: 'EditSingleCategories',
		component: () => import('@ctsf-src/views/admin/EditSingleCategories.vue'),
		meta: {
			title: '編輯文章分類',
			manage: true,
		},
	},
	{
		path: '/board/categories/add',
		name: 'AddSingleCategories',
		component: () => import('@ctsf-src/views/admin/AddSingleCategories.vue'),
		meta: {
			title: '新增文章分類',
			manage: true,
		},
	},
	{
		path: '/board/article',
		name: 'Article',
		component: () => import('@ctsf-src/views/admin/Article.vue'),
		meta: {
			title: '文章列表',
			manage: true,
		},
	},
	{
		path: '/board/article/edit/:pid',
		name: 'EditSingleArticle',
		component: () => import('@ctsf-src/views/admin/EditSingleArticle.vue'),
		meta: {
			title: '編輯文章',
			manage: true,
		},
	},
	{
		path: '/board/article/add',
		name: 'AddSingleArticle',
		component: () => import('@ctsf-src/views/admin/AddSingleArticle.vue'),
		meta: {
			title: '新增文章',
			manage: true,
		},
	},
	{
		path: '/board/organization',
		name: 'Organization',
		component: () => import('@ctsf-src/views/admin/Organization.vue'),
		meta: {
			title: '天文機構管理',
			manage: true,
		},
	},
	{
		path: '/board/organization/edit/:oid',
		name: 'EditSingleOrganization',
		component: () => import('@ctsf-src/views/admin/EditSingleOrganization.vue'),
		meta: {
			title: '編輯機構',
			manage: true,
		},
	},
	{
		path: '/board/organization/add',
		name: 'AddSingleOrganization',
		component: () => import('@ctsf-src/views/admin/AddSingleOrganization.vue'),
		meta: {
			title: '新增機構',
			manage: true,
		},
	},
	{
		path: '/board/observatories',
		name: 'Observatories',
		component: () => import('@ctsf-src/views/admin/Observatories.vue'),
		meta: {
			title: '天文台管理',
			manage: true,
		},
	},
	{
		path: '/board/observatories/edit/:mid',
		name: 'EditSingleObservatories',
		component: () => import('@ctsf-src/views/admin/EditSingleObservatories.vue'),
		meta: {
			title: '編輯天文台',
			manage: true,
		},
	},
	{
		path: '/board/observatories/add',
		name: 'AddSingleObservatories',
		component: () => import('@ctsf-src/views/admin/AddSingleObservatories.vue'),
		meta: {
			title: '新增天文台',
			manage: true,
		},
	},
	{
		path: '/board/stargazer',
		name: 'Stargazer',
		component: () => import('@ctsf-src/views/admin/Stargazer.vue'),
		meta: {
			title: '觀星地點列表',
			manage: true,
		},
	},
	{
		path: '/board/stargazer/edit/:lid',
		name: 'EditSingleStargazer',
		component: () => import('@ctsf-src/views/admin/EditSingleStargazer.vue'),
		meta: {
			title: '編輯觀星地點',
			manage: true,
		},
	},
	{
		path: '/board/stargazer/add',
		name: 'AddSingleStargazer',
		component: () => import('@ctsf-src/views/admin/AddSingleStargazer.vue'),
		meta: {
			title: '新增觀星地點',
			manage: true,
		},
	},
];
