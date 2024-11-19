import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { tryit } from 'radash';
import { TEST_CONFIG } from '../config/test.config';

export default async function () {
	// const API_HOST = TEST_CONFIG.apiUrl;
	// const bindHeaderInfo = { headers: { Authorization: ''	} };

	// const loginAdmin = (): Promise<AxiosResponse<{
	// 	success: boolean;
	// 	data: { accessToken: string;refreshToken: string };
	// }>> => axios.post(`${API_HOST}/auth/login`, TEST_CONFIG.users.admin);

	// const [_err, tokenGroup] = await tryit(loginAdmin)();
	// bindHeaderInfo.headers.Authorization = `Bearer ${tokenGroup?.data?.data.accessToken}`;

	// // recover home
	// axios.put(`${API_HOST}/page-info/7H7WpBGe46`, {
	// 	pageTitle: 'Catch the stars',
	// 	subPageTitle: '誰能數得清天上的星星？誰能說出它們對世界的影響？——詹·湯姆遜',
	// 	pageRoute: 'Home',
	// }, bindHeaderInfo);

	// // recover about
	// axios.post(`${API_HOST}/about-info`, {
	// 	visual: '/img/kenny-logo.png',
	// 	slogan: '我們是「雲上的小貓」，致力於寫下故事、留下故事。',
	// 	philosophy: '人是被賦予豐富情感的動物，會笑、會哭、會憤怒、會感動，所以有溫度的故事是能夠觸動人心的，甚至能夠在心中種下一顆希望的種子，在未來成長為茁壯的大樹。<br />\n正因凡走過必留下痕跡，可以是歷史？\n也可以是虛構的童話？\n不管它是什麼？<br />\n總會能夠會帶給我們些什麼？\n對吧？<br />\n無論是虛無飄渺的疑問？還是膽戰心驚的恐懼？又或著肯定的勇氣？每個人都有故事，因為這是我們自己開啟的故事——。',
	// 	quote: '「我和他就好像天上的星星，遠看好像距離很近，但實際上卻是相當遙遠的。」<br />\n「這片夜空中，只有一顆星星在微弱的閃鑠著，好像很孤單一樣？但是我們每個人只要一抬頭就能看見它，<br />所以即使身在遠方，星星也能夠獨自努力發光了。」<br /><br />\n——《虎與龍》',
	// 	epilogue: '『打從地球誕生的那一刻起，天空就已經用這樣的姿態為我們在夜晚蓋上滿天星斗的布幕了。』<br />\n在這宏觀的世界，世人們將星座和神話故事相互結合，把夜空中同一個區域的星星，分為一個個的星座，每一個星座都有屬於它們自己的故事，令人嚮往和好奇。<br />\n而製造這浪漫的舞台，究竟是什麼構造？它們的由來又什麼？是否是我們能夠觸手可及的呢？\n它們一直都存在我們的身旁，只是我們一直都沒注意到而已。<br />\n<strong class=\'text-sp-color-light\'>這次讓我們來好好記下它們的存在的軌跡。</strong>',
	// }, bindHeaderInfo);
};
