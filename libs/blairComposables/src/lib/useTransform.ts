const customTellphoneRule = /^037|049|089|082/;

export const convertFullToHalfNumber = (str: string) => {
	// 全型轉半型
	let tmp = '';
	for (let i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
			tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
		}
		else {
			tmp += String.fromCharCode(str.charCodeAt(i));
		}
	}
	tmp.replace(/\s/g, '');

	return tmp;
};

export const numberToCurrency = (number: number | string) => {
	const n = Number(number);
	if (Number.isNaN(n)) {
		return '';
	}

	return `${n.toFixed(0).replace(/./g, (c, i, a) => {
		const currency = i && c !== '.' && (a.length - i) % 3 === 0 ? `, ${c}`.replace(/\s/g, '') : c;
		return currency;
	})}`;
};

export const currencyToNumber = (number: string) => Number(number.replace(/[^0-9.-]+/g, ''));

export const phoneAddDash = (phoneStr: string) => {
	const isCustomTell = customTellphoneRule.test(phoneStr.slice(0, 3));
	let frontNum = '';
	let lastNum = '';
	if (phoneStr.slice(0, 2) === '09') {
		frontNum = phoneStr.slice(0, 4);
		lastNum = phoneStr.slice(4);
	}
	else if (isCustomTell) {
		frontNum = phoneStr.slice(0, 3);
		lastNum = phoneStr.slice(3);
	}
	else {
		frontNum = phoneStr.slice(0, 2);
		lastNum = phoneStr.slice(2);
	}
	return `${frontNum} - ${lastNum}`;
};

// 將電話轉成可撥打的格式
export const phoneSetTelFormat = (phoneStr: string) => {
	const prefix = 'tel:+886-';
	const isCustomTell = customTellphoneRule.test(phoneStr.slice(0, 3));
	if (phoneStr.slice(0, 2) === '09') {
		const lastNum = phoneStr.slice(1);
		return prefix + lastNum;
	}
	else if (isCustomTell) {
		const frontNum = phoneStr.slice(1, 3);
		const lastNum = phoneStr.slice(3);
		return `${prefix + frontNum}-${lastNum}`;
	}
	else {
		const frontNum = phoneStr.slice(1, 2);
		const lastNum = phoneStr.slice(2);
		return `${prefix + frontNum}-${lastNum}`;
	}
};

// 將數字四捨五入至指定的小數位
export const roundDecimal = ({ val, precision }: { val: number; precision: number }) => {
	return Math.round(Math.round(val * 10 ** ((precision || 0) + 1)) / 10) / 10 ** (precision || 0);
};
