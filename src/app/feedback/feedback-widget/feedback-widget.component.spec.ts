import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackWidgetComponent } from './feedback-widget.component';

describe('FeedbackWidgetComponent', () => {
  let component: FeedbackWidgetComponent;
  let fixture: ComponentFixture<FeedbackWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
