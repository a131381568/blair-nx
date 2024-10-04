import path from 'node:path';
import type { StorybookConfig } from '@storybook/vue3-vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { mergeConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const config: StorybookConfig = {
	stories: ['../../../apps/**/src/**/*.stories.@(js|jsx|ts|tsx|mdx)', '../../../libs/**/src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
	addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
	framework: {
		name: '@storybook/vue3-vite',
		options: {
		},
	},
	viteFinal: async config =>
		mergeConfig(config, {
			plugins: [vue(), nxViteTsPaths()],
			optimizeDeps: {
				include: ['@storybook/addon-viewport'],
			},
			css: {
				postcss: path.resolve(__dirname, 'postcss.config.js'),
			},
		}),
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
