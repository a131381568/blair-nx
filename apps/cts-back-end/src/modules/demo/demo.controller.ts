import { Controller, Get } from '@nestjs/common';
import { DemoService } from './demo.service';

@Controller() // 這邊可以輸入路徑相關參數
export class DemoController {
	constructor(private readonly demoService: DemoService) {}

	@Get()
	getData() {
		return this.demoService.getData();
	}

	@Get('hello') // `/hello`
	getHello(): string {
		return this.demoService.getHello(); // 調用 DemoService 的 getHello() method
	}
}
