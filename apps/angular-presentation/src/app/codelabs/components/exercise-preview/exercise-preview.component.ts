import { Component, Input } from '@angular/core';
import { convertExerciseToMap } from '../../../../../../../ng2ts/ng2ts';


@Component({
  selector: 'slides-codelab-exercise-preview',
  templateUrl: 'exercise-preview.component.html',
  // styleUrls: ['../exercise/exercise.component.css'],
})
export class CodelabExercisePreviewComponent {
  filesMap: any;
  @Input() url = '';
  @Input() fakeUrl = '';
  private bootstrap: string;

  @Input() set exercise(exercise: any) {
    const map = convertExerciseToMap(exercise);
    this.filesMap = map.codeSolutions;
    this.bootstrap = map.bootstrap;
  }
}
