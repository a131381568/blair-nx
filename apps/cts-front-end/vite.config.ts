import path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import commonjs from '@rollup/plugin-commonjs';
import requireTransfrom from 'vite-plugin-require-transform';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
	root: __dirname,
	cacheDir: '../../node_modules/.vite/apps/cts-front-end',
	plugins: [
		commonjs(),
		vue(),
		nxViteTsPaths(),
		nxCopyAssetsPlugin(['*.md']),
		requireTransfrom({
			fileRegex: /.js$|.vue$|.png$|.ts$|.jpg$|.json$/,
		}),
		vueDevTools(),
	],
	build: {
		// 設定遷移至 project.json
	},
	test: {
		watch: false,
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		reporters: ['verbose'],
		coverage: {
			reportsDirectory: '../../coverage/apps/cts-front-end',
			provider: 'v8',
		},
	},
	resolve: {
		alias: {
			'@ctsf-src': path.resolve(__dirname, './src'),
		},
	},
	css: {
		postcss: path.resolve(__dirname, 'postcss.config.js'),
	},
});
