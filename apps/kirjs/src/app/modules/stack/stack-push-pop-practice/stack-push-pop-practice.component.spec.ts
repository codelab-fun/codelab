import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackPushPopPracticeComponent } from './stack-push-pop-practice.component';

describe('StackPushPopPracticeComponent', () => {
  let component: StackPushPopPracticeComponent;
  let fixture: ComponentFixture<StackPushPopPracticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackPushPopPracticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackPushPopPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
