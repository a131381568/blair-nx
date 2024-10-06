import { Test, TestingModule } from '@nestjs/testing';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';

describe('appController', () => {
	let app: TestingModule;
	let appController: DemoController;

	beforeAll(async () => {
		app = await Test.createTestingModule({
			controllers: [DemoController],
			providers: [DemoService],
		}).compile();

		appController = app.get<DemoController>(DemoController);
	});

	describe('use routes', () => {
		it('default should return "Hello API"', () => {
			expect(appController.getData()).toEqual({ message: 'Hello API' });
		});

		it('hello should return "Hello World!"', () => {
			expect(appController.getHello()).toBe('Hello World!');
		});
	});
});
