import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller() // 這邊可以輸入路徑相關參數
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('hello') // `/hello`
  getHello(): string {
    return this.appService.getHello();  // 調用 appService 的 getHello() method 
  }
}
