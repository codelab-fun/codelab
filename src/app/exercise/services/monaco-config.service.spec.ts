import {inject, TestBed} from '@angular/core/testing';
import {MonacoConfigService} from './monaco-config.service';

describe('Service: MonacoConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonacoConfigService]
    });
    (window as any).monaco = {};
  });

  afterEach(() => {
    delete (window as any).monaco;
  });

  it('should exist', inject([MonacoConfigService], (service: MonacoConfigService) => {
    expect(service).toBeTruthy();
  }));

  describe('sorting files', () => {
    it('should return things as is if there are no deps.', inject([MonacoConfigService], (service: MonacoConfigService) => {
      const dep1 = {moduleName: '1', template: '', path: '1'};
      const dep2 = {moduleName: '2', template: '', path: '2'};
      const files = [dep1, dep2];

      const sorted = service.sortFiles(files);
      expect(sorted).toEqual([dep1, dep2]);
    }));
    it('should do simple sorting', inject([MonacoConfigService], (service: MonacoConfigService) => {
      const dep1 = {moduleName: '1', deps: ['2'], template: '', path: '1'};
      const dep2 = {moduleName: '2', template: '', path: '2'};
      const files = [dep1, dep2];

      const sorted = service.sortFiles(files);
      expect(sorted).toEqual([dep2, dep1]);
    }));
  });
});
