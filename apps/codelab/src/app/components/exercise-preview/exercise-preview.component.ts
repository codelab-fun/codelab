import { Component, Input } from '@angular/core';
import {
  CodelabExerciseComponent,
  extractSolutions
} from '../exercise/exercise.component';
import { convertExerciseToMap } from '../../../../../../ng2ts/ng2ts';

@Component({
  selector: 'codelab-exercise-preview',
  templateUrl: 'exercise-preview.component.html'
  // styleUrls: ['../exercise/code-demo-code-demo.component.css'],
})
export class CodelabExercisePreviewComponent extends CodelabExerciseComponent {
  @Input() set exercise(exercise) {
    const map = convertExerciseToMap(exercise);
    this.filesConfig = exercise;
    this.bootstrap = map.bootstrap;
    this.code = extractSolutions(exercise.files);
    this.update(this.code);
  }
}
