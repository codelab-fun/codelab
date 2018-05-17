import { AfterViewInit, Component } from '@angular/core';
import { ExerciseComponent } from '../exercise/exercise.component';
import { FileConfig } from '../interfaces/file-config';
import { TestInfo } from '../interfaces/test-info';
import * as babylon from 'babylon';
import * as types from 'babel-types';
import babelTraverse from 'babel-traverse';
import babelGenerator from 'babel-generator';

declare const require;

@Component({
  selector: 'slides-fake-babel-runner',
  templateUrl: './fake-babel-runner.component.html',
  styleUrls: ['./fake-babel-runner.component.css']
})
export class FakeBabelRunnerComponent implements AfterViewInit {
  tests: Array<TestInfo> = [];
  logs = [];
  private firstFailing: TestInfo;

  constructor(public parent: ExerciseComponent) {
  }

  run(files: Array<FileConfig>) {
    this.logs = [];
    const args = {
      babylon,
      babelTraverse,
      babelGenerator,
      types,
      log: (value) => {
        this.logs.push(value);
      },
    };
    const callback = (result) => {
      if (result) {
        this.tests = result;
        this.firstFailing = this.tests.find(test => !test.pass);
      }
    };
    
    try {
      // tslint:disable
      const func = eval('(' + files[0].code + ')');
      eval('(' + files[1].code + ')')(func, callback, args);
    } catch (e) {
      console.log(e);
    }
  }

  firstFailingIndex() {
    const firstFailing = this.tests.findIndex(i => !i.pass);
    return firstFailing === -1 ? this.tests.length : firstFailing;
  }

  onSelectFile(file: FileConfig) {
    this.parent.currentFile = file;
  }

  ngAfterViewInit(): void {
    this.parent.files$.subscribe(files => requestAnimationFrame(() => this.run(files)));
  }
}
