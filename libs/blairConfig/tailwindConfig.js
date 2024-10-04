/** @type {import('tailwindcss').Config} */

module.exports = {
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
