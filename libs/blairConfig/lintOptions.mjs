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
	// cy
	pluginCypress.configs.recommended,
	pluginCypress.configs.globals,
	// tailwindCSS
	...pluginTailwindCSS.configs['flat/recommended'],
];