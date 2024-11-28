import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
	await page.goto('/');

	// await page.waitForTimeout(1000); // 驗證觸發 playwright/no-wait-for-timeout

	// Expect h1 to contain a substring.
	expect(await page.locator('h1').textContent()).toContain('Welcome');
});
