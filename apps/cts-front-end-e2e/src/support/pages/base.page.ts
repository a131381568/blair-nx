import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class BasePage {
	constructor(protected page: Page) {}

	async checkHorizontalScroll() {
		const bodyWidth = await this.page.evaluate(() => {
			return document.body.scrollWidth <= window.innerWidth;
		});
		expect(bodyWidth).toBeTruthy();
	}

	async clickMenuAndNavigate(routeName: string) {
		await this.page.locator(`[data-testid="menu__toggle__btn"]`).click();
		await this.page.waitForSelector(`[data-testid="menu__modal"]`, { state: 'visible' });
		await this.page.getByText(routeName).click();
		await expect(this.page.locator(`[data-testid="pageSubTitle"]`)).toHaveText(routeName.toLowerCase());
	}

	async waitApiCall(apiUrl: string) {
		const response = await this.page.waitForResponse(res => res.url().includes(apiUrl));
		expect(response.status()).toBe(200);
	}
}
