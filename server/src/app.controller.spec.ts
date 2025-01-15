import { describe, it, expect, beforeEach } from 'vitest';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(() => {
    // Create an instance of the real or mocked AppService
    appService = new AppService();
    // Or mock the getHello method
    // vi.spyOn(appService, 'getHello').mockReturnValue('Hello World!');

    // Pass the service to the controller
    appController = new AppController(appService);
  });

  it('should return "Hello World!"', () => {
    const result = appController.getHello();
    expect(result).toBe('Hello World!');
  });
});
