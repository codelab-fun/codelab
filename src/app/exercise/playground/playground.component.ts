import {Component} from '@angular/core';
import {ExerciseBase} from '../exercise/exercise.base';
import {MonacoConfigService} from '../services/monaco-config.service';
import {SlideComponent} from '../../presentation/slide/slide.component';


@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent extends ExerciseBase {
  constructor(slide: SlideComponent, monacoConfig: MonacoConfigService) {
    super(slide, monacoConfig);
  }
}
