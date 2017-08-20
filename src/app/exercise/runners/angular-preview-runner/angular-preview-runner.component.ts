import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ExerciseComponent } from '../../exercise/exercise.component';
import { FileConfig } from '../../interfaces/file-config';
import { createSystemJsSandbox } from '../utils/sandbox';
import { runTypeScriptFiles } from '../utils/typescript';
declare const require;


@Component({
  selector: 'slides-angular-preview-runner',
  templateUrl: './angular-preview-runner.component.html',
  styleUrls: ['./angular-preview-runner.component.css']
})
export class AngularPreviewRunnerComponent implements AfterViewInit {
  @ViewChild('runner') runnerElement: ElementRef;

  run(files: Array<FileConfig>) {
    createSystemJsSandbox(this.runnerElement.nativeElement, {
      id: 'testing', 'url': '/assets/runner/'
    }).then(({addCss, setHtml, evalJs, addDep, loadSystemJsDep, iframe}) => {
      // TODO: addCss(require('./inner.css'));
      setHtml('<my-app></my-app>');
      evalJs(require('!!raw-loader!../../../../assets/runner/node_modules/core-js/client/shim.min.js'));
      evalJs(require('!!raw-loader!../../../../assets/runner/node_modules/zone.js/dist/zone.js'));
      evalJs(require('!!raw-loader!../../../../assets/runner/js/system-config'));
      loadSystemJsDep('ng-bundle', require('!!raw-loader!../../../../assets/runner/ng2/ng-bundle'));
      addCss(require('!!raw-loader!@angular/material/prebuilt-themes/indigo-pink.css'));
      addDep('reflect-metadata', Reflect);
      const bootstrapFiles = files.filter(file => !file.test);

      runTypeScriptFiles(bootstrapFiles, {addCss, setHtml, evalJs, addDep, iframe});
    });
  }

  constructor(public parent: ExerciseComponent) {
  }

  ngAfterViewInit(): void {
    this.parent.files$.subscribe(files => this.run(files));
  }
}
