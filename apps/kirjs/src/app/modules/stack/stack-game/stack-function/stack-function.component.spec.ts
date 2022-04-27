import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StackFunctionComponent } from './stack-function.component';

describe('StackFunctionComponent', () => {
  let component: StackFunctionComponent;
  let fixture: ComponentFixture<StackFunctionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StackFunctionComponent],
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
