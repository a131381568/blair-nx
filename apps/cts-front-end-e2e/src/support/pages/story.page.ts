import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class StoryPage extends BasePage {
	constructor(page: Page) {
		super(page);
	}

	// 選擇器
	private readonly PAGE_TITLE = `[data-testid="pageTitle"]`;
	private readonly PAGE_SUB_TITLE = `[data-testid="pageSubTitle"]`;
	private readonly GRID_CONTAINER = `[data-testid="story__grids"]`;
	private readonly SINGLE_GRID = `[data-testid="story__grid"]`;
	private readonly GRID_TITLE = `[data-testid="story__grid__title"]`;
	private readonly GRID_LINK = `[data-testid="story__grid__link"]`;
	private readonly API_ROUTE = '/api/science';

	async goto() {
		await this.page.goto('/story');
		await this.page.waitForSelector(this.GRID_CONTAINER);
		await expect(this.page.locator(this.PAGE_SUB_TITLE)).toHaveText('story');
	}

	async verifyContent() {
		const gridEl = this.page.locator(this.SINGLE_GRID);
		const gridCount = await gridEl.count();
		expect(gridCount).toBeGreaterThan(1);
	}

	async verifyCardLink() {
		const gridTitle = await this.page.locator(this.GRID_TITLE).first().textContent();
		this.page.locator(this.GRID_LINK).first().click();
		await this.waitApiCall(this.API_ROUTE);
		const currentTitle = await this.page.locator(this.PAGE_TITLE).textContent();
		expect(currentTitle === gridTitle).toBeTruthy();
	}
}
