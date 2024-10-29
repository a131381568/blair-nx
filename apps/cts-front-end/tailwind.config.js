const { join } = require('node:path');
const { createGlobPatternsForDependencies } = require('@nx/vue/tailwind');
const sharedTailwindConfig = require('../../libs/blairConfig/tailwindConfig');

const bgPath = process.env.NODE_ENV === 'production' ? 'bg' : '/assets/bg';

/** @type {import('tailwindcss').Config} */
module.exports = {
	presets: [sharedTailwindConfig],
	content: [
		join(__dirname, 'index.html'),
		join(__dirname, 'src/**/*!(*.stories|*.spec).{vue,ts,tsx,js,jsx}'),
		...createGlobPatternsForDependencies(__dirname),
	],
	theme: {
		screens: {
			// default
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
			// add
			'mini-mobile': { max: '375px' },
			'middle-mobile': { max: '500px' },
			'mobile': { max: '767px' },
			'h-table': '768px',
			'w-table': '992px',
			'laptop': '1280px',
			'middle-pc': '1441px',
			'large-pc': '1600px',
			'pro-pc': '1800px',
			'screens-h-900': { raw: '(max-height: 900px)' },
			'screens-h-500': { raw: '(max-height: 500px)' },
		},
		extend: {
			fontFamily: {
				sans: ['Times New Roman', 'Noto Serif TC', 'PingFang TC', 'Heiti TC', 'Microsoft JhengHei', 'Helvetica', 'Arial', 'sans-serif'],
				serif: ['Times New Roman', 'Georgia', 'Times', ' serif'],
			},
			borderColor: () => ({
				'primary': '#c5c5ca',
				'secondary': '#bbb494',
				'danger': '#80b884',
				'sp-color-light': '#80b884',
				'sp-color-dark': '#00910a',
				'main-color-light': '#c5c5ca',
				'main-color-middle': '#747475',
				'main-color-dark': '#1f1f39',
				'main-color-black': '#181824',
				'sub-color-dark': '#968c5e',
				'sub-color-light': '#bbb494',
			}),
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'astrolabe': `url("${bgPath}/home.png")`,
				'menu-about': `url("${bgPath}/menu-bg-01.jpg")`,
				'menu-science': `url("${bgPath}/menu-bg-02.jpg")`,
				'menu-story': `url("${bgPath}/menu-bg-03.jpg")`,
				'menu-facilities': `url("${bgPath}/menu-bg-04.jpg")`,
				'menu-stargazing': `url("${bgPath}/menu-bg-05.jpg")`,
				'menu-search': `url("${bgPath}/menu-bg-06.jpg")`,
				'about-writing': `url("${bgPath}/bg-about-white.jpg")`,
				'story-featured': `url("${bgPath}/story-bg-02.jpg")`,
				'admin-featured': `url("${bgPath}/admin-bg.jpg")`,
				'default-upload-img': `url("${bgPath}/default-image-438x438.gif")`,
			},
			backgroundSize: {
				'auto-500': 'auto 500px',
			},
			lineHeight: {
				'menu-title': '5.5rem',
			},
			boxShadow: {
				'btn-default': 'inset 0 0 0 1px #c5c5ca',
				'30-box': '0px 5px 30px 0px rgb(0 0 0 / 30%)',
			},
			spacing: {
				'0-8em': '0.8em',
				'0-35em': '0.35em',
			},
			letterSpacing: {
				'wide-menu': '0.5rem',
				'wide-content': '0.15rem',
				'wide-title': '0.3rem',
			},
			borderWidth: {
				'callout-box-boder': '10px',
			},
			opacity: {
				6: '0.06',
				12: '0.12',
				18: '0.18',
			},
			maxWidth: {
				'1/2': '50%',
				'375px': '375px',
			},
			width: {
				'480px': '480px',
				'380px': '380px',
				'304px': '304px',
				'200px': '200px',
				'150px': '150px',
				'37/100': '37%',
				'30/100': '30%',
				'15/100': '15%',
				'13/100': '13%',
				'9px': '9px',
				'28px': '28px',
				'29px': '29px',
				'64px': '64px',
				'77px': '77px',
				'1-8em': '1.8em',
				'admin-m-content': 'calc( 100% - 2.75rem )',
			},
			height: {
				'480px': '480px',
				'380px': '380px',
				'304px': '304px',
				'150px': '150px',
				'9px': '9px',
				'80vh': '80dvh',
				'50vh': '50dvh',
				'40vh': '40dvh',
				'0-2em': '0.2em',
			},
			inset: {
				'5px': '5px',
				'4px': '4px',
				'1/2-7px': 'calc(50% - 7px)',
				'1/2-3px': 'calc(50% - 3px)',
			},
			zIndex: {
				10001: '10001',
				10000: '10000',
				9999: '9999',
				999: '999',
				1: '1',
			},
			padding: {
				'320px': '320px',
				'2px': '2px',
				'4px': '4px',
			},
			margin: {
				'0-4em': '0.4em',
			},
			borderRadius: {
				'2em': '2em',
			},
			rotate: {
				225: '225deg',
			},
		},
	},
};
