import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WasmBinaryComponent } from './wasm-binary.component';

describe('WasmBinaryComponent', () => {
  let component: WasmBinaryComponent;
  let fixture: ComponentFixture<WasmBinaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WasmBinaryComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WasmBinaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
