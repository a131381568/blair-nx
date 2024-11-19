import type { Page, Route } from '@playwright/test';
import { expect } from '@playwright/test';
import axios from 'axios';
import { tryit } from 'radash';
import { AUTH_CONFIG } from '@cts-shared';
import { LoginPage } from '../pages/login.page';
import { TEST_CONFIG } from '../config/test.config';

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

	// check modal
	async showModelCheckText(text: string) {
		await this.page.waitForSelector(`[data-testid="blairUI__messageModal"]`, { state: 'visible', timeout: 10000 });
		await expect(this.page.locator(`[data-testid="blairUI__messageModal__msg"]`)).toContainText(text);
	};

	async showModelIsSuccess() {
		await this.showModelCheckText('Update success');
	};

	async showModelIsCreate() {
		await this.showModelCheckText('Create success');
	};

	// cookie
	async setCookies(cookies: Array<{ name: string; value: string }>) {
		await this.page.context().addCookies(
			cookies.map(cookie => ({
				...cookie,
				domain: 'localhost',
				path: '/',
				expires: Math.floor(Date.now() / 1000) + 3600,
			})),
		);
	}

	async getCookie(name: string) {
		const cookies = await this.page.context().cookies();
		return cookies.find(cookie => cookie.name === name);
	}

	// login by api
	async loginAdmin() {
		const getTokenGroup = () => axios.post(`${TEST_CONFIG.apiUrl}/auth/login`, TEST_CONFIG.users.admin);

		const [_err, tokenGroup] = await tryit(getTokenGroup)();
		const { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } = AUTH_CONFIG;
		const accessTokenVal = tokenGroup?.data?.data.accessToken;
		const refreshTokenVal = tokenGroup?.data?.data.refreshToken;

		await this.setCookies([
			{ name: ACCESS_TOKEN_KEY, value: String(accessTokenVal) },
			{ name: REFRESH_TOKEN_KEY, value: String(refreshTokenVal) },
		]);
	};
}
