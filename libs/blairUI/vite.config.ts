/// <reference types='vitest' />
import * as path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import commonjs from '@rollup/plugin-commonjs';
import requireTransfrom from 'vite-plugin-require-transform';

export default defineConfig({
	root: __dirname,
	cacheDir: '../../node_modules/.vite/libs/blairUI',
	plugins: [
		commonjs(),
		vue(),
		nxViteTsPaths(),
		requireTransfrom({
			fileRegex: /.js$|.vue$|.png$|.ts$|.jpg$|.json$/,
		}),
		nxCopyAssetsPlugin(['*.md']),
		dts({
			entryRoot: 'src',
			tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
		}),
	],
	build: {
		outDir: '../../dist/libs/blairUI',
		emptyOutDir: true,
		reportCompressedSize: true,
		commonjsOptions: {
			transformMixedEsModules: true,
		},
		lib: {
			// Could also be a dictionary or array of multiple entry points.
			entry: 'src/index.ts',
			name: 'blairUI',
			fileName: 'index',
			// Change this to the formats you want to support.
			// Don't forget to update your package.json as well.
			formats: ['es', 'cjs'],
		},
		rollupOptions: {
			// External packages that should not be bundled into your library.
			external: [],
		},
	},

	test: {
		watch: false,
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		reporters: ['verbose'],
		coverage: {
			reportsDirectory: '../../coverage/libs/blairUI',
			provider: 'v8',
		},
	},
});
