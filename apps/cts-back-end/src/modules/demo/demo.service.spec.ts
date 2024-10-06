import { Test } from '@nestjs/testing';
import { DemoService } from './demo.service';

describe('demoService', () => {
	let service: DemoService;

	beforeAll(async () => {
		const app = await Test.createTestingModule({
			providers: [DemoService],
		}).compile();

		service = app.get<DemoService>(DemoService);
	});

	describe('return result', () => {
		it('getData should return "Hello API"', () => {
			expect(service.getData()).toEqual({ message: 'Hello API' });
		});

		it('getHello should return "Hello API"', () => {
			expect(service.getHello()).toBe('Hello World!');
		});
	});
});
