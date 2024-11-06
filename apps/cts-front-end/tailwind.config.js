import plugin from 'tailwindcss/plugin';

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
				'150px': '150px',
				'37/100': '37%',
				'30/100': '30%',
				'15/100': '15%',
				'13/100': '13%',
				'9px': '9px',
				'64px': '64px',
				'1-8em': '1.8em',
				'admin-m-content': 'calc( 100% - 2.75rem )',
			},
			height: {
				'480px': '480px',
				'380px': '380px',
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
			animation: {
				bgEnterAnim: 'bgEnterAnim 3.5s ease-in-out',
				rubberBand: 'rubberBand 1s ease',
				fadeIn: 'fadeIn 1s ease-out 0ms 1 normal both',
				fadeInRightBig: 'fadeInRightBig 1s ease-out 0ms 1 normal both',
				fadeInLeft: 'fadeInLeft 1s ease-out 0ms 1 normal both',
				fadeInUp: 'fadeInUp 1s ease-out 0ms 1 normal both',
				fadeInDown: 'fadeInDown 0.5s ease-out 0ms 1 normal both',
				flipInX: 'flipInX 1s ease-out 0ms 1 normal both',
				flipInY: 'flipInY 1s ease-out 0ms 1 normal both',
				slideInLeft: 'slideInLeft 0.5s ease-out 0ms 1 normal both',
				slideOutLeft: 'slideOutLeft 0.5s ease-out 0ms 1 normal both',
				slideOutUp: 'slideOutUp 0.5s ease-out 0ms 1 normal both',
			},
			keyframes: {
				bgEnterAnim: {
					'0%': {
						background: '#16161d',
						opacity: '1',
					},
					'50%': {
						background: '#1f1f3a',
					},
					'80%': {
						background: '#3b2f4a',
						opacity: '1',
					},
					'100%': {
						background: 'linear-gradient(#16161d, #1f1f3a, #3b2f4a)',
						opacity: '0',
					},
				},
				rubberBand: {
					'0%': { transform: 'scale(1)' },
					'30%': { transform: 'scale(1.3) rotate(-8deg)' },
					'50%': { transform: 'scale(1) rotate(8deg)' },
					'70%': { transform: 'scale(1.3) rotate(-4deg)' },
					'100%': { transform: 'scale(1) rotate(0deg)' },
				},
				bounceOnce: {
					'0%, 20%, 53%, 100%': {
						'animation-timing-function': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
						'transform': 'translate3d(0, 0, 0)',
					},
					'40%, 43%': {
						'animation-timing-function': 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
						'transform': 'translate3d(0, -30px, 0) scaleY(1.1)',
					},
					'70%': {
						'animation-timing-function': 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
						'transform': 'translate3d(0, -15px, 0) scaleY(1.05)',
					},
					'80%': {
						'animation-timing-function': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
						'transform': 'translate3d(0, 0, 0) scaleY(0.95)',
					},
					'90%': {
						transform: 'translate3d(0, -4px, 0) scaleY(1.02)',
					},
				},
				fadeIn: {
					'0%': {
						opacity: '0',
					},
					'100%': {
						opacity: '1',
					},
				},
				fadeInRightBig: {
					'0%': {
						opacity: '0',
						transform: 'translate3d(2000px, 0, 0)',
					},
					'100%': {
						opacity: '1',
						transform: 'translate3d(0, 0, 0)',
					},
				},
				fadeInLeft: {
					'0%': {
						opacity: '0',
						transform: 'translate3d(-100%, 0, 0)',
					},
					'100%': {
						opacity: '1',
						transform: 'translate3d(0, 0, 0)',
					},
				},
				fadeInUp: {
					'0%': {
						opacity: '0',
						transform: 'translate3d(0, 100%, 0)',
					},
					'100%': {
						opacity: '1',
						transform: 'translate3d(0, 0, 0)',
					},
				},
				fadeInDown: {
					'0%': {
						opacity: '0',
						transform: 'translate3d(0, -100%, 0)',
					},
					'100%': {
						opacity: '1',
						transform: 'translate3d(0, 0, 0)',
					},
				},
				slideInLeft: {
					'0%': {
						transform: 'translate3d(-100%, 0, 0)',
						visibility: 'visible',
					},
					'100%': {
						transform: 'translate3d(0, 0, 0)',
					},
				},
				slideOutLeft: {
					'0%': {
						transform: 'translate3d(0, 0, 0)',
					},
					'100%': {
						visibility: 'hidden',
						transform: 'translate3d(-100%, 0, 0)',
					},
				},
				slideOutUp: {
					'0%': {
						transform: 'translate3d(0, 0, 0)',
					},
					'100%': {
						visibility: 'hidden',
						transform: 'translate3d(0, -100%, 0)',
					},
				},
				flipInX: {
					'0%': {
						transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
						opacity: '0',
					},
					'40%': {
						transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
						opacity: '0',
					},
					'60%': {
						transform: 'perspective(400px) rotate3d(1, 0, 0, 10deg)',
						opacity: '1',
					},
					'80%': {
						transform: 'perspective(400px) rotate3d(1, 0, 0, -5deg)',
					},
					'100%': {
						transform: 'perspective(400px)',
					},
				},
				flipInY: {
					'0%': {
						transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)',
						opacity: '0',
					},
					'40%': {
						transform: 'perspective(400px) rotate3d(0, 1, 0, -20deg)',
						opacity: '0',
					},
					'60%': {
						transform: 'perspective(400px) rotate3d(0, 1, 0, 10deg)',
						opacity: '1',
					},
					'80%': {
						transform: 'perspective(400px) rotate3d(0, 1, 0, -5deg)',
					},
					'100%': {
						transform: 'perspective(400px)',
					},
				},
			},
		},
	},
	plugins: [
		plugin(
			function ({ matchUtilities, theme }) {
				matchUtilities(
					{ 'animation-delay': value => ({ 'animation-delay': `${value}ms` }) },
					{ values: theme('animationDelay') },
				);
			},
			{
				theme: {
					animationDelay: {
						500: '500',
						600: '600',
						700: '700',
						800: '800',
						900: '900',
						1000: '1000',
						1500: '1500',
						2000: '2000',
						3000: '3000',
						4000: '4000',
						5000: '5000',
					},
				},
			},
		),
	],
};
