import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';

describe('jwtStrategy', () => {
	let strategy: JwtStrategy;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [JwtStrategy],
		}).compile();

		strategy = module.get<JwtStrategy>(JwtStrategy);
	});

	describe('validate', () => {
		it('應該返回解析後的使用者資訊', async () => {
			const mockPayload = {
				email: 'test@example.com',
				nanoId: 'test-nano-id',
			};

			const result = await strategy.validate(mockPayload);

			expect(result).toEqual({
				email: mockPayload.email,
				nanoId: mockPayload.nanoId,
			});
		});
	});
});
