import { Component, Input, OnInit, Optional } from '@angular/core';

import { FileConfig } from '../interfaces/file-config';
import { MonacoConfigService } from '../services/monaco-config.service';
import { AnalyticsService } from '../../../../../../libs/presentation/src/lib/analytics.service';
import { PresentationComponent } from '../../../../../../libs/presentation/src/lib/presentation/presentation.component';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
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

  constructor(@Optional() presentation: PresentationComponent,
              monacoConfig: MonacoConfigService, analyticsService: AnalyticsService, route: ActivatedRoute) {
    super(monacoConfig, analyticsService, route, presentation);

  }

  get files() {
    return this._files;
  }

  @Input() set files(files) {
    if (!this._files) {
      this.loadModels(files);
    }
    this._files = files;
    this.files$.next(files);
  }

  updateFiles(callback) {
    this.files = callback(this.files);
  }

  ngOnInit(): void {

  }

  onSelectFile(fileConfig: FileConfig): void {
    this.currentFile = fileConfig;
  }
}
