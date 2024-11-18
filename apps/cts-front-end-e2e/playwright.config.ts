import { defineConfig, devices } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';
import { workspaceRoot } from '@nx/devkit';
import { TEST_CONFIG } from './src/support/config/test.config';

const projects = [
	{
		name: 'chromium',
		use: { ...devices['Desktop Chrome'] },
	},
];

if (!process.env.CI) {
	// CI 環境中可能只運行 chromium 測試
	projects.push(
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
	);
}

// 取得專案根目錄路徑
const projectDir = `${workspaceRoot}/apps/cts-front-end-e2e`;

export default defineConfig({
	...nxE2EPreset(__filename, { testDir: './src/e2e' }),
	testMatch: ['*.spec.ts'],
	timeout: 30000,
	expect: {
		timeout: 5000,
	},
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0, // 增加重試次數
	workers: process.env.CI ? 1 : undefined, // 減少並行執行以提高穩定性
	reporter: process.env.CI
		? 'dot'
		: [['html', {
				outputFolder: `${projectDir}/playwright-report`,
				open: 'never', // 避免自動打開報告
			}], ['list']],
	outputDir: `${projectDir}/test-results`,
	use: {
		baseURL: TEST_CONFIG.baseUrl,
		// CI 環境中的追蹤和截圖設定
		trace: process.env.CI ? 'on-first-retry' : 'on', // 啟用追蹤
		screenshot: process.env.CI ? 'only-on-failure' : 'on', // 失敗時截圖
		// video: 'on-first-retry', // 啟用影片錄製
		// actionTimeout: 10000, // 動作超時
		// navigationTimeout: 30000, // 導航超時
	},
	projects,
	webServer: {
		command: 'pnpm exec nx serve cts-front-end',
		url: TEST_CONFIG.baseUrl,
		reuseExistingServer: !process.env.CI,
		timeout: 120000,
	},
});
