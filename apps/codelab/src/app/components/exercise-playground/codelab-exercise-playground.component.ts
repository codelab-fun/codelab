import { Component, Input } from '@angular/core';
import { CodelabExerciseComponent } from '../exercise/exercise.component';
import { PreviewWindowType } from '@codelab/browser';

@Component({
  selector: 'codelab-exercise-playground',
  templateUrl: 'codelab-exercise-playground.component.html',
  styleUrls: ['codelab-exercise-playground.component.css'],
})
export class CodelabExercisePlaygroundComponent extends CodelabExerciseComponent {
  @Input() allowSwitchingFiles = false;
  @Input() path = '';
  @Input() ui: PreviewWindowType = 'browser';
}
