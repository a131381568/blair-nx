export const url = `${import.meta.env.VITE_APP_API}`;

export const mockUrl = `${import.meta.env.VITE_APP_MOCK_API}/`;

export const QUERY_CONFIG = {
	STALE_TIME: 1000 * 60 * 3,
	CACHE_TIME: 1000 * 60 * 5,
} as const;
