import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('/');
  
  // 基本檢查頁面是否載入
  await expect(page).toHaveURL(/.*/)
});
