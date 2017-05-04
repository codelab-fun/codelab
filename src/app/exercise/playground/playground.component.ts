import {Component, Input} from '@angular/core';
import {ExerciseBase} from '../exercise/exercise.base';
import {MonacoConfigService} from '../services/monaco-config.service';
import {SlideComponent} from '../../presentation/slide/slide.component';


@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent extends ExerciseBase {
  // tslint:disable-next-line:all TODO: Fix linter warnings on the next line and delete this comment.
  @Input('focus-highlight-match') highlightMatches = [];

  constructor(slide: SlideComponent, monacoConfig: MonacoConfigService) {
    super(slide, monacoConfig);
  }

  onCodeChange(code) {
    this.onCodeChanges({file: this.config.files[0], code});
  }
}
