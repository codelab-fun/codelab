import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodelabExercisePreviewEditorComponent } from './codelab-exercise-editor.component';

describe('CodelabExercisePreviewEditorComponent', () => {
  let component: CodelabExercisePreviewEditorComponent;
  let fixture: ComponentFixture<CodelabExercisePreviewEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CodelabExercisePreviewEditorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodelabExercisePreviewEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
