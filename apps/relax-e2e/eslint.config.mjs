import antfu from '@antfu/eslint-config';
import playwright from 'eslint-plugin-playwright';

export default antfu(
	{
		typescript: true,
		react: true,
		stylistic: {
			indent: 'tab',
			quotes: 'single',
			semi: true,
		},
		formatters: {
			css: true,
			html: true,
			markdown: 'prettier',
			react: true,
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
		rules: {
			'antfu/top-level-function': 'off',
			'prefer-arrow-callback': 'off',
		},
	},
	{
		files: [
			'**/cypress.config.ts',
			'**/apis/*.ts',
			'**/eslint.config.mjs',
			'**/encrypt.util.ts',
			'**/playwright.config.ts',
		],
		rules: {
			'node/prefer-global/process': ['error', 'always'],
		},
	},
	{
		...playwright.configs['flat/recommended'],
		files: ['**/*.spec.ts'],
		rules: {
			...playwright.configs['flat/recommended'].rules,
		},
	},
);
