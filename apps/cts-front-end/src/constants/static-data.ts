export interface AdminMenuItemDto {
	title: string;
	path: string;
}

export const CLIENT_MENU_INFO = {
	about: {
		path: '/about',
		img: '/assets/bg/menu-bg-01.jpg',
	},
	science: {
		path: '/science',
		img: '/assets/bg/menu-bg-02.jpg',
	},
	story: {
		path: '/story',
		img: '/assets/bg/menu-bg-03.jpg',
	},
	facilities: {
		path: '/facilities',
		img: '/assets/bg/menu-bg-04.jpg',
	},
	stargazing: {
		path: '/stargazing',
		img: '/assets/bg/menu-bg-05.jpg',
	},
	search: {
		path: '/search',
		img: '/assets/bg/menu-bg-06.jpg',
	},
};

export const ADMIN_MENU: AdminMenuItemDto[] = [
	{
		title: '標語管理',
		path: 'title',
	},
	{
		title: '首頁標語',
		path: '/board/slogan',
	},
	{
		title: '關於我們',
		// categories: '標語管理',
		path: '/board/slogan?edit=about',
	},
	{
		title: '文章分類管理',
		path: 'title',
	},
	{
		title: '全部分類',
		path: '/board/categories',
	},
	{
		title: '新增分類',
		path: '/board/categories/add',
	},
	{
		title: '文章列表',
		path: 'title',
	},
	{
		title: '全部文章',
		path: '/board/article',
	},
	{
		title: '新增文章',
		path: '/board/article/add',
	},
	{
		title: '天文設施',
		path: 'title',
	},
	{
		title: '天文機構管理',
		path: '/board/organization',
	},
	{
		title: '天文台管理',
		path: '/board/observatories',
	},
	{
		title: '觀星地點列表',
		path: 'title',
	},
	{
		title: '全部地點',
		path: '/board/stargazer',
	},
	{
		title: '新增地點',
		path: '/board/stargazer/add',
	},
	{
		title: '其它功能',
		path: 'title',
	},
	{
		title: '前台首頁',
		path: '/',
	},
	{
		title: '登出',
		path: 'logout',
	},
];

export const ADMIN_HOME_SLOGAN = 'Humans are emotional beings; we laugh, we cry, we get angry, and we feel deeply. That’s why stories with real warmth can touch our hearts and even plant a seed of hope within us, which can grow into a strong tree in the future.';

export const CLIENT_HOME_OFFLINE_DATA = {
	pageTitle: ['Stars', 'are', 'blind'],
	subPageTitle: '往上看天上的星星而不是往下看你的腳，試圖理解你所看到的，思索宇宙為何存在，好奇一點。<p>&nbsp;</p>——史蒂芬・霍金',
	pageRoute: 'Home',
};

export const DEFAULT_IMAGE = '/assets/bg/default-image-438x438.gif';
