interface CookieObject {
	[key: string]: string;
}

export const getToken = (key: string | null = null): string | undefined => {
	const cookiesRaw: string = decodeURIComponent(document.cookie);

	if (cookiesRaw.length === 0) {
		return undefined;
	}

	const cookies: CookieObject = cookiesRaw
		.split(';')
		.reduce((acc: CookieObject, cookie: string) => {
			const [name, value] = cookie.split('=').map(part => part.trim());
			if (name && value) {
				acc[name] = value;
			}
			return acc;
		}, {});

	return key ? cookies[key] : undefined;
};

export const setCookie = (name: string, value: string, days: number) => {
	let expires = '';
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = `; expires=${date.toUTCString()}`;
	}
	document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

export const deleteCookie = (key: string) => {
	document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
