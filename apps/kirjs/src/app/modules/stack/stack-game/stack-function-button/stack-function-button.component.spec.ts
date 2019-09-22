import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackFunctionButtonComponent } from './stack-function-button.component';

describe('StackFunctionButtonComponent', () => {
  let component: StackFunctionButtonComponent;
  let fixture: ComponentFixture<StackFunctionButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StackFunctionButtonComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackFunctionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
