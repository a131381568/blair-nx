import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class AboutPage {
	constructor(protected page: Page) {}

	async goto() {
		await this.page.goto('/about');
		await expect(this.page.locator(`[data-testid="pageSubTitle"]`)).toHaveText('about');
	}

	async verifyContent() {
		await expect(this.page.locator(`[data-testid="about__slogan"]`)).not.toBeEmpty();
		await expect(this.page.locator(`[data-testid="about__philosophy"] > .github-markdown-body`)).not.toBeEmpty();
		await expect(this.page.locator(`[data-testid="about__quote"] > .github-markdown-body`)).not.toBeEmpty();
		await expect(this.page.locator(`[data-testid="about__epilogue"] > .github-markdown-body`)).not.toBeEmpty();
	}
}
