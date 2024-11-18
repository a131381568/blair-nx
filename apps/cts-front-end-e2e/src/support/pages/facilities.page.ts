import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class FacilitiesPage {
	constructor(protected page: Page) {}

	// 選擇器
	private readonly PAGE_TITLE = `[data-testid="pageTitle"]`;
	private readonly PAGE_SUB_TITLE = `[data-testid="pageSubTitle"]`;
	private readonly FACILITY_CONTAINER = `[data-testid="facility__items"]`;
	private readonly SINGLE_FACILITY = `[data-testid="facility__item"]`;
	private readonly OBSERVATORY_CAT_OUTER = `[data-testid="observatory__categories__container"]`;
	private readonly OBSERVATORY_CAT = `[data-testid="observatory__category"]`;
	private readonly AGENCY_TITLE = `[data-testid="promotional__agency__title"]`;
	private readonly OBSERVATORY_TABLE_TITLE = `[data-testid="observatory__table__title"]`;
	private readonly TABLE = 'table';

	async goto() {
		await this.page.goto('/facilities');
		await this.page.waitForSelector(this.FACILITY_CONTAINER);
		await expect(this.page.locator(this.PAGE_SUB_TITLE)).toHaveText('facilities');
		expect(this.page.locator(this.PAGE_TITLE)).toHaveText('天文設施');
	}

	async verifyTableHasRows() {
		await expect(this.page.locator(this.OBSERVATORY_CAT_OUTER)).toBeVisible();
		const table = this.page.locator(this.TABLE);
		const rows = await table.locator('tr').count();
		expect(rows).toBeGreaterThan(1);
	}

	async verifyContent() {
		const facilityEl = this.page.locator(this.SINGLE_FACILITY);
		const facilityCount = await facilityEl.count();
		const obsEl = this.page.locator(this.OBSERVATORY_CAT);
		const obsCount = await obsEl.count();

		await expect(this.page.locator(this.AGENCY_TITLE)).toHaveText('推廣機構');
		expect(facilityCount).toBe(3);

		await expect(this.page.locator(this.OBSERVATORY_TABLE_TITLE)).toHaveText('天文台');
		expect(obsCount).toBeGreaterThan(1);
		await this.verifyTableHasRows();
	}

	async verifyItemLink() {
		const items = this.page.locator(this.SINGLE_FACILITY);
		const count = await items.count();

		for (let i = 0; i < count; i++) {
			const item = items.nth(i);
			const link = item.locator('a');
			const href = await link.getAttribute('href');

			expect(href).toMatch(/^https?:\/\/.+/);
		}
	}

	async verifyObservatoryCatChange() {
		await this.page.locator(this.OBSERVATORY_CAT).last().click();
		await this.page.waitForLoadState('networkidle', { timeout: 10000 });
		await this.verifyTableHasRows();
	}
}
