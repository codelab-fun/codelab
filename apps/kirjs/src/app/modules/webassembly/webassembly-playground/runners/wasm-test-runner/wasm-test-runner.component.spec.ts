import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WasmTestRunnerComponent } from './wasm-test-runner.component';

describe('WasmTestRunnerComponent', () => {
  let component: WasmTestRunnerComponent;
  let fixture: ComponentFixture<WasmTestRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WasmTestRunnerComponent]
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
