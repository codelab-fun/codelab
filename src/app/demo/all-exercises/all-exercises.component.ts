import { Component } from '@angular/core';
import { Ng2TsExercises, ng2tsConfig } from '../../../../ng2ts/ng2ts';


@Component({
  selector: 'slides-all-exercises',
  templateUrl: './all-exercises.component.html',
  styleUrls: ['./all-exercises.component.css']
})
export class AllExercisesComponent {
  exercise;

  milestones = ng2tsConfig.milestones.map((milestone) => {
    let exercises = milestone.exercises.map((exercise, index) => { return {...exercise, index}}).filter((exercise) => { if(exercise["files"]) return true })
    return {
      name: milestone.name,
      exercises
    };
  })

  constructor(private exercises: Ng2TsExercises) {
    this.exercise = exercises.getExercises(1, 1);
  }

  selectExercise(milestone: number, exercise: number): void {
      this.exercise = this.exercises.getExercises(milestone, exercise);
  }
}
