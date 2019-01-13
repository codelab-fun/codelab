import { Component, Input, OnInit } from '@angular/core';

import { FileConfig } from '../interfaces/file-config';
import { MonacoConfigService } from '../services/monaco-config.service';
import { ActivatedRoute } from '@angular/router';
import { PresentationComponent } from '../../../../presentation/src/lib/presentation/presentation.component';
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

  constructor(
    monacoConfig: MonacoConfigService,
    route: ActivatedRoute,
    presentation: PresentationComponent,
  ) {
    super(monacoConfig, route, presentation);
  }

  private _files: any;

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
