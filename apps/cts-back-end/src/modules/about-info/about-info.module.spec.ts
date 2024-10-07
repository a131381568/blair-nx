import { Test } from '@nestjs/testing';
import { PrismaModule } from '../../shared/prisma.module';
import { AboutInfoService } from './about-info.service';
import { getAboutInfoSchema } from './about-info-schemas';

describe('關於我驗證', () => {
	let service: AboutInfoService;

	beforeAll(async () => {
		const app = await Test.createTestingModule({
			providers: [AboutInfoService],
			imports: [PrismaModule],
		}).compile();

		service = app.get<AboutInfoService>(AboutInfoService);
	});

	describe('取得關於我資訊', () => {
		it('取得線上資訊, 比對型別', async () => {
			let validatedData = false;
			const data = await service.getAboutInfo();

			try {
				getAboutInfoSchema.parse(data);
				validatedData = true;
			}
			catch (error) {
				validatedData = false;
			}

			expect(validatedData).toBe(true);
		});

		it('使用假資料, 驗證錯誤型別', async () => {
			let validatedData = false;

			try {
				getAboutInfoSchema.parse({
					visual: '/img/kenny-logo.png',
					slogan: 123,
					philosophy: '人是被賦予豐富情感的動物',
					quote: '我和他就好像天上的星星',
					epilogue: '打從地球誕生的那一刻起',
					aboutId: 1,
				});
				validatedData = true;
			}
			catch (error) {
				validatedData = false;
			}

			expect(validatedData).toBe(false);
		});
	});

	describe('更新關於我資訊', () => {
		it('更新 visual', async () => {
			const INPUT_VAL = 'ccc.jpg';
			const data = await service.updateAboutInfo({
				visual: INPUT_VAL,
			});
			expect(data.visual).toBe(INPUT_VAL);
		});

		it('更新 slogan', async () => {
			const INPUT_VAL = 'good';
			const data = await service.updateAboutInfo({
				slogan: INPUT_VAL,
			});
			expect(data.slogan).toBe(INPUT_VAL);
		});

		it('更新 philosophy', async () => {
			const INPUT_VAL = '內容A';
			const data = await service.updateAboutInfo({
				philosophy: INPUT_VAL,
			});
			expect(data.philosophy).toBe(INPUT_VAL);
		});

		it('更新 quote', async () => {
			const INPUT_VAL = '內容B';
			const data = await service.updateAboutInfo({
				quote: INPUT_VAL,
			});
			expect(data.quote).toBe(INPUT_VAL);
		});

		it('更新 epilogue', async () => {
			const INPUT_VAL = '內容C';
			const data = await service.updateAboutInfo({
				epilogue: INPUT_VAL,
			});
			expect(data.epilogue).toBe(INPUT_VAL);
		});

		it('恢復成原始資訊', async () => {
			const ORI_ABOUT_DATA = {
				visual: '/img/kenny-logo.png',
				slogan: '我們是「雲上的小貓」，致力於寫下故事、留下故事。',
				philosophy: '人是被賦予豐富情感的動物，會笑、會哭、會憤怒、會感動，所以有溫度的故事是能夠觸動人心的，甚至能夠在心中種下一顆希望的種子，在未來成長為茁壯的大樹。<br />\n正因凡走過必留下痕跡，可以是歷史？\n也可以是虛構的童話？\n不管它是什麼？<br />\n總會能夠會帶給我們些什麼？\n對吧？<br />\n無論是虛無飄渺的疑問？還是膽戰心驚的恐懼？又或著肯定的勇氣？每個人都有故事，因為這是我們自己開啟的故事——。',
				quote: '「我和他就好像天上的星星，遠看好像距離很近，但實際上卻是相當遙遠的。」<br />\n「這片夜空中，只有一顆星星在微弱的閃鑠著，好像很孤單一樣？但是我們每個人只要一抬頭就能看見它，<br />所以即使身在遠方，星星也能夠獨自努力發光了。」<br /><br />\n——《虎與龍》',
				epilogue: '『打從地球誕生的那一刻起，天空就已經用這樣的姿態為我們在夜晚蓋上滿天星斗的布幕了。』<br />\n在這宏觀的世界，世人們將星座和神話故事相互結合，把夜空中同一個區域的星星，分為一個個的星座，每一個星座都有屬於它們自己的故事，令人嚮往和好奇。<br />\n而製造這浪漫的舞台，究竟是什麼構造？它們的由來又什麼？是否是我們能夠觸手可及的呢？\n它們一直都存在我們的身旁，只是我們一直都沒注意到而已。<br />\n<strong class="text-sp-color-light">這次讓我們來好好記下它們的存在的軌跡。</strong>',
			};

			const data = await service.updateAboutInfo(ORI_ABOUT_DATA);
			expect(data).toEqual({
				...ORI_ABOUT_DATA,
				aboutId: 1,
			});
		});
	});
});
