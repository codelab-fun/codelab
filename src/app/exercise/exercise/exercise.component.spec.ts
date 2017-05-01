import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciseComponent } from './exercise.component';

// TODO: Fix this test suite.
xdescribe('ExerciseComponent', () => {
  let component: ExerciseComponent;
  let fixture: ComponentFixture<ExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseComponent],
    })
      .overrideComponent(ExerciseComponent, {set: {template: 'hi'}})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
