const { join } = require('node:path');
const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	output: {
		path: join(__dirname, '../../dist/ctsb'),
	},
	plugins: [
		new NxAppWebpackPlugin({
			target: 'node',
			compiler: 'tsc',
			main: './src/main.ts',
			tsConfig: './tsconfig.app.json',
			optimization: false,
			outputHashing: 'none',
			generatePackageJson: true,
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: join(__dirname, 'prisma'), to: 'prisma', toType: 'dir' },
				{ from: join(__dirname, 'deployment'), to: '../ctsb', toType: 'dir' },
			],
		}),
	],
};
