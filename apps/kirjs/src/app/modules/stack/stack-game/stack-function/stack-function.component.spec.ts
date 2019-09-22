import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackFunctionComponent } from './stack-function.component';

describe('StackFunctionComponent', () => {
  let component: StackFunctionComponent;
  let fixture: ComponentFixture<StackFunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StackFunctionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
