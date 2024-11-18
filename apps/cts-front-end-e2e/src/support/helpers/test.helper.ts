import type { Page, Route } from '@playwright/test';
import { TEST_CONFIG } from '../config/test.config';
import { LoginPage } from '../pages/login.page';

export class TestHelper {
	constructor(private page: Page) {}

	static readonly TEST_USERS = TEST_CONFIG.users;

	async loginAsAdmin() {
		await this.loginAs('admin');
	}

	// 使用特定帳號登入
	async loginAs(userType: keyof typeof TestHelper.TEST_USERS) {
		const loginPage = new LoginPage(this.page);
		const user = TestHelper.TEST_USERS[userType];
		await loginPage.goto();
		await loginPage.login(user.email, user.password);
		await loginPage.expectLoginSuccess();
	}

	// 登入並前往特定頁面
	async loginAndNavigateTo(
		userType: keyof typeof TestHelper.TEST_USERS,
		path: string,
	) {
		await this.loginAs(userType);
		await this.page.goto(`${TEST_CONFIG.baseUrl}${path}`);
	}

	async logout() {
		//
	}

	// 清除登入狀態
	async clearLoginState() {
		await this.page.context().clearCookies();
	}

	// 模擬 API 回應
	async mockApiResponse(path: string, response: unknown) {
		await this.page.route(path, async (route: Route) => {
			await route.fulfill({ json: response });
		});
	}
}
