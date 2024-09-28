export const useHexToHSL = (hex: string) => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) || '#ffffff';

	let r = Number.parseInt(result[1], 16);
	let g = Number.parseInt(result[2], 16);
	let b = Number.parseInt(result[3], 16);

	(r /= 255);
	(g /= 255);
	(b /= 255);

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h;
	let s;
	let l = (max + min) / 2;

	if (max === min) {
		h = s = 0; // achromatic
	}
	else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
			default:
				h = 0;
		}
		h /= 6;
	}

	s = s * 100;
	s = Math.round(s);
	l = l * 100;
	l = Math.round(l);
	h = Math.round(360 * h);

	return `hsl(${h}, ${s}%, ${l}%)`;
};

export const useHexToRGBA = (hex: string, preset: string = '') => {
	let hex_six = '#';

	// check if input is valid hex
	if (!(hex[0] === '#') || !(hex.length === 4 || hex.length === 7) || !/^[A-F0-9]*$/i.test(hex.slice(1))) {
		hex_six = preset.includes('#') ? preset : hex_six.concat(preset);
	}
	// turn 3 digit hex into 6 digit, i.e., #7f1 -> #77ff11
	else if (hex.length === 4) {
		hex_six = hex_six.concat(
			'',
			hex
				.split('')
				.slice(1)
				.map(digit => digit + digit)
				.join(''),
		);
	}
	else {
		hex_six = hex;
	}

	const r = Number.parseInt(hex_six.slice(1, 3), 16);
	const g = Number.parseInt(hex_six.slice(3, 5), 16);
	const b = Number.parseInt(hex_six.slice(5, 7), 16);

	return { hex_six, r, g, b };
};
