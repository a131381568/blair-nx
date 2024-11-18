import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { TEST_CONFIG } from '../config/test.config';

export class LoginPage {
	constructor(private page: Page) {
		this.page = page;
	}

	// 選擇器
	private readonly emailInput = 'input[placeholder="帳號"]';
	private readonly passwordInput = 'input[placeholder="密碼"]';
	private readonly loginButton = 'button:has-text("登入後台")';
	private readonly emailError = '[data-testid="emailError"]';
	private readonly passwordError = '[data-testid="passwordError"]';
	private readonly messageModal = '[data-testid="blairUI__messageModal"]';
	private readonly messageModalText = '[data-testid="blairUI__messageModal__msg"]';
	private readonly adminSidebar = '[data-testid="adminSidebar"]';

	// 頁面操作
	async goto() {
		await this.page.goto(`${TEST_CONFIG.baseUrl}/login`);
		// 增加超時時間和等待條件
		await this.page.waitForLoadState('networkidle');
		await expect(this.page.locator(this.loginButton)).toBeVisible({ timeout: 10000 });
	}

	async login(email?: string, password?: string) {
		try {
			if (email) {
				await this.page.locator(this.emailInput).waitFor({ state: 'visible' });
				await this.page.locator(this.emailInput).clear();
				await this.page.locator(this.emailInput).fill(email);
			}
			if (password) {
				await this.page.locator(this.passwordInput).waitFor({ state: 'visible' });
				await this.page.locator(this.passwordInput).clear();
				await this.page.locator(this.passwordInput).fill(password);
			}
			await this.page.locator(this.loginButton).waitFor({ state: 'visible' });
			await this.page.locator(this.loginButton).click();
		}
		catch (error) {
			console.error('Login failed:', error);
			throw error;
		}
	}

	async closeMessageModal() {
		await this.page.locator(this.messageModal).waitFor({ state: 'visible', timeout: 10000 });
		await this.page.locator(this.messageModal).click();
		await expect(this.page.locator(this.messageModal)).toBeHidden({ timeout: 5000 });
	}

	// 驗證方法
	async expectFieldValidationErrors() {
		await expect(this.page.locator(this.emailError)).toBeVisible({ timeout: 5000 });
		await expect(this.page.locator(this.passwordError)).toBeVisible({ timeout: 5000 });
		await expect(this.page.locator(this.emailError)).toContainText('至少需要 6 個字元');
		await expect(this.page.locator(this.passwordError)).toContainText('至少需要 6 個字元');
	}

	async expectInvalidEmailError() {
		await expect(this.page.locator(this.emailError)).toBeVisible({ timeout: 5000 });
		await expect(this.page.locator(this.emailError)).toContainText('請提供有效的 email');
	}

	async expectModalMessage(message: string) {
		await this.page.waitForSelector(this.messageModal, {
			state: 'visible',
			timeout: 10000,
		});
		await expect(this.page.locator(this.messageModalText)).toContainText(message);
	}

	async expectLoginSuccess() {
		await this.page.waitForLoadState('networkidle');
		await expect(this.page.locator(this.adminSidebar)).toBeVisible({
			timeout: 10000,
		});
		await expect(this.page.locator(this.adminSidebar)).toContainText('標語管理');
	}

	// 新增的輔助方法
	async waitForResponse() {
		await this.page.waitForLoadState('networkidle');
	}

	async takeScreenshotOnFailure(testInfo: string) {
		await this.page.screenshot({
			path: `test-results/${testInfo}-failure.png`,
			fullPage: true,
		});
	}
}
