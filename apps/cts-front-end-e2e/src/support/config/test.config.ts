import dotenv from 'dotenv';

dotenv.config({ path: 'apps/cts-front-end-e2e/.env' });

export const TEST_CONFIG = {
	users: {
		admin: {
			email: process.env.TEST_ADMIN_EMAIL,
			password: process.env.TEST_ADMIN_PASSWORD,
		},
	},
	baseUrl: process.env.VITE_APP_HOST,
} as const;
