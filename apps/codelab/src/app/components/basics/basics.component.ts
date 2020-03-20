import { Component, OnInit } from '@angular/core';
import {
  ExerciseConfigTemplate,
  Ng2TsExercises
} from '../../../../../../ng2ts/ng2ts';

@Component({
  selector: 'codelab-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.scss']
})
export class BasicsComponent implements OnInit {
  exercise: ExerciseConfigTemplate;
  constructor(private exercises: Ng2TsExercises) {
    this.exercise = this.exercises.getExercises(6, 0);
  }

  ngOnInit(): void {}
}
