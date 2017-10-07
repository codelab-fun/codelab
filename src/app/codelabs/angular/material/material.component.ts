import { CodelabFile } from '../../../exercise/helpers/codelabFile';
import { Component } from '@angular/core';
import { ng2tsConfig } from '../../../../../ng2ts/ng2ts';

declare const require;


@Component({
  selector: 'slides-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent {
  code = {};

  exercises = [
    ng2tsConfig.milestones[6].exercises[0]
  ];

//   constructor(private exercises: Ng2TsExercises) {
//     // this.exercise = exercises.getExercises(4, 1);
//     // this.exercise2 = exercises.getExercises(4, 2);
//   }
}
