import { Component, Input, OnInit } from '@angular/core';

import { FileConfig } from '../interfaces/file-config';
import { MonacoConfigService } from '../services/monaco-config.service';
import { SlideComponent } from '../../../../../../libs/slides/src/slide/slide.component';
import { AnalyticsService } from '../../../../../../libs/slides/src/analytics.service';
import { PresentationComponent } from '../../../../../../libs/slides/src/presentation/presentation.component';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ExerciseBase } from './exercise.base';

@Component({
  selector: 'slides-exercise',
  templateUrl: 'exercise.component.html',
  styleUrls: ['exercise.component.css']
})
export class ExerciseComponent extends ExerciseBase implements OnInit {
  @Input() milestone;
  @Input() config = {files: []} as any;
  @Input() currentFile: FileConfig;

  public readonly files$ = new BehaviorSubject<Array<FileConfig>>([]);
  private _files: any;

  @Input() set files(files) {
    if (!this._files) {
      this.loadModels(files);
    }
    this._files = files;
    this.files$.next(files);
  }

  get files() {
    return this._files;
  }

  updateFiles(callback) {
    this.files = callback(this.files);
  }

  ngOnInit(): void {

  }


  constructor(presentation: PresentationComponent,
              slide: SlideComponent,
              monacoConfig: MonacoConfigService, analyticsService: AnalyticsService, route: ActivatedRoute) {
    super(slide, monacoConfig, analyticsService, route, presentation);
    this.slide.isExercise = true;
  }


  onSelectFile(fileConfig: FileConfig): void {
    this.currentFile = fileConfig;
  }
}
