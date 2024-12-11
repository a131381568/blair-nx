export const theme = {
	colors: {
		primary: '#196c24',
		danger: '#e53e3e',
		text: '#2d3748',
		gray: '#718096',
	},
	spacing: {
		sm: '0.5rem',
		md: '1rem',
		lg: '1.5rem',
	},
} as const;

export type Theme = typeof theme;
