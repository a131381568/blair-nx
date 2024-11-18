import { test as base } from '@playwright/test';
import { LoginPage } from '../support/pages/login.page';

// 定義測試固定裝置
interface LoginFixtures {
	loginPage: LoginPage;
}

// 建立測試物件
const test = base.extend<LoginFixtures>({
	loginPage: async ({ page }, use) => {
		const loginPage = new LoginPage(page);
		await loginPage.goto();
		await use(loginPage);
	},
});

test.describe('登入功能測試', () => {
	test('基本登入測試', async ({ loginPage }) => {
		await loginPage.login('kevin@test.com', '123456');
		await loginPage.expectLoginSuccess();
	});

	test('未填寫任何資料時應顯示必填錯誤', async ({ loginPage }) => {
		await loginPage.login();
		await loginPage.expectFieldValidationErrors();
	});

	test('填寫非 email 格式時應顯示格式錯誤', async ({ loginPage }) => {
		await loginPage.login('xxxxxxxxxxx');
		await loginPage.expectInvalidEmailError();
	});

	test('輸入不存在的帳號應顯示驗證失敗', async ({ loginPage }) => {
		await loginPage.login('xxxxxx@gamil.com', 'xxxxxxxxxxx');
		await loginPage.expectModalMessage('驗證失敗');
		await loginPage.closeMessageModal();
	});

	test('輸入錯誤密碼應顯示密碼不正確', async ({ loginPage }) => {
		await loginPage.login('kevin@test.com', 'xxxxxxxxxxx');
		await loginPage.expectModalMessage('密碼不正確');
		await loginPage.closeMessageModal();
	});

	test('正確帳密應可成功登入', async ({ loginPage }) => {
		await loginPage.login('kevin@test.com', '123456');
		await loginPage.expectLoginSuccess();
	});
});
