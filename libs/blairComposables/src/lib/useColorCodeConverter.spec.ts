import { describe, expect, it } from 'vitest';
import { useHexToHSL, useHexToRGBA } from './useColorCodeConverter';

describe('useHexToHSL', () => {
	it('色碼轉換：將 Hex 轉成 HSL', () => {
		const HEX_VAL = '#333333';
		const PARSE_INFO = useHexToHSL(HEX_VAL);

		expect(PARSE_INFO).eq('hsl(0, 0%, 20%)');
	});
});

describe('useHexToRGBA', () => {
	it('色碼轉換：將 Hex 轉成 RGBA', () => {
		const HEX_VAL = '#1D988A';
		const PARSE_INFO = useHexToRGBA(HEX_VAL);

		expect(PARSE_INFO).toEqual({
			hex_six: HEX_VAL,
			r: 29,
			g: 152,
			b: 138,
		});
	});
});
