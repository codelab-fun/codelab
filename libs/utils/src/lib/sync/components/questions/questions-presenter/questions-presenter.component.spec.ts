import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuestionsPresenterComponent } from './questions-presenter.component';

describe('QuestionsPresenterComponent', () => {
  let component: QuestionsPresenterComponent;
  let fixture: ComponentFixture<QuestionsPresenterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionsPresenterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
