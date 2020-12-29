import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisePlaygroundEditorComponent } from './exercise-playground-editor.component';

describe('ExercisePlaygroundEditorComponent', () => {
  let component: ExercisePlaygroundEditorComponent;
  let fixture: ComponentFixture<ExercisePlaygroundEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExercisePlaygroundEditorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisePlaygroundEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
