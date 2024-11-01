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

export const setCookie = (name: string, value: string, time: string) => {
	let expires = '';
	if (time) {
		const unit = time.slice(-1); // 獲取時間單位
		const quantity = Number.parseInt(time.slice(0, -1), 10); // 獲取數量
		let milliseconds = 0;

		switch (unit) {
			case 'd':
				milliseconds = quantity * 24 * 60 * 60 * 1000;
				break;
			case 'h':
				milliseconds = quantity * 60 * 60 * 1000;
				break;
			case 'm':
				milliseconds = quantity * 60 * 1000;
				break;
			default:
				throw new Error('Invalid time format');
		}

		const date = new Date();
		date.setTime(date.getTime() + milliseconds);
		expires = `; expires=${date.toUTCString()}`;
	}
	document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

export const deleteCookie = (key: string) => {
	document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
