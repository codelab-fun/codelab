import { Component, Input } from '@angular/core';

import * as babylon from 'babylon';
import * as types from 'babel-types';
import babelTraverse from '@babel/traverse';
import babelGenerator from '@babel/generator';
import { TestInfo } from '../../../../../../../codelab/src/app/shared/interfaces/test-info';

declare const require;

@Component({
  selector: 'kirjs-babel-test-runner',
  templateUrl: './babel-test-runner.component.html',
  styleUrls: ['./babel-test-runner.component.css']
})
export class BabelTestRunnerComponent {
  tests: Array<TestInfo> = [];
  logs = [];
  @Input() files: any[];
  @Input() showAst = false;
  scale = 10;
  showFull = false;
  firstFailing: TestInfo;
  displayedTest: TestInfo;

  run(files: Array<any>) {
    this.logs = [];
    const args = {
      babylon,
      babelTraverse,
      babelGenerator,
      types,
      log: value => {
        this.logs.push(value);
      }
    };
    const callback = result => {
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

  runTests() {
    this.run(this.files);
  }

  ngOnInit() {
    this.runTests();
  }
}
