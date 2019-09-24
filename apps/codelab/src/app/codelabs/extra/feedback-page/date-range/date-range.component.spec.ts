import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangeComponent } from './date-range.component';
import { FeedbackPageModule } from '../feedback-page.module';
import { ActivatedRoute } from '@angular/router';

describe('DateRangeComponent', () => {
  let component: DateRangeComponent;
  let fixture: ComponentFixture<DateRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeedbackPageModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
