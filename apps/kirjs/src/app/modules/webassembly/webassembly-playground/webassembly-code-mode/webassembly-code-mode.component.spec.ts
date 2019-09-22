import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebassemblyCodeModeComponent } from './webassembly-code-mode.component';

describe('WebassemblyCodeModeComponent', () => {
  let component: WebassemblyCodeModeComponent;
  let fixture: ComponentFixture<WebassemblyCodeModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebassemblyCodeModeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebassemblyCodeModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
