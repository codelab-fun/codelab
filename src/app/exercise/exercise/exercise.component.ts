import {Component, Input} from '@angular/core';
import {ExerciseBase} from './exercise.base';
import {FileConfig} from '../interfaces/file-config';
import {MonacoConfigService} from '../services/monaco-config.service';
import {SlideComponent} from '../../presentation/slide/slide.component';

@Component({
  selector: 'slides-exercise',
  templateUrl: 'exercise.component.html',
  styleUrls: ['exercise.component.css']
})
export class ExerciseComponent extends ExerciseBase {
  @Input() milestone;
  @Input() config;
  currentFile: FileConfig;

  constructor(slide: SlideComponent,
              monacoConfig: MonacoConfigService) {
    super(slide, monacoConfig);
  }

  onSelectFile(fileConfig: FileConfig): void {
    this.currentFile = fileConfig;
  }
}
