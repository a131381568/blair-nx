import { expect, test } from '@playwright/test';
import { TestHelper } from '../support/helpers/test.helper';
import { BasePage } from '../support/pages/base.page';

// serial 確保測試順序
test.describe.serial('文章分類管理', () => {
	let helperPage: TestHelper;
	let basePage: BasePage;

	test.beforeEach(async ({ page }) => {
		helperPage = new TestHelper(page);
		basePage = new BasePage(page);
		await helperPage.loginAdmin();
		page.goto('/board/categories');
		await basePage.waitApiCall('/api/post-categories');
		await expect(page.locator('h1')).toHaveText('文章分類管理');
	});

	test('新增分類', async ({ page, browserName }) => {
		const CREATE_NAME = `蘋果不好吃_${browserName}`;
		const CREATE_ID = `apple${browserName}`;

		await page.getByRole('link', { name: '新增', exact: true }).click();
		await page.locator('div').filter({ hasText: /^分類名稱$/ }).getByRole('textbox').fill(CREATE_NAME);
		await page.locator('div').filter({ hasText: /^分類 ID$/ }).getByRole('textbox').fill(CREATE_ID);
		await page.getByRole('button', { name: '儲存新增' }).click();
		await expect(page.getByLabel('新增訊息')).toBeVisible();
		await page.getByRole('button', { name: '確定' }).click();
		// 成功訊息
		await helperPage.showModelIsCreate();
		await expect(page.locator(`[data-title="名稱"]`).filter({ hasText: CREATE_NAME })).toBeVisible();
		await expect(page.locator(`[data-title="ID"]`).filter({ hasText: CREATE_ID })).toBeVisible();
	});

	test('編輯分類', async ({ page, browserName }) => {
		const ORI_NAME = `蘋果不好吃_${browserName}`;
		const EDIT_NAME = `aaaaa蘋果不好吃_${browserName}`;

		const rowEl = page.locator(`tr:has-text("${ORI_NAME}")`);
		await rowEl.waitFor({ state: 'visible' });
		const editLinkEl = rowEl.locator('td[data-title="編輯"] a');
		// 進入編輯頁
		await editLinkEl.click();
		await expect(page.locator('h1')).toHaveText('編輯文章分類');
		const catNameEl = page.locator('div').filter({ hasText: /^分類名稱$/ }).getByRole('textbox');
		await catNameEl.waitFor();
		await catNameEl.clear();
		await catNameEl.fill(EDIT_NAME);
		await expect(catNameEl).toHaveValue(EDIT_NAME);
		// 送出編輯
		await page.getByRole('button', { name: '儲存編輯' }).click();
		await expect(page.getByLabel('更新訊息')).toBeVisible();
		await page.getByRole('button', { name: '確定' }).click();
		await helperPage.showModelIsSuccess();
		await expect(page.locator(`[data-title="名稱"]`).filter({ hasText: EDIT_NAME })).toBeVisible();
	});

	test('刪除分類', async ({ page, browserName }) => {
		const DEL_NAME = `aaaaa蘋果不好吃_${browserName}`;
		const rowEl = page.locator(`tr:has-text("${DEL_NAME}")`);
		await rowEl.waitFor({ state: 'visible' });
		const delLinkEl = rowEl.locator('td[data-title="刪除"] svg');
		await delLinkEl.waitFor({ state: 'visible' });
		await delLinkEl.click();

		await expect(page.getByLabel('刪除訊息')).toBeVisible();
		await page.getByRole('button', { name: '確定' }).click();
		await helperPage.showModelIsDel();
		await expect(page.locator(`[data-title="名稱"]`).filter({ hasText: DEL_NAME })).toBeHidden();
	});
});
