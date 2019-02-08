import { inject, TestBed } from '@angular/core/testing';
import { MonacoConfigService } from './monaco-config.service';
import { DepsService } from './deps-order.service';

describe('Service: MonacoConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonacoConfigService, DepsService]
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
