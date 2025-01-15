import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { vi } from 'vitest'; // For Vitest
import { describe, it, beforeEach, expect } from 'vitest';


describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(() => {
    appService = {
      getHello: vi.fn().mockReturnValue('Hello World!')
    } as any; // Mocking AppService methods
    appController = new AppController(appService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('should return "Hello World!"', () => {
    expect(appController.getHello()).toBe('Hello World!');
  });

});
