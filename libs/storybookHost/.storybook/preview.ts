import type { Preview } from '@storybook/vue3';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import '@blair-nx-config/tailwindStyle.css';

const preview: Preview = {
	parameters: {
		viewport: {
			viewports: {
				...INITIAL_VIEWPORTS,
				...MINIMAL_VIEWPORTS,
			},
		},
	},
	decorators: [
		(story) => {
			return {
				components: { story },
				template: '<story />',
			};
		},
	],
};
export default preview;
