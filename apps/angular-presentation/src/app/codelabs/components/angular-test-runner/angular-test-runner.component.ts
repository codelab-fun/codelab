import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { handleTestMessage } from '../../../../../../../libs/exercise/src/lib/runners/utils/tests';
import { createSystemJsSandbox } from '../../../../../../../libs/exercise/src/lib/runners/utils/sandbox';
import { ScriptLoaderService } from '../../../../../../../libs/exercise/src/lib/services/script-loader.service';
import * as ts from 'typescript';
import babel_traverse from 'babel-traverse';
import * as babylon from 'babylon';
import * as babel_types from 'babel-types';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subscription } from 'rxjs/internal/Subscription';

declare const require;

export function addMetaInformation(sandbox, files: { [key: string]: string }) {
  sandbox.evalJs(`System.registry.delete(System.normalizeSync('./code'));`);
  (sandbox.iframe.contentWindow as any).System.register('code', [], function (exports) {
    return {
      setters: [],
      execute: function () {
        exports('ts', ts);
        exports('babylon', babylon);
        exports('babel_traverse', babel_traverse);
        exports('babel_types', babel_types);
        Object.entries(files)
          .filter(([moduleName]) => moduleName.match(/\.ts$/))
          .forEach(([path, code]) => {
            exports(path.replace(/[\/\.-]/gi, '_'), code);
            exports(path.replace(/[\/\.-]/gi, '_') + '_AST', ts.createSourceFile(path, code, ts.ScriptTarget.ES5));
          });
        Object.entries(files)
          .filter(([moduleName]) => moduleName.match(/\.html/))
          .forEach(([path, code]) => {
            const templatePath = path.replace(/[\/\.-]/gi, '_');
            exports(templatePath, code);
          });
      }
    };
  });

}

@Component({
  selector: 'slides-simple-angular-test-runner',
  templateUrl: './angular-test-runner.component.html',
  styleUrls: ['./angular-test-runner.component.css']
})
export class SimpleAngularTestRunnerComponent implements OnChanges {
  handleMessageBound: any;
  @Input() translations: { [key: string]: string; } = {};
  @Output() solved = new EventEmitter();
  @Input() code: any;
  changedFilesSubject = new BehaviorSubject<Record<string, string>>({});
  @Input() bootstrap: string;

  @ViewChild('runner') runnerElement: ElementRef;
  private tests: any;
  private subscription: Subscription;

  constructor(private  scriptLoaderService: ScriptLoaderService) {
    this.handleMessageBound = (message) => {
      this.tests = handleTestMessage(message, this.tests);

      if (message.data.type === 'testEnd') {
        if (this.tests.length && this.tests.every(test => test.pass)) {
          this.solved.emit();
        }
      }
    };
    window.addEventListener('message', this.handleMessageBound, false);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.code) {
      this.changedFilesSubject.next(changes.code.currentValue);
    }
  }

  async ngOnInit() {
    const sandbox = await createSystemJsSandbox(this.runnerElement.nativeElement, {
      id: 'testing', 'url': 'about:blank'
    });

    sandbox.evalJs(this.scriptLoaderService.getScript('chai'));
    sandbox.evalJs(this.scriptLoaderService.getScript('mocha'));
    sandbox.evalJs(this.scriptLoaderService.getScript('test-bootstrap'));
    sandbox.evalJs(this.scriptLoaderService.getScript('shim'));
    sandbox.evalJs(this.scriptLoaderService.getScript('zone'));
    sandbox.evalJs(this.scriptLoaderService.getScript('system-config'));
    sandbox.evalJs(this.scriptLoaderService.getScript('ng-bundle'));
    sandbox.addDep('reflect-metadata', Reflect);

    this.subscription = this.changedFilesSubject.subscribe(files => {
      Object.entries(files).filter(([path]) => path.match(/\.js$/)).forEach(([path, code]) => {
        sandbox.evalJs(`System.registry.delete(System.normalizeSync('./${path.replace('.js', '')}'));`);
        addMetaInformation(sandbox, this.code);
        sandbox.evalJs(code);
      });

      sandbox.evalJs(`System.import('${this.bootstrap}')`);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  onSelectFile(file: any) {
    debugger;
  }

}
