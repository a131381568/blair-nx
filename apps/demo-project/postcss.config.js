const { join } = require('node:path');

module.exports = {
	plugins: {
		'tailwindcss/nesting': 'postcss-nesting',
		'tailwindcss': {
			config: join(__dirname, 'tailwind.config.js'),
		},
		'autoprefixer': {},
	},
};
