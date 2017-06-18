import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NewExerciseComponent } from '../../new-exercise/new-exercise.component';
import { FileConfig } from '../../interfaces/file-config';
import { handleTestMessage } from '../utils/tests';
import { createSystemJsSandbox } from '../utils/sandbox';
import { runTypeScriptFiles } from '../utils/typescript';
declare const require;


@Component({
  selector: 'slides-angular-test-runner',
  templateUrl: './angular-test-runner.component.html',
  styleUrls: ['./angular-test-runner.component.css']
})
export class AngularTestRunnerComponent implements AfterViewInit {
  handleMessageBound: any;
  tests: any;

  @ViewChild('runner') runnerElement: ElementRef;

  run(files: Array<FileConfig>) {
    createSystemJsSandbox(this.runnerElement.nativeElement, {
      id: 'testing', 'url': 'about:blank'
    }).then(({addCss, setHtml, evalJs, addDep, loadSystemJsDep}) => {
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
      runTypeScriptFiles(testFiles, {addCss, setHtml, evalJs, addDep});
    });
  }

  constructor(public parent: NewExerciseComponent) {
    this.handleMessageBound = (message) => this.tests = handleTestMessage(message, this.tests, this.parent);
    window.addEventListener('message', this.handleMessageBound, false);
  }

  ngAfterViewInit(): void {
    this.parent.files$.subscribe(files => this.run(files));
  }
}
