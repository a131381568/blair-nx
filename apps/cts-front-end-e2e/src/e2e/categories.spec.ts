import { expect, test } from '@playwright/test';
import { TestHelper } from '../support/helpers/test.helper';

test.describe('文章分類管理', () => {
	let helperPage: TestHelper;

	test.beforeEach(async ({ page }) => {
		helperPage = new TestHelper(page);
		helperPage.loginAdmin();
	});

	test('新增分類', async ({ page }) => {
		const CREATE_NAME = '蘋果不好吃';
		const CREATE_ID = 'badapple';

		await page.goto('http://localhost:4200/board/categories');
		await page.getByRole('link', { name: '新增', exact: true }).click();
		await page.locator('div').filter({ hasText: /^分類名稱$/ }).getByRole('textbox').fill(CREATE_NAME);
		await page.locator('div').filter({ hasText: /^分類 ID$/ }).getByRole('textbox').fill(CREATE_ID);
		await page.getByRole('button', { name: '儲存新增' }).click();
		await expect(page.getByLabel('新增訊息')).toBeVisible();
		await page.getByRole('button', { name: '確定' }).click();
		// 成功訊息
		await helperPage.showModelIsCreate();
		await expect(page.getByRole('cell', { name: CREATE_NAME })).toBeVisible();
		await expect(page.getByRole('cell', { name: CREATE_ID })).toBeVisible();
	});

	test('sss', () => {
		/*****
		await page.getByRole('row', { name: '蘋果不好吃 badapple' }).getByRole('link').click();
		await page.locator('div').filter({ hasText: /^分類名稱$/ }).getByRole('textbox').click();
		await page.locator('div').filter({ hasText: /^分類名稱$/ }).getByRole('textbox').press('CapsLock');
		await page.locator('div').filter({ hasText: /^分類名稱$/ }).getByRole('textbox').fill('蘋果不好吃吃');
		await page.locator('div').filter({ hasText: /^分類名稱$/ }).getByRole('textbox').press('Enter');
		await page.locator('div').filter({ hasText: /^分類 ID$/ }).getByRole('textbox').click();
		await page.locator('div').filter({ hasText: /^分類 ID$/ }).getByRole('textbox').fill('badapple');
		await page.locator('div').filter({ hasText: /^分類 ID$/ }).getByRole('textbox').press('CapsLock');
		await page.locator('div').filter({ hasText: /^分類 ID$/ }).getByRole('textbox').fill('badappleee');
		await page.getByRole('button', { name: '儲存編輯' }).click();
		await expect(page.getByLabel('更新訊息')).toBeVisible();
		await page.getByRole('button', { name: '確定' }).click();
		await expect(page.getByRole('cell', { name: '蘋果不好吃吃' })).toBeVisible();
		await expect(page.getByRole('cell', { name: 'badappleee' })).toBeVisible();
		await page.getByRole('link', { name: '新增', exact: true }).click();
		await page.locator('div').filter({ hasText: /^分類名稱$/ }).getByRole('textbox').click();
		await page.locator('div').filter({ hasText: /^分類名稱$/ }).getByRole('textbox').press('CapsLock');
		await page.locator('div').filter({ hasText: /^分類名稱$/ }).getByRole('textbox').fill('ㄎ');
		await page.locator('div').filter({ hasText: /^分類名稱$/ }).getByRole('textbox').click();
		await page.locator('div').filter({ hasText: /^分類名稱$/ }).getByRole('textbox').fill('');
		await page.getByText('新增文章分類儲存新增分類名稱分類 ID Copyright').click();
		await page.getByRole('link', { name: '全部分類' }).click();
		await page.getByRole('row', { name: '蘋果不好吃吃 badappleee' }).getByRole('img').nth(1).click();
		await expect(page.getByLabel('刪除訊息')).toBeVisible();
		await expect(page.getByText('確定刪除該分類 ?')).toBeVisible();
		await page.getByRole('button', { name: '確定' }).click();
    *****/
	});
});
