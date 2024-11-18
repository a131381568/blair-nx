import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class HomePage {
	constructor(private page: Page) {}

	async goto() {
		await this.page.goto('/');
		await expect(this.page.locator(`[data-testid="home__title"]`)).toHaveText('Catch the stars');
	}

	async verifyContent() {
		await expect(this.page.locator(`[data-testid="home__subTitle"]`)).not.toBeEmpty();
		await this.page.locator(`[data-testid="ctsm__readmore__btn"]`).click();
		await expect(this.page.locator('h1')).toHaveText('天文科普');
	}
}
