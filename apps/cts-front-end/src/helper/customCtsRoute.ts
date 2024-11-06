import type { Router } from 'vue-router';

export const hrefLoginPage = () => (window.location.href = '/login');

export const linkLoginPage = (router: Router) => router.push('/login');

export const linkBoardPage = (router: Router) => router.push('/board');

export const linkNotFoundPage = (router: Router) => router.push('/notfound');

export const linkHome = (router: Router) => router.push('/');

export const linkAdminCategories = (router: Router) => router.push('/board/categories');

export const linkAdminArticle = (router: Router) => router.push('/board/article');

export const linkAdminOrganization = (router: Router) => router.push('/board/organization');

export const linkAdminObservatories = (router: Router) => router.push('/board/observatories');

export const linkAdminStargazer = (router: Router) => router.push('/board/stargazer');
