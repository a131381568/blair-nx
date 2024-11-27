const { join } = require('node:path');
const { createGlobPatternsForDependencies } = require('@nx/vue/tailwind');
const sharedTailwindConfig = require('../../libs/blairConfig/tailwindConfig');

/** @type {import('tailwindcss').Config} */
module.exports = {
	presets: [sharedTailwindConfig],
	content: [
		join(__dirname, 'index.html'),
		join(__dirname, 'src/**/*!(*.stories|*.spec).{vue,ts,tsx,js,jsx}'),
		...createGlobPatternsForDependencies(__dirname),
	],
};
