import { nanoid } from 'nanoid';
import { md5 } from './encrypt.util';

export const getAvatar = (mail: string | undefined) => {
	if (!mail)
		return '';
	return `https://cravatar.cn/avatar/${md5(mail)}?d=retro`;
};

export const generateUUID = (size: number = 21): string => nanoid(size); ;

generateUUID();

export const generateShortUUID = () => nanoid(10);

export const randomValue = (
	size = 16,
	dict = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict',
): string => {
	let id = '';
	let i = size;
	const len = dict.length;
	while (i--) id += dict[(Math.random() * len) | 0];
	return id;
};

export const hashString = (str: string, seed = 0) => {
	let h1 = 0xDEADBEEF ^ seed;
	let h2 = 0x41C6CE57 ^ seed;
	for (let i = 0, ch; i < str.length; i++) {
		ch = str.charCodeAt(i);
		h1 = Math.imul(h1 ^ ch, 2654435761);
		h2 = Math.imul(h2 ^ ch, 1597334677);
	}
	h1
    = Math.imul(h1 ^ (h1 >>> 16), 2246822507)
    ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
	h2
    = Math.imul(h2 ^ (h2 >>> 16), 2246822507)
    ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
	return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};
