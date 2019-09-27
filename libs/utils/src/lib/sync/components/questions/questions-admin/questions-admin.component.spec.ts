import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsAdminComponent } from './questions-admin.component';

describe('QuestionsAdminComponent', () => {
  let component: QuestionsAdminComponent;
  let fixture: ComponentFixture<QuestionsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionsAdminComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
