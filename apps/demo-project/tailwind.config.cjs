import { createGlobPatternsForDependencies } from '@nx/vue/tailwind';

const { join } = require('node:path');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		join(__dirname, 'index.html'),
		join(__dirname, 'src/**/*!(*.stories|*.spec).{vue,ts,tsx,js,jsx}'),
		...createGlobPatternsForDependencies(__dirname),
	],
	prefix: 'tw-',
	theme: {
		colors: {
			'demo-main': '#104a65',
			'demo-sub': '#e9d6bd',
			'transparent': 'transparent',
		},
		backgroundColor: () => ({
			'demo-main': '#104a65',
			'demo-sub': '#e9d6bd',
			'transparent': 'transparent',
		}),
	},
};
