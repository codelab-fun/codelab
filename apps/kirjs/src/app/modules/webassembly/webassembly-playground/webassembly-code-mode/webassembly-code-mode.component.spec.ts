import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WebassemblyCodeModeComponent } from './webassembly-code-mode.component';

describe('WebassemblyCodeModeComponent', () => {
  let component: WebassemblyCodeModeComponent;
  let fixture: ComponentFixture<WebassemblyCodeModeComponent>;

  beforeEach(waitForAsync(() => {
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
