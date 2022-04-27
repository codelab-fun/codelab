import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WebassemblyComponent } from './webassembly.component';

describe('WebassemblyComponent', () => {
  let component: WebassemblyComponent;
  let fixture: ComponentFixture<WebassemblyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WebassemblyComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebassemblyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
