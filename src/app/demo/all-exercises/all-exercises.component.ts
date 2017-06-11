import { ExerciseBase } from './../../exercise/exercise/exercise.base';
import { Component } from '@angular/core';
import { Ng2TsExercises, ng2tsConfig } from '../../../../ng2ts/ng2ts';

@Component({
  selector: 'slides-all-exercises',
  templateUrl: './all-exercises.component.html',
  styleUrls: ['./all-exercises.component.css']
})
export class AllExercisesComponent {
  private exercise;
  private milestones;
  private allFiles = {};

  constructor(private exercises: Ng2TsExercises) {
    this.exercise = exercises.getExercises(1, 1);
    this.milestones = ng2tsConfig.milestones.map((milestone) => {
      return {
        name: milestone.name,
        exercises: milestone.exercises
          .map((exercise, index) => { return { ...exercise, index }; })
          .filter((exercise) => {
            if (exercise['files']) { return true; }
          })
      };
    });

    this.milestones.forEach((milestone) => {
      milestone.exercises.forEach((exerciseFiles) => {
        exerciseFiles.files.forEach((file) => {
          if (this.allFiles[file.path]) {
            this.allFiles[file.path].files.push(file);
            this.allFiles[file.path].milestones.push(milestone.name);
          } else {
            this.allFiles[file.path] = {
              files: [file],
              milestones: [milestone.name],
              name: file.path
            };
          }
        });
      });
    });

    this.allFiles = Object.keys(this.allFiles).map((file) => this.allFiles[file]);
  }

  selectExercise(milestone: number, exercise: number): void {
    this.exercise = this.exercises.getExercises(milestone, exercise);
  }
}
