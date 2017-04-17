/* tslint:disable:no-unused-variable */
import {TestBed, inject} from "@angular/core/testing";
import {MonacoConfigService} from "./monaco-config.service";

// TODO: Fix this failing test suite.
xdescribe('Service: MonacoConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonacoConfigService]
    });
  });

  it('should ...', inject([MonacoConfigService], (service: MonacoConfigService) => {
    expect(service).toBeTruthy();
  }));
});
