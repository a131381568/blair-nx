import { describe, expect, it } from 'vitest';
import {
	convertFullToHalfNumber,
	currencyToNumber,
	numberToCurrency,
	phoneAddDash,
	phoneSetTelFormat,
	roundDecimal,
} from './useTransform';

describe('convertFullToHalfNumber', () => {
	it('全型轉半型', () => {
		const fullNum = '１２３４５６７８９０';
		const halfNum = '1234567890';
		const transformToHalf = convertFullToHalfNumber(fullNum);
		expect(transformToHalf).toEqual(halfNum);
	});
});

describe('numberToCurrency', () => {
	it('整數轉換成千分位字串', () => {
		const input = 1234567;
		const expectedOutput = '1,234,567';
		const result = numberToCurrency(input);
		expect(result).toEqual(expectedOutput);
	});

	it('小數四捨五入成整數後，轉換成千分位字串', () => {
		const input = 1234.567;
		const expectedOutput = '1,235';
		const result = numberToCurrency(input);
		expect(result).toEqual(expectedOutput);
	});

	it('測試邊界條件 - 輸入字串', () => {
		const input = 'abcd';
		const expectedOutput = '';
		const result = numberToCurrency(input);
		expect(result).toEqual(expectedOutput);
	});
});

describe('currencyToNumber', () => {
	it('千分位數字字串，轉換成數值', () => {
		const input = '987,654,32';
		const expectedOutput = 98765432;
		const result = currencyToNumber(input);
		expect(result).toEqual(expectedOutput);
	});

	it('千分位小數字串，轉換成數值', () => {
		const input = '9,876.543';
		const expectedOutput = 9876.543;
		const result = currencyToNumber(input);
		expect(result).toEqual(expectedOutput);
	});

	it('傳非數字字串，轉換成數值 0', () => {
		const input = 'abcd';
		const expectedOutput = 0;
		const result = currencyToNumber(input);
		expect(result).toEqual(expectedOutput);
	});
});

describe('phoneAddDash', () => {
	it('手機號碼：加上 - ', () => {
		const input = '0988123654';
		const expectedOutput = '0988 - 123654';
		const result = phoneAddDash(input);
		expect(result).toEqual(expectedOutput);
	});

	it('正常家用電話：加上 - ', () => {
		const input = '0212345678';
		const expectedOutput = '02 - 12345678';
		const result = phoneAddDash(input);
		expect(result).toEqual(expectedOutput);
	});

	it('九碼家用電話：加上 - ', () => {
		const input = '032601234';
		const expectedOutput = '03 - 2601234';
		const result = phoneAddDash(input);
		expect(result).toEqual(expectedOutput);
	});

	it('特殊區碼家電：加上 - ', () => {
		const input = '0496001234';
		const expectedOutput = '049 - 6001234';
		const result = phoneAddDash(input);
		expect(result).toEqual(expectedOutput);
	});
});

describe('phoneSetTelFormat', () => {
	it('轉換成電話超連結：手機號碼', () => {
		const input = '0988123654';
		const expectedOutput = 'tel:+886-988123654';
		const result = phoneSetTelFormat(input);
		expect(result).toEqual(expectedOutput);
	});

	it('轉換成電話超連結：正常家用電話', () => {
		const input = '0212345678';
		const expectedOutput = 'tel:+886-2-12345678';
		const result = phoneSetTelFormat(input);
		expect(result).toEqual(expectedOutput);
	});

	it('轉換成電話超連結：九碼家用電話', () => {
		const input = '032601234';
		const expectedOutput = 'tel:+886-3-2601234';
		const result = phoneSetTelFormat(input);
		expect(result).toEqual(expectedOutput);
	});

	it('轉換成電話超連結：特殊區碼家電', () => {
		const input = '0496001234';
		const expectedOutput = 'tel:+886-49-6001234';
		const result = phoneSetTelFormat(input);
		expect(result).toEqual(expectedOutput);
	});
});

describe('roundDecimal', () => {
	it('指定位數四捨五入：去小數', () => {
		const inputDigit = 0;
		const inputNum = 222.711;
		const expectedOutput = 223;
		const result = roundDecimal({
			val: inputNum,
			precision: inputDigit,
		});
		expect(result).toEqual(expectedOutput);
	});

	it('指定位數四捨五入：小數後一位進位', () => {
		const inputDigit = 1;
		const inputNum = 222.566;
		const expectedOutput = 222.6;
		const result = roundDecimal({
			val: inputNum,
			precision: inputDigit,
		});
		expect(result).toEqual(expectedOutput);
	});

	it('指定位數四捨五入：小數後兩位捨去', () => {
		const inputDigit = 2;
		const inputNum = 222.911;
		const expectedOutput = 222.91;
		const result = roundDecimal({
			val: inputNum,
			precision: inputDigit,
		});
		expect(result).toEqual(expectedOutput);
	});
});
