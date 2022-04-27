import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WasmTestRunnerComponent } from './wasm-test-runner.component';

describe('WasmTestRunnerComponent', () => {
  let component: WasmTestRunnerComponent;
  let fixture: ComponentFixture<WasmTestRunnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WasmTestRunnerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WasmTestRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
