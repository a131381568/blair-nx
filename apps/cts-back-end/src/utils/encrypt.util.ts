import CryptoJS from 'crypto-js';

const keyString = process.env.CRYPTO_KEY;
const ivString = process.env.CRYPTO_IV;

if (!keyString || !ivString) {
	throw new Error('CRYPTO_KEY and CRYPTO_IV must be set in the environment variables');
}

const key = CryptoJS.enc.Utf8.parse(keyString);
const iv = CryptoJS.enc.Utf8.parse(ivString);

export const aesEncrypt = (data: string): string | undefined => {
	if (!data)
		return data;
	const enc = CryptoJS.AES.encrypt(data, key, {
		iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	});
	return enc.toString();
};

export const aesDecrypt = (data: string): string | undefined => {
	if (!data)
		return data;
	const dec = CryptoJS.AES.decrypt(data, key, {
		iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	});
	return dec.toString(CryptoJS.enc.Utf8);
};

export const md5 = (str: string): string => {
	return CryptoJS.MD5(str).toString();
};
