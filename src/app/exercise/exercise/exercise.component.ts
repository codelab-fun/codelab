import {Component} from '@angular/core';
import {ExerciseBase} from './exercise.base';
import {MonacoConfigService} from '../services/monaco-config.service';
import {SlideComponent} from '../../presentation/slide/slide.component';


@Component({
  selector: 'app-exercise',
  templateUrl: 'exercise.component.html',
  styleUrls: ['exercise.component.css']
})
export class ExerciseComponent extends ExerciseBase {
  constructor(slide: SlideComponent, monacoConfig: MonacoConfigService) {
    super(slide, monacoConfig);
  }
}
