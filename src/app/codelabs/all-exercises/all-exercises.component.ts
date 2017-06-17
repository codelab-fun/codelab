import { ExerciseBase } from './../../exercise/exercise/exercise.base';
import { Component } from '@angular/core';
import { Ng2TsExercises, ng2tsConfig } from '../../../../ng2ts/ng2ts';

@Component({
  selector: 'slides-all-exercises',
  templateUrl: './all-exercises.component.html',
  styleUrls: ['./all-exercises.component.css']
})
export class AllExercisesComponent {
  public allFiles = [];

  constructor(private exercises: Ng2TsExercises) {
    const milestones = ng2tsConfig.milestones.map(this.selectMilestoneWithFilesOnly);
    this.allFiles = this.GroupFilesByFilename(milestones);
  }
  /**
   * Select Milestones that contain exercise files
   */
  private selectMilestoneWithFilesOnly(milestone) {
    return {
      name: milestone.name,
      exercises: milestone.exercises
        .filter((exercise) => {
          if (exercise['files']) { return true; }
        })
    };
  }

  /**
   * Transform files group by milestone to filename
   */
  private GroupFilesByFilename(mileStones) {
    const allFiles = {};
    mileStones.forEach((milestone) => {
      milestone.exercises.forEach((exerciseFiles) => {
        exerciseFiles.files.forEach((file) => {
          if (this.allFiles[file.path]) {
            allFiles[file.path].files.push(file);
            allFiles[file.path].milestones.push(milestone.name);
          } else {
            allFiles[file.path] = {
              files: [file],
              milestones: [milestone.name],
              name: file.path
            };
          }
        });
      });
    });
    return Object.keys(allFiles).map((file) => allFiles[file]);
  }
}
