import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsViewerComponent } from './questions-viewer.component';

describe('QuestionsViewerComponent', () => {
  let component: QuestionsViewerComponent;
  let fixture: ComponentFixture<QuestionsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionsViewerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
