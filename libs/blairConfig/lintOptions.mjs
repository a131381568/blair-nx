import nxPlugins from '@nx/eslint-plugin';
import pluginCypress from 'eslint-plugin-cypress/flat';
import pluginTailwindCSS from 'eslint-plugin-tailwindcss';

export default [
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
			'**/prisma',
			'**/.DS_Store',
			'**/*.bru',
			'**/.env.*',
			'**/.env',
			'**/.dockerignore',
			'**/.github/*',
			'**/deployment/*',
			'**/test-results/*',
			'**/playwright-report/*',
			'**/playwright/.cache/*',
			'**/e2e/*.png',
			'**/e2e/*.pdf',
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
			'!**/apps/cts-back-end/src/features/shared/response-handler.ts'
		],
		rules: {
			'node/prefer-global/process': ['error', 'always'],
		},
	},
	{
		rules: {
			'antfu/top-level-function': 'off',
			'prefer-arrow-callback': 'off',
			'@typescript-eslint/no-unused-vars': ['error', {
				'argsIgnorePattern': '^_',
				'varsIgnorePattern': '^_',
				'caughtErrorsIgnorePattern': '^_'
			}],
			'unused-imports/no-unused-vars': ['error', {
				'argsIgnorePattern': '^_',
				'varsIgnorePattern': '^_',
				'caughtErrorsIgnorePattern': '^_'
			}],
			'no-mixed-spaces-and-tabs': [2, false]
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
			'**/*.types.ts',
			'**/*.schemas.ts',
			'**/*.spec.ts'
		],
		rules: {
			'@typescript-eslint/consistent-type-imports': 'off'
		},
	},
	// cy
	pluginCypress.configs.recommended,
	pluginCypress.configs.globals,
	// tailwindCSS
	...pluginTailwindCSS.configs['flat/recommended'],
];
