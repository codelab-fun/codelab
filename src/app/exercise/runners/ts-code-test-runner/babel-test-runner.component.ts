import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ExerciseComponent } from '../../exercise/exercise.component';
import { FileConfig } from '../../interfaces/file-config';
import { TestInfo } from '../../interfaces/test-info';
declare const require;


@Component({
  selector: 'slides-babel-test-runner',
  templateUrl: './babel-test-runner.component.html',
  styleUrls: ['./babel-test-runner.component.css']
})
export class BabelTestRunnerComponent implements AfterViewInit {
  tests: Array<TestInfo> = [];

  @ViewChild('runner') runnerElement: ElementRef;

  run(files: Array<FileConfig>) {
    try {
      this.tests = files.filter(file => file.bootstrap && !file.excludeFromTesting)[0].execute(files);
    } catch (e) {
      this.tests.find(t => !t.pass).result = '[Parsing error]' + e;
    }
  }

  constructor(public parent: ExerciseComponent) {
  }


  onSelectFile(file: FileConfig) {
    this.parent.currentFile = file;
  }

  ngAfterViewInit(): void {
    this.parent.files$.subscribe(files => requestAnimationFrame(() => this.run(files)));
  }
}
