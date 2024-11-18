import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class StargazingPage {
	constructor(protected page: Page) {}

	// 選擇器
	private readonly PAGE_SUB_TITLE = `[data-testid="pageSubTitle"]`;
	private readonly LIST_CONTAINER = `[data-testid="stargazing__list"]`;
	private readonly SINGLE_LI = `[data-testid="stargazing__li"]`;
	private readonly LI_TITLE = `[data-testid="stargazing__li__title"]`;
	private readonly DRAWER_TITLE = `[data-testid="stargazing__drawer__title"]`;
	private readonly DRAWER_CLOSE_BTN = `[data-testid="stargazing__drawer__close"]`;
	private readonly DRAWER_CONTAINER = `[data-testid="stargazing__drawer__container"]`;
	private readonly MAP_CONTAINER = `[data-testid="map-container"]`;

	async goto() {
		await this.page.goto('/stargazing');
		await expect(this.page.locator(this.LI_TITLE).first()).toBeVisible();
		await expect(this.page.locator(this.PAGE_SUB_TITLE)).toHaveText('stargazing');
	}

	async verifyContent() {
		const liEl = this.page.locator(this.SINGLE_LI);
		const liCount = await liEl.count();
		expect(liCount).toBeGreaterThan(1);
	}

	async verifyDrawerToggle() {
		const DARWER_IS_HIDE = /animate-slideOutLeft/;

		await this.page.waitForSelector(this.LIST_CONTAINER);
		const liTitle = await this.page.locator(this.LI_TITLE).first().textContent();
		// 開啟，並驗證是否開啟該項標題
		this.page.locator(this.SINGLE_LI).first().click();
		await expect(this.page.locator(this.DRAWER_CONTAINER)).not.toHaveClass(DARWER_IS_HIDE);
		const currentTitle = await this.page.locator(this.DRAWER_TITLE).textContent();
		expect(currentTitle === liTitle).toBeTruthy();
		// 關閉
		await this.page.locator(this.DRAWER_CLOSE_BTN).click();
		await expect(this.page.locator(this.DRAWER_CONTAINER)).toHaveClass(DARWER_IS_HIDE);
		await expect(this.page.locator(this.LIST_CONTAINER)).toBeVisible();
	}

	async verifyMapInitialized() {
		await this.page.waitForSelector(this.MAP_CONTAINER);
		// 檢查 leaflet 的核心 class 是否存在
		await expect(this.page.locator(this.MAP_CONTAINER)).toHaveClass(/leaflet-container/);
		// 檢查圖磚載入, 控制項存在
		await expect(this.page.locator(`${this.MAP_CONTAINER} .leaflet-tile-loaded`).first()).toBeVisible();
		await expect(this.page.locator(`${this.MAP_CONTAINER} .leaflet-control-zoom`)).toBeVisible();
	}
}
