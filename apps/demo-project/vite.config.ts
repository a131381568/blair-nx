import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import commonjs from '@rollup/plugin-commonjs';
import requireTransfrom from 'vite-plugin-require-transform';

export default defineConfig({
	root: __dirname,
	cacheDir: '../../node_modules/.vite/apps/demo-project',
	plugins: [
		commonjs(),
		vue(),
		nxViteTsPaths(),
		nxCopyAssetsPlugin(['*.md']),
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
			reportsDirectory: '../../coverage/apps/demo-project',
			provider: 'v8',
		},
	},
});
