/// <reference types='vitest' />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import commonjs from '@rollup/plugin-commonjs';
import requireTransfrom from 'vite-plugin-require-transform';

export default defineConfig({
	root: __dirname,
	cacheDir: '../../node_modules/.vite/libs/blairComposables',
	plugins: [
		commonjs(),
		vue(),
		nxViteTsPaths(),
		requireTransfrom({
			fileRegex: /.js$|.vue$|.png$|.ts$|.jpg$|.json$/,
		}),
	],
	test: {
		watch: false,
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		reporters: ['verbose'],
		coverage: {
			reportsDirectory: '../../coverage/libs/blairComposables',
			provider: 'v8',
		},
	},
});
