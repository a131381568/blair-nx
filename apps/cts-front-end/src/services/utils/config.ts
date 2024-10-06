const apiPort = `${import.meta.env.VITE_APP_DATA_PORT}` ? `:${import.meta.env.VITE_APP_DATA_PORT}` : '';
// baseUrl
export const url = `${import.meta.env.VITE_APP_API}${apiPort}/`;
// mockUrl
export const mockUrl = `${import.meta.env.VITE_APP_MOCK_API}${apiPort}/`;
