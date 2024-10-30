export const url = `${import.meta.env.VITE_APP_API}`;

export const mockUrl = `${import.meta.env.VITE_APP_MOCK_API}/`;

export const AUTH_CONFIG = {
	ACCESS_TOKEN_KEY: 'accessToken',
	REFRESH_TOKEN_KEY: 'refreshToken',
	TOKEN_EXPIRY_DAYS: 0.01042, // 15 minutes in days
	REFRESH_EXPIRY_DAYS: 7,
} as const;

export const QUERY_CONFIG = {
	STALE_TIME: 1000 * 60 * 3, // 3 minutes
	CACHE_TIME: 1000 * 60 * 5, // 5 minutes
} as const;
