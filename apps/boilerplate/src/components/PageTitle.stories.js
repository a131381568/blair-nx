import PageTitle from './PageTitle.vue';

/**
 * 簡易標題組件
 */
export default {
	component: PageTitle,
	tags: ['autodocs'],
};

export const Default = {
	render: args => ({
		components: { PageTitle },
		setup() {
			return { args };
		},
		template: '<PageTitle v-bind=\'args\' />',
	}),
	args: {
		title: 'Page Title',
	},
};
