import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class SearchPage extends BasePage {
	constructor(page: Page) {
		super(page);
	}

	// 選擇器
	private readonly PAGE_TITLE = `[data-testid="pageTitle"]`;
	private readonly PAGE_SUB_TITLE = `[data-testid="pageSubTitle"]`;
	// private readonly LIST_CONTAINER = `[data-testid="search__list"]`;
	private readonly SINGLE_ITEM = `[data-testid="search__item"]`;
	private readonly ITEM_TITLE = `[data-testid="search__item__title"]`;
	private readonly ITEM_LINK = `[data-testid="search__item__link"]`;
	private readonly API_ROUTE = '/api/science';
	private readonly SEARCH_INPUT = `input[data-testid="search__input"]`;
	private readonly SEARCH_BTN = `button[data-testid="search__btn"]`;
	private readonly SEARCH_NOTHING_STR = `[data-testid="search__nothing__tip__string"]`; // 查無結果

	async goto() {
		await this.page.goto('/search');
		await expect(this.page.locator(this.PAGE_SUB_TITLE)).toHaveText('search');
	}

	async searchSwitch(keyword: string) {
		await this.page.locator(this.SEARCH_INPUT).waitFor({ state: 'visible' });
		if (keyword)
			await this.page.locator(this.SEARCH_INPUT).fill(keyword);
		await this.page.locator(this.SEARCH_BTN).click();
		await this.waitApiCall(this.API_ROUTE);
	}

	async verifySearchNothing() {
		await expect(this.page.locator(this.SEARCH_NOTHING_STR)).toBeVisible();
	}

	async verifySearchList() {
		await this.page.waitForLoadState('networkidle');
		const listEl = this.page.locator(this.SINGLE_ITEM);
		const listCount = await listEl.count();
		expect(listCount).toBeGreaterThan(1);
	}

	async verifyItemLink() {
		await this.page.waitForTimeout(1000);
		// await this.page.waitForLoadState('networkidle');
		const itemTitle = await this.page.locator(this.ITEM_TITLE).first().textContent();
		this.page.locator(this.ITEM_LINK).first().click();
		await this.waitApiCall(this.API_ROUTE);
		await this.page.locator('.github-markdown-body').waitFor({ state: 'visible' });
		const currentTitle = await this.page.locator(this.PAGE_TITLE).textContent();
		expect(currentTitle === itemTitle).toBeTruthy();
	}
}
