import { Test } from '@nestjs/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
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
