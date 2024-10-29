/** @type {import('tailwindcss').Config} */

module.exports = {
	theme: {
		extend:{
			fontFamily: {
				'sans': ['Times New Roman', 'PingFang TC', 'Heiti TC', "Microsoft JhengHei", 'Helvetica', 'Arial', 'sans-serif'],
				'serif': ['Times New Roman', 'Georgia', 'Times', ' serif']
			},
			fontSize: {
				'tiny': '.938rem',
				'menu-title': '5.5rem',
				'20vw': '20vw',
				'middle': '0.9375rem'
			},
			colors: {
				'demo-main': '#104a65',
				'demo-sub': '#e9d6bd',
				'transparent': 'transparent',
				'sp-color-light': '#80b884',
				'sp-color-dark': '#00910a',
				'main-color-light': '#c5c5ca',
				'main-color-middle': '#747475',
				'main-color-dark': '#1f1f39',
				'main-color-black': '#181824',
				'sub-color-dark': '#968c5e',
				'sub-color-light': '#bbb494',
				'secondary': '#c5c5ca',
				'danger': '#80b884',
			},
			backgroundColor: () => ({
				'demo-main': '#104a65',
				'demo-sub': '#e9d6bd',
				'transparent': 'transparent',
				'gray': '#808080',
				'sp-color-light': '#80b884',
				'sp-color-dark': '#00910a',
				'main-color-light': '#c5c5ca',
				'main-color-middle': '#747475',
				'main-color-dark': '#1f1f39',
				'main-color-black': '#181824',
				'sub-color-dark': '#968c5e',
				'sub-color-light': '#bbb494',
				'secondary': '#c5c5ca',
				'danger': '#80b884',
			}),
		}
	},
};
