import { expect, test } from '@playwright/test';
import { TestHelper } from '../support/helpers/test.helper';
import { AboutPage } from '../support/pages/about.page';
import { HomePage } from '../support/pages/home.page';

test.describe('管理首頁和關於我', () => {
	let helperPage: TestHelper;
	let aboutPage: AboutPage;
	let homePage: HomePage;

	test.beforeEach(async ({ page }) => {
		helperPage = new TestHelper(page);
		aboutPage = new AboutPage(page);
		homePage = new HomePage(page);
		helperPage.loginAdmin();
	});

	test('首頁-主視覺標語和引言', async ({ page }) => {
		const IMPORT_TITLE = 'Catch the starsaaaa';
		const IMPORT_SUB_TITLE = '誰能數得清天上的星星？誰能說出它們對世界的影響？——詹·湯姆遜 aaaa';

		await aboutPage.goAdmin();
		await page.getByRole('link', { name: '首頁標語' }).click();
		await page.getByRole('button', { name: '編輯標語' }).first().click();
		await page.getByPlaceholder('主視覺標語').clear();
		await page.getByPlaceholder('主視覺標語').fill(IMPORT_TITLE);
		await page.getByPlaceholder('主視覺引言').clear();
		await page.getByPlaceholder('主視覺引言').fill(IMPORT_SUB_TITLE);
		await page.getByRole('button', { name: '儲存標語' }).first().click();
		// 成功訊息
		await helperPage.showModelIsSuccess();
		// 驗證
		await homePage.goto();
		await expect(page.getByTestId('home__title')).toContainText(IMPORT_TITLE);
		await expect(page.getByTestId('home__subTitle')).toContainText(IMPORT_SUB_TITLE);
	});

	test('關於我-理念', async ({ page }) => {
		const IMPORT_SLOGAN = 'oooo我們是「雲上的小貓」，致力於寫下故事、留下故事。';
		const IMPORT_PHILOSOPHY_HTML = 'bbb人是被賦予豐富情感的動物，會笑、會哭、會憤怒、會感動，所以有溫度的故事是能夠觸動人心的，甚至能夠在心中種下一顆希望的種子，在未來成長為茁壯的大樹。<br />\n正因凡走過必留下痕跡，可以是歷史？也可以是虛構的童話？\n不管它是什麼？<br />\n總會能夠會帶給我們些什麼？對吧？<br />\n無論是虛無飄渺的疑問？還是膽戰心驚的恐懼？又或著肯定的勇氣？每個人都有故事，因為這是我們自己開啟的故事——。';
		const IMPORT_PHILOSOPHY_VAL = 'bbb人是被賦予豐富情感的動物，會笑、會哭、會憤怒、會感動，所以有溫度的故事是能夠觸動人心的，甚至能夠在心中種下一顆希望的種子，在未來成長為茁壯的大樹。\n正因凡走過必留下痕跡，可以是歷史？也可以是虛構的童話？\n不管它是什麼？\n總會能夠會帶給我們些什麼？對吧？\n無論是虛無飄渺的疑問？還是膽戰心驚的恐懼？又或著肯定的勇氣？每個人都有故事，因為這是我們自己開啟的故事——。';

		await page.getByRole('link', { name: '關於我們' }).click();
		await page.locator('h2:has-text("關於我們—理念") ~ button').click();
		await page.waitForLoadState('networkidle', { timeout: 10000 });
		await page.getByPlaceholder('關於我們標語').clear();
		await page.getByPlaceholder('關於我們標語').fill(IMPORT_SLOGAN);
		await page.getByPlaceholder('關於我們理念').clear();
		await page.getByPlaceholder('關於我們理念').fill(IMPORT_PHILOSOPHY_HTML);
		await page.locator('h2:has-text("關於我們—理念") ~ button').click();
		// 成功訊息
		await helperPage.showModelIsSuccess();
		// 驗證
		await aboutPage.goto();
		await expect(page.getByTestId('about__slogan')).toContainText(IMPORT_SLOGAN);
		await expect(page.getByTestId('about__philosophy').getByRole('paragraph')).toContainText(IMPORT_PHILOSOPHY_VAL);
	});

	test('關於我-引言', async ({ page }) => {
		const IMPORT_QUOTE__HTML = 'ccc「我和他就好像天上的星星，遠看好像距離很近，但實際上卻是相當遙遠的。」<br />\n「這片夜空中，只有一顆星星在微弱的閃鑠著，好像很孤單一樣？但是我們每個人只要一抬頭就能看見它，<br />\n所以即使身在遠方，星星也能夠獨自努力發光了。」<br /><br />\n——《虎與龍》';
		const IMPORT_QUOTE__VAL = 'ccc「我和他就好像天上的星星，遠看好像距離很近，但實際上卻是相當遙遠的。」\n「這片夜空中，只有一顆星星在微弱的閃鑠著，好像很孤單一樣？但是我們每個人只要一抬頭就能看見它，\n所以即使身在遠方，星星也能夠獨自努力發光了。」\n——《虎與龍》';

		await page.getByRole('link', { name: '關於我們' }).click();
		await page.locator('h2:has-text("關於我們—引言") ~ button').click();
		await page.waitForLoadState('networkidle', { timeout: 10000 });
		await page.getByPlaceholder('關於我們引言').clear();
		await page.getByPlaceholder('關於我們引言').fill(IMPORT_QUOTE__HTML);
		await page.locator('h2:has-text("關於我們—引言") ~ button').click();
		// 成功訊息
		await helperPage.showModelIsSuccess();
		// 驗證
		await aboutPage.goto();
		await expect(page.getByTestId('about__quote').getByRole('paragraph')).toContainText(IMPORT_QUOTE__VAL);
	});

	test('關於我-結語', async ({ page }) => {
		const IMPORT_EPILOGUE__HTML = `ddd『打從地球誕生的那一刻起，天空就已經用這樣的姿態為我們在夜晚蓋上滿天星斗的布幕了。』<br />\n在這宏觀的世界，世人們將星座和神話故事相互結合，把夜空中同一個區域的星星，分為一個個的星座，每一個星座都有屬於它們自己的故事，令人嚮往和好奇。<br />\n而製造這浪漫的舞台，究竟是什麼構造？它們的由來又什麼？是否是我們能夠觸手可及的呢？\n它們一直都存在我們的身旁，只是我們一直都沒注意到而已。<br />\n<strong class='text-sp-color-light'>這次讓我們來好好記下它們的存在的軌跡。</strong>`;
		const IMPORT_EPILOGUE__VAL = 'ddd『打從地球誕生的那一刻起，天空就已經用這樣的姿態為我們在夜晚蓋上滿天星斗的布幕了。』\n在這宏觀的世界，世人們將星座和神話故事相互結合，把夜空中同一個區域的星星，分為一個個的星座，每一個星座都有屬於它們自己的故事，令人嚮往和好奇。\n而製造這浪漫的舞台，究竟是什麼構造？它們的由來又什麼？是否是我們能夠觸手可及的呢？\n它們一直都存在我們的身旁，只是我們一直都沒注意到而已。\n這次讓我們來好好記下它們的存在的軌跡。';

		await page.getByRole('link', { name: '關於我們' }).click();
		await page.locator('h2:has-text("關於我們—結語") ~ button').click();
		await page.waitForLoadState('networkidle', { timeout: 10000 });
		await page.getByPlaceholder('關於我們結語').clear();
		await page.getByPlaceholder('關於我們結語').fill(IMPORT_EPILOGUE__HTML);
		await page.locator('h2:has-text("關於我們—結語") ~ button').click();
		// 成功訊息
		await helperPage.showModelIsSuccess();
		// 驗證
		await aboutPage.goto();
		await expect(page.getByTestId('about__epilogue').getByRole('paragraph')).toContainText(IMPORT_EPILOGUE__VAL);
	});

	/**
	test('復原程序', async ({ page }) => {
		// 1
		const HOME_TITLE = 'Catch the stars';
		const HOME_SUB_TITLE = '誰能數得清天上的星星？誰能說出它們對世界的影響？——詹·湯姆遜';
		await page.getByRole('link', { name: '首頁標語' }).click();
		await page.getByRole('button', { name: '編輯標語' }).first().click();
		await page.getByPlaceholder('主視覺標語').clear();
		await page.getByPlaceholder('主視覺標語').fill(HOME_TITLE);
		await page.getByPlaceholder('主視覺引言').clear();
		await page.getByPlaceholder('主視覺引言').fill(HOME_SUB_TITLE);
		await page.getByRole('button', { name: '儲存標語' }).first().click();
		// 成功訊息
		await helperPage.showModelIsSuccess();
		// 2
		const ABOUT_SLOGAN__HTML = '我們是「雲上的小貓」，致力於寫下故事、留下故事。';
		const ABOUT_PHILOSOPHY_HTML = '人是被賦予豐富情感的動物，會笑、會哭、會憤怒、會感動，所以有溫度的故事是能夠觸動人心的，甚至能夠在心中種下一顆希望的種子，在未來成長為茁壯的大樹。<br />\n正因凡走過必留下痕跡，可以是歷史？也可以是虛構的童話？\n不管它是什麼？<br />\n總會能夠會帶給我們些什麼？對吧？<br />\n無論是虛無飄渺的疑問？還是膽戰心驚的恐懼？又或著肯定的勇氣？每個人都有故事，因為這是我們自己開啟的故事——。';
		await page.getByRole('link', { name: '關於我們' }).click();
		await page.locator('h2:has-text("關於我們—理念") ~ button').click();
		await page.waitForLoadState('networkidle', { timeout: 10000 });
		await page.getByPlaceholder('關於我們標語').clear();
		await page.getByPlaceholder('關於我們標語').fill(ABOUT_SLOGAN__HTML);
		await page.getByPlaceholder('關於我們理念').clear();
		await page.getByPlaceholder('關於我們理念').fill(ABOUT_PHILOSOPHY_HTML);
		await page.locator('h2:has-text("關於我們—理念") ~ button').click();
		// 成功訊息
		await isSuccess(page);
		// 3
		const ABOUT_QUOTE__HTML = '「我和他就好像天上的星星，遠看好像距離很近，但實際上卻是相當遙遠的。」<br />\n「這片夜空中，只有一顆星星在微弱的閃鑠著，好像很孤單一樣？但是我們每個人只要一抬頭就能看見它，<br />\n所以即使身在遠方，星星也能夠獨自努力發光了。」<br /><br />\n——《虎與龍》';
		await page.getByRole('link', { name: '關於我們' }).click();
		await page.locator('h2:has-text("關於我們—引言") ~ button').click();
		await page.waitForLoadState('networkidle', { timeout: 10000 });
		await page.getByPlaceholder('關於我們引言').clear();
		await page.getByPlaceholder('關於我們引言').fill(ABOUT_QUOTE__HTML);
		await page.locator('h2:has-text("關於我們—引言") ~ button').click();
		// 成功訊息
		await isSuccess(page);
		// 4
		const IMPORT_EPILOGUE__HTML = `『打從地球誕生的那一刻起，天空就已經用這樣的姿態為我們在夜晚蓋上滿天星斗的布幕了。』<br />\n在這宏觀的世界，世人們將星座和神話故事相互結合，把夜空中同一個區域的星星，分為一個個的星座，每一個星座都有屬於它們自己的故事，令人嚮往和好奇。<br />\n而製造這浪漫的舞台，究竟是什麼構造？它們的由來又什麼？是否是我們能夠觸手可及的呢？\n它們一直都存在我們的身旁，只是我們一直都沒注意到而已。<br />\n<strong class='text-sp-color-light'>這次讓我們來好好記下它們的存在的軌跡。</strong>`;
		await page.getByRole('link', { name: '關於我們' }).click();
		await page.locator('h2:has-text("關於我們—結語") ~ button').click();
		await page.waitForLoadState('networkidle', { timeout: 10000 });
		await page.getByPlaceholder('關於我們結語').clear();
		await page.getByPlaceholder('關於我們結語').fill(IMPORT_EPILOGUE__HTML);
		await page.locator('h2:has-text("關於我們—結語") ~ button').click();
		// 成功訊息
		await isSuccess(page);
	});
	 */
});
