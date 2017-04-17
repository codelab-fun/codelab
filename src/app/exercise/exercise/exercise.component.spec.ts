/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {ExerciseComponent} from "./exercise.component";
import {StateService} from '../state.service';

describe('ExerciseComponent', () => {
  let component: ExerciseComponent;
  let fixture: ComponentFixture<ExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseComponent],
      providers: [{provide: StateService, useValue: {}}]
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
