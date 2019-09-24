import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsPresenterComponent } from './questions-presenter.component';

describe('QuestionsPresenterComponent', () => {
  let component: QuestionsPresenterComponent;
  let fixture: ComponentFixture<QuestionsPresenterComponent>;

  beforeEach(async(() => {
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
