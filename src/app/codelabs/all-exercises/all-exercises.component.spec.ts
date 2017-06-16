import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllExercisesComponent } from './all-exercises.component';

// TODO: Fix this test suite.
xdescribe('All exercise Component', () => {
  let component: AllExercisesComponent;
  let fixture: ComponentFixture<AllExercisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllExercisesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
