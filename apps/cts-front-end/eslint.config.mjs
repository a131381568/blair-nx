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
			'**/public',
			'**/assets/img',
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
			'@nx/enforce-module-boundaries': [
				'error',
				{
					enforceBuildableLibDependency: true,
					allow: ['@ctsf-src'],
					depConstraints: [
						{
							sourceTag: 'type:front_app',
							onlyDependOnLibsWithTags: ['type:front_libs', 'type:front_ui', 'type:config', 'type:libs'],
						},
					],
				},
			],
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
						'animate__fadeInUp',
						'animate__fadeInDown',
						'animate__flipInY',
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
						'science-filter-bar',
						'science-filter-item',
						'border-grey',
						'flex-no-shrink',
						'dropdown-menu',
						'grid-card',
						'grid-card-title',
						'grid-card-tag',
						'grid-card-tag-nothing',
						'grid-des-box',
						'grid-card-read',
						'divide-gray-100',
						'stars',
						'star',
						'extras',
						'comet',
						'comet-a',
						'comet-b',
						'comet-c',
						'md-container',
						'post-bottom-meta',
						'tag-name',
						'grid-col-2',
						'timeline-grid',
						'single-timeline-grid',
						'left-line',
						'right-line',
						'single-timeline-grid-link',
						'timeline-loadmore',
						'stargazing-info-description',
						'close-stargazing-menu-btn',
						'stargazing-info-card',
						'stargazing-menu',
						'grid-flow-rows',
						'animate__slideInLeft',
						'facilities-md-container',
						'facility-items',
						'facility-item',
						'facility-item-title',
						'table-filter',
						'table-name',
						'table-container',
						'search-btn',
						'search-nothing-tip',
						'search-loadmore',
						'search-items',
						'search-item',
						'post-grid-items',
						'post-grid-item',
						'oops-before',
						'admin-login-svg-obj',
						'errors-tip',
						'sidebar-logo',
						'infobox',
						'infobox-text',
						'infobox-icon',
						'infobox-grid',
						'board-box',
						'board-box-title',
						'board-box-content',
						'view-mode',
						'editer-inner',
						'edit-mode',
						'admin-sbtn',
						'admin-edit-sbtn',
						'bottom-line-input-gray',
						'about-content-title',
						'home-title',
						'home-content-title',
						'home-slogan',
						'home-title-input',
						'editer-container',
						'admin-title',
						'cls-1',
						'categories-title-box',
						'category-layout-title-box',
						'input-group',
						'category-name-input',
						'bottom-line-input',
						'category-id-input',
						'admin-delete-sbtn',
						'post-title-box',
						'upload-bar',
						'update-btn',
						'post-title-input',
						'post-cat-input',
						'post-cat-select',
					],
				},
			],
		},
	},
);
