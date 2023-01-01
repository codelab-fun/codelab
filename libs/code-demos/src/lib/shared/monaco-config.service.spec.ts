import { inject, TestBed } from '@angular/core/testing';
import { DepsService } from './deps-order.service';
import { MonacoConfigService } from './monaco-config.service';

describe('Service: MonacoConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonacoConfigService, DepsService],
      teardown: { destroyAfterEach: false },
    });
    (window as any).monaco = {};
  });

  afterEach(() => {
    delete (window as any).monaco;
  });

  it('should exist', inject(
    [MonacoConfigService],
    (service: MonacoConfigService) => {
      expect(service).toBeTruthy();
    }
  ));
});
