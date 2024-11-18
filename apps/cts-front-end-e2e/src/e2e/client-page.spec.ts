import { test as base } from '@playwright/test';
import { BasePage } from '../support/pages/base.page';
import { HomePage } from '../support/pages/home.page';
import { SciencePage } from '../support/pages/science.page';
import { AboutPage } from '../support/pages/about.page';
import { StoryPage } from '../support/pages/story.page';
import { FacilitiesPage } from '../support/pages/facilities.page';
import { StargazingPage } from '../support/pages/stargazing.page';
import { SearchPage } from '../support/pages/search.page';

// 定義 fixtures
interface PageFixtures {
	homePage: HomePage;
	basePage: BasePage;
	aboutPage: AboutPage;
	sciencePage: SciencePage;
	storyPage: StoryPage;
	facilitiesPage: FacilitiesPage;
	stargazing: StargazingPage;
	searchPage: SearchPage;
}

// 測試物件配置
const test = base.extend<PageFixtures>({
	homePage: async ({ page }, use) => {
		// page.setViewportSize({ width: 1920, height: 1080 });
		const homePage = new HomePage(page);
		await use(homePage);
	},
	basePage: async ({ page }, use) => {
		const basePage = new BasePage(page);
		await use(basePage);
	},
	aboutPage: async ({ page }, use) => {
		const aboutPage = new AboutPage(page);
		await use(aboutPage);
	},
	sciencePage: async ({ page }, use) => {
		const sciencePage = new SciencePage(page);
		await use(sciencePage);
	},
	storyPage: async ({ page }, use) => {
		const storyPage = new StoryPage(page);
		await use(storyPage);
	},
	facilitiesPage: async ({ page }, use) => {
		const facilitiesPage = new FacilitiesPage(page);
		await use(facilitiesPage);
	},
	stargazing: async ({ page }, use) => {
		const stargazing = new StargazingPage(page);
		await use(stargazing);
	},
	searchPage: async ({ page }, use) => {
		const searchPage = new SearchPage(page);
		await use(searchPage);
	},
});

test.describe('首頁測試', () => {
	test.beforeEach(({ homePage }) => homePage.goto());

	test('檢查顯示欄位', ({ homePage }) => homePage.verifyContent());
	test('水平滾動檢查', ({ basePage }) => basePage.checkHorizontalScroll());
});

test.describe('選單跳轉測試', () => {
	test.beforeEach(({ homePage }) => homePage.goto());

	test('關於我們', ({ basePage }) => basePage.clickMenuAndNavigate('About'));
	test('天文科普', ({ basePage }) => basePage.clickMenuAndNavigate('Science'));
	test('星星物語', ({ basePage }) => basePage.clickMenuAndNavigate('Story'));
	test('天文設施', ({ basePage }) => basePage.clickMenuAndNavigate('Facilities'));
	test('觀星地點', ({ basePage }) => basePage.clickMenuAndNavigate('Stargazing'));
	test('搜尋頁面', ({ basePage }) => basePage.clickMenuAndNavigate('Search'));
});

test.describe('關於我們', () => {
	test.beforeEach(({ aboutPage }) => aboutPage.goto());

	test('檢查顯示欄位', ({ aboutPage }) => aboutPage.verifyContent());
	test('水平滾動檢查', ({ basePage }) => basePage.checkHorizontalScroll());
});

test.describe('天文科普', () => {
	test.beforeEach(({ sciencePage }) => sciencePage.goto());

	test('檢查顯示 Card', ({ sciencePage }) => sciencePage.verifyContent());
	test('水平滾動檢查', ({ basePage }) => basePage.checkHorizontalScroll());
	test('驗證篩選 Bar 切換', ({ sciencePage }) => sciencePage.verifyFilterSearch());
	test('驗證卡片準確性與連結', ({ sciencePage }) => sciencePage.verifyCardLink());
	test('驗證 Card Tag 連結和內容', ({ sciencePage }) => sciencePage.verifyCardTagLink());
});

test.describe('星星故事', () => {
	test.beforeEach(({ storyPage }) => storyPage.goto());

	test('檢查顯示 Grid', ({ storyPage }) => storyPage.verifyContent());
	test('水平滾動檢查', ({ basePage }) => basePage.checkHorizontalScroll());
	test('驗證 Grid 資料與連結', ({ storyPage }) => storyPage.verifyCardLink());
});

test.describe('天文設施', () => {
	test.beforeEach(({ facilitiesPage }) => facilitiesPage.goto());

	test('檢查顯示內容', ({ facilitiesPage }) => facilitiesPage.verifyContent());
	test('水平滾動檢查', ({ basePage }) => basePage.checkHorizontalScroll());
	test('驗證機構連結有效', ({ facilitiesPage }) => facilitiesPage.verifyItemLink());
	test('驗證天文台分類切換', ({ facilitiesPage }) => facilitiesPage.verifyObservatoryCatChange());
});

test.describe('觀星地點', () => {
	test.beforeEach(({ stargazing }) => stargazing.goto());

	test('檢查顯示內容', ({ stargazing }) => stargazing.verifyContent());
	test('水平滾動檢查', ({ basePage }) => basePage.checkHorizontalScroll());
	test('驗證抽屜資訊和開啟關閉', ({ stargazing }) => stargazing.verifyDrawerToggle());
	test('驗證地圖初始化', ({ stargazing }) => stargazing.verifyMapInitialized());
});

test.describe('搜尋', () => {
	test.beforeEach(({ searchPage }) => searchPage.goto());

	test('無結果', async ({ searchPage }) => {
		await searchPage.searchSwitch('xxxxxxxxxx');
		await searchPage.verifySearchNothing();
	});

	test('有結果', async ({ searchPage }) => {
		await searchPage.searchSwitch('月亮');
		await searchPage.verifySearchList();
		// 驗證連結正常
		await searchPage.verifyItemLink();
	});
});

// 為了保險起見，統一處理未捕獲的例外
test.afterEach(async ({ page }, testInfo) => {
	if (testInfo.status !== 'passed') {
		await page.screenshot({
			path: `test-results/${testInfo.title}-failure.png`,
			fullPage: true,
		});
	}
});
