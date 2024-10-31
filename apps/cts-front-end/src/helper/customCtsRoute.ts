import type { Router } from 'vue-router';

export const hrefLoginPage = () => (window.location.href = '/login');

export const linkBoardPage = (router: Router) => router.push('/board');

export const linkNotFoundPage = (router: Router) => router.push('/notfound');

export const linkHome = (router: Router) => router.push('/');