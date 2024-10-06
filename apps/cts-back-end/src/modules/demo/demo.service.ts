import { Injectable } from '@nestjs/common';

@Injectable() // 由於需要告知 module 這個是依賴注入的 class，所以透過 injectable() 裝飾器裝飾。
export class DemoService {
	getData(): { message: string } {
		return { message: 'Hello API' };
	}

	getHello(): string { // 開發對應的商業邏輯
		return 'Hello World!';
	}
}
