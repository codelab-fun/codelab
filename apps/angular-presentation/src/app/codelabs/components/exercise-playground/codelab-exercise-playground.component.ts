import { Component, Input } from '@angular/core';
import { CodelabExerciseComponent } from '../exercise/exercise.component';
import { PreviewWindowType } from '../../../../../../../libs/browser/src/lib/preview-window/preview-window.component';


@Component({
  selector: 'codelab-exercise-playground',
  templateUrl: 'codelab-exercise-playground.component.html',
  // styleUrls: ['../exercise/exercise.component.css'],
})
export class CodelabExercisePlayground extends CodelabExerciseComponent {
  @Input() path = '';
  @Input() ui: PreviewWindowType = 'browser';
}
