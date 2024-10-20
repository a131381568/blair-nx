import antfu from '@antfu/eslint-config';
import nxPlugins from '@nx/eslint-plugin';
import pluginCypress from 'eslint-plugin-cypress/flat';
import pluginTailwindCSS from 'eslint-plugin-tailwindcss';

export default antfu(
	{
		typescript: true,
		vue: true,
		stylistic: {
			indent: 'tab',
			quotes: 'single',
			semi: true,
		},
		formatters: {
			css: true,
			html: true,
			markdown: 'prettier',
			vue: true,
			json: true,
		},
		ignores: [
			'**/fixtures',
			'!**/*',
			'**/node_modules/**',
			'**/cypress/downloads/**',
			'**/cypress/support/**',
			'**/.eslintrc-auto-import.json',
			'**/README.md',
			'**/components.d.ts',
			'**/prisma/migrations',
			'**/prisma/schema.prisma',
			'**/.DS_Store',
			'**/*.bru',
			'**/.env.*',
			'**/.env',
		],
	},
	{
		files: ['**/*.vue'],
		rules: {
			'vue/max-attributes-per-line': ['error', {
				singleline: {
					max: 1,
				},
				multiline: {
					max: 1,
				},
			}],
		},
	},
	{
		files: [
			'**/cypress.config.ts',
			'**/apis/*.ts',
			'**/eslint.config.mjs',
			'**/encrypt.util.ts',
			'!**/apps/cts-back-end/src/features/auth/auth.module.ts',
			'!**/apps/cts-back-end/src/features/auth/jwt.strategy.ts',
			'!**/apps/cts-back-end/src/features/auth/auth.service.ts',
			'!**/apps/cts-back-end/src/main.ts',
			'!**/apps/cts-back-end/src/features/shared/response-handler.ts',
		],
		rules: {
			'node/prefer-global/process': ['error', 'always'],
		},
	},
	{
		rules: {
			'antfu/top-level-function': 'off',
			'prefer-arrow-callback': 'off',
		},
	},
	// nx rule
	{
		rules: {
			'@nx/enforce-module-boundaries': 'off',
		},
		plugins: {
			'@nx': nxPlugins,
		},
	},
	// nestjs
	{
		files: [
			'**/*.service.ts',
			'**/*.module.ts',
			'**/*.controller.ts',
			'**/*.module.*.ts',
			'**/*.controller.*.ts',
			'**/*.interceptor.ts',
			'**/*.filter.ts',
		],
		rules: {
			'@typescript-eslint/consistent-type-imports': 'off',
		},
	},
	// cy
	pluginCypress.configs.recommended,
	pluginCypress.configs.globals,
	...pluginTailwindCSS.configs['flat/recommended'],
	// tailwindCSS
	{
		files: ['**/*.vue'],
		rules: {
			'tailwindcss/no-custom-classname': [
				'warn',
				{
					whitelist: [
						'home-read-more',
						'btn',
						'draw',
						'meet',
						'animate__fadeIn',
						'animate__fadeInLeft',
						'animate__animated',
						'animate__flipInX',
						'animate__fadeInRight',
						'animate__fadeOutLeft',
						'animate__fadeInRightBig',
						'animate__fadeInLeftBig',
						'animate__faster',
						'animate__delay-0.7s',
						'animate__delay-1s',
						'animate__delay-2s',
						'animate__delay-4s',
						'animate__fadeOut',
						'animate__rubberBand',
						'animate__bounce',
						'filter-bg-opacity-none',
						'filter-bg-opacity-20',
						'filter-bg-opacity-50',
						'enter-svg-obj',
						'svg-obj',
						'stop-star-wrapper',
						'stop-star-subtitle',
						'header-logo',
						'header-svg-obj',
						'menu-toggle-btn',
						'bars',
						'top-bar',
						'middle-bar',
						'bottom-bar',
						'modal-bg',
						'modal-content',
						'animate__fadeInDown',
						'menu-grid-ul',
						'text-shadow',
						'callout-box',
						'about-slogan',
						'markdown-body',
						'about-philosophy',
						'about-quote',
						'about-epilogue',
						'title-box-tag',
						'title-box-text',
					],
				},
			],
		},
	},
);
