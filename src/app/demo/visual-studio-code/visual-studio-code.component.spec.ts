import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VisualStudioCodeComponent} from './visual-studio-code.component';
import {CommonModule} from '@angular/common';
import {FeedbackModule} from '../../feedback/feedback.module';
import {PresentationModule} from '../../presentation/presentation.module';

xdescribe('VisualStudioCodeComponent', () => {
  let component: VisualStudioCodeComponent;
  let fixture: ComponentFixture<VisualStudioCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PresentationModule, FeedbackModule, CommonModule],
      declarations: [VisualStudioCodeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualStudioCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
