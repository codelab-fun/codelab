import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FileConfig } from '../interfaces/file-config';
import { SlideComponent } from '../../presentation/slide/slide.component';
import { RunnerComponent } from '../runner/runner.component';

@Component({
  selector: 'slides-exercise-preview',
  templateUrl: './exercise-preview.component.html',
  styleUrls: ['./exercise-preview.component.css']
})
export class ExercisePreviewComponent implements OnInit {
  @Input() config;
  public files: Array<FileConfig>;

  @ViewChild(RunnerComponent) runner;

  constructor(private slide: SlideComponent) {

  }

  getFiles() {
    return this.config.files.map(file => (
      {...file, code: file.solution || file.code}
    ));
  }

  ngOnInit() {
    this.files = this.getFiles();
  }
}
