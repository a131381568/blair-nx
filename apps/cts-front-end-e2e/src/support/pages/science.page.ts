import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class SciencePage extends BasePage {
	constructor(page: Page) {
		super(page);
	}

	// 選擇器
	private readonly PAGE_TITLE = `[data-testid="pageTitle"]`;
	private readonly PAGE_SUB_TITLE = `[data-testid="pageSubTitle"]`;
	private readonly FILTER_TAG = `[data-testid="science__filter__item"]`;
	private readonly CARD_CONTAINER = `[data-testid="science__cards"]`;
	private readonly SINGLE_CARD = `[data-testid="science__card"]`;
	private readonly CARD_CAT_ID = `[data-testid="science__card__postCategoryId"]`;
	private readonly CARD_TITLE = `[data-testid="science__card__title"]`;
	private readonly CARD_LINK = `[data-testid="science__card__link"]`;
	private readonly API_ROUTE = '/api/science';

	async goto() {
		await this.page.goto('/science');
		await this.page.waitForSelector(this.CARD_CONTAINER);
		await expect(this.page.locator(this.PAGE_SUB_TITLE)).toHaveText('science');
	}

	async verifyAllCardsCategory(postCategoryId: string) {
		const categories = await this.page
			.locator(this.CARD_CAT_ID)
			.allTextContents();
		expect(categories.every(category => category === postCategoryId)).toBeTruthy();
	};

	async verifyContent() {
		const filterItemEl = this.page.locator(this.FILTER_TAG);
		const cardEl = this.page.locator(this.SINGLE_CARD);
		const filterItemCount = await filterItemEl.count();
		const cardCount = await cardEl.count();
		// 確認篩選 tag 跟卡片數量都大於 1
		expect(filterItemCount).toBeGreaterThan(1);
		expect(cardCount).toBeGreaterThan(1);
	}

	async verifyFilterSearch() {
		const ACTIVE_CAT = '科學家';
		// 點擊科學家後驗證
		await this.page.locator(this.FILTER_TAG).filter({ hasText: ACTIVE_CAT }).click();
		await this.waitApiCall(this.API_ROUTE);
		await this.page.waitForLoadState('networkidle', { timeout: 10000 });
		await this.verifyAllCardsCategory(ACTIVE_CAT);
	}

	async verifyCardLink() {
		const cardTitle = await this.page.locator(this.CARD_TITLE).first().textContent();
		this.page.locator(this.CARD_LINK).first().click();
		await this.waitApiCall(this.API_ROUTE);
		const currentTitle = await this.page.locator(this.PAGE_TITLE).textContent();
		expect(currentTitle === cardTitle).toBeTruthy();
	}

	async verifyCardTagLink() {
		const cardCategoryHref = await this.page.locator(this.CARD_CAT_ID).first().getAttribute('href');
		expect(cardCategoryHref, '該分類連結存在').toBeDefined();
		expect(cardCategoryHref, '包含彙整頁字串').toContain('archive');

		await this.page.locator(this.CARD_CAT_ID).first().click();
		await this.waitApiCall(this.API_ROUTE);

		expect(this.page.url()).toContain(cardCategoryHref);
	}
}
