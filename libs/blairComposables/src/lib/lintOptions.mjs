import nxPlugins from '@nx/eslint-plugin';
import pluginCypress from 'eslint-plugin-cypress/flat';

export default [
	{
		typescript: {
			tsconfigPath: 'tsconfig.json',
		},
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
			'@nx/enforce-module-boundaries': [
				'error',
				{
					enforceBuildableLibDependency: true,
					allow: [
						'../../libs/blairComposables/src/lib/lintOptions.mjs',
					],
					depConstraints: [
						{
							sourceTag: 'type:front_libs',
							onlyDependOnLibsWithTags: ['scope:shared', 'type:front_libs'],
						},
						{
							sourceTag: 'type:front_app',
							onlyDependOnLibsWithTags: ['scope:shared', 'type:front_app'],
						},
					],
				},
			],
		},
		plugins: {
			'@nx': nxPlugins,
		},
	},
	// cy
	pluginCypress.configs.recommended,
	pluginCypress.configs.globals,
];
