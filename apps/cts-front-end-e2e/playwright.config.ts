import { defineConfig, devices } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';
import { workspaceRoot } from '@nx/devkit';

const projects = [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  }
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
    }
  );
}

// 取得專案根目錄路徑
const projectDir = `${workspaceRoot}/apps/cts-front-end-e2e`;

export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src/e2e' }),
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'dot':[
    ['html', { 
      outputFolder: `${projectDir}/playwright-report`,
      open: 'never' // 避免自動打開報告
    }],
    ['list']
  ],
  outputDir: `${projectDir}/test-results`,
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:4200',
    // CI 環境中的追蹤和截圖設定
    trace: process.env.CI ? 'on-first-retry' : 'on',
    screenshot: process.env.CI ? 'only-on-failure' : 'on',
  },
  projects,
  webServer: {
    command: 'pnpm exec nx serve cts-front-end',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  },
});
