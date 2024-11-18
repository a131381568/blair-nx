import type { Page } from '@playwright/test';

export const waitForLoadMore = async (page: Page) => {
	await page.waitForTimeout(2000);
};

export const getElementCount = async (page: Page, selector: string): Promise<number> => {
	return await page.locator(selector).count();
};
