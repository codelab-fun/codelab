import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WasmContentsComponent } from './wasm-contents.component';

describe('WasmContentsComponent', () => {
  let component: WasmContentsComponent;
  let fixture: ComponentFixture<WasmContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WasmContentsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WasmContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
