import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ExerciseComponent } from '../../exercise/exercise.component';
import { FileConfig } from '../../interfaces/file-config';
import { handleTestMessage } from '../utils/tests';
import { createSystemJsSandbox } from '../utils/sandbox';
import { runTypeScriptFiles } from '../utils/typescript';
import { TestInfo } from '../../interfaces/test-info';
declare const require;


@Component({
  selector: 'slides-angular-test-runner',
  templateUrl: './angular-test-runner.component.html',
  styleUrls: ['./angular-test-runner.component.css']
})
export class AngularTestRunnerComponent implements AfterViewInit {
  handleMessageBound: any;
  tests: Array<TestInfo> = [];

  @ViewChild('runner') runnerElement: ElementRef;

  run(files: Array<FileConfig>) {
    createSystemJsSandbox(this.runnerElement.nativeElement, {
      id: 'testing', 'url': 'about:blank'
    }).then(({addCss, setHtml, evalJs, addDep, loadSystemJsDep, iframe}) => {
      // TODO: addCss(require('./inner.css'));
      setHtml('<my-app></my-app>');
      evalJs(require('!!raw-loader!../../../../assets/runner/node_modules/core-js/client/shim.min.js'));
      evalJs(require('!!raw-loader!../../../../assets/runner/node_modules/zone.js/dist/zone.js'));
      evalJs(require('!!raw-loader!../../../../assets/runner/js/chai.min'));
      evalJs(require('!!raw-loader!../../../../assets/runner/js/system-config'));
      evalJs(require('!!raw-loader!../../../../assets/runner/js/mocha'));
      evalJs(require('!!raw-loader!../../../../assets/runner/js/test-bootstrap'));
      loadSystemJsDep('ng-bundle', require('!!raw-loader!../../../../assets/runner/ng2/ng-bundle'));
      addDep('reflect-metadata', Reflect);
      const testFiles = files.filter(file => !file.excludeFromTesting);
      runTypeScriptFiles(testFiles, {addCss, setHtml, evalJs, addDep, iframe});
    });
  }

  constructor(public parent: ExerciseComponent) {
    this.handleMessageBound = (message) => {
      this.tests = handleTestMessage(message, this.tests);

      if (message.data.type === 'testEnd') {
        if (this.tests.length && this.tests.every(test => test.pass)) {
          this.parent.solved = true;
        }

        this.parent.running = false;
      }
    };
    window.addEventListener('message', this.handleMessageBound, false);
  }


  onSelectFile(file: FileConfig) {
    this.parent.currentFile = file;
  }

  ngAfterViewInit(): void {
    this.parent.files$.subscribe(files => this.run(files));
  }
}
