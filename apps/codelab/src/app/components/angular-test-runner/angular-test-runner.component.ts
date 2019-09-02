import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { handleTestMessage } from './tests';
import { createSystemJsSandbox } from '@codelab/code-demos/src/lib/shared/sandbox';
import { ScriptLoaderService } from '@codelab/code-demos/src/lib/shared/script-loader.service';
import * as ts from 'typescript';

import babel_traverse from 'babel-traverse';
import * as babylon from 'babylon';
import * as babel_types from 'babel-types';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subscription } from 'rxjs/internal/Subscription';

declare const require;

// TODO(kirjs): This is a duplicate
export function addMetaInformation(sandbox, files: { [key: string]: string }) {
  sandbox.evalJs(`System.registry.delete(System.normalizeSync('./code'));`);
  (sandbox.iframe.contentWindow as any).System.register('code', [], function(
    exports
  ) {
    return {
      setters: [],
      execute: function() {
        exports('ts', ts);
        exports('babylon', babylon);
        exports('babel_traverse', babel_traverse);
        exports('babel_types', babel_types);
        Object.entries(files)
          .filter(([moduleName]) => moduleName.match(/\.ts$/))
          .forEach(([path, code]) => {
            exports(path.replace(/[\/.-]/gi, '_'), code);
            exports(
              path.replace(/[\/.-]/gi, '_') + '_AST',
              ts.createSourceFile(path, code, ts.ScriptTarget.ES5)
            );
          });
        Object.entries(files)
          .filter(([moduleName]) => moduleName.match(/\.html/))
          .forEach(([path, code]) => {
            const templatePath = path.replace(/[\/.-]/gi, '_');
            exports(templatePath, code);
          });
      }
    };
  });
}

@Component({
  selector: 'codelab-simple-angular-test-runner',
  templateUrl: './angular-test-runner.component.html',
  styleUrls: ['./angular-test-runner.component.css']
})
export class SimpleAngularTestRunnerComponent
  implements OnChanges, AfterViewInit, OnDestroy {
  handleMessageBound: any;
  @Output() solved = new EventEmitter();
  @Output() public selectFile: EventEmitter<string> = new EventEmitter<
    string
  >();
  @Input() translations: { [key: string]: string } = {};
  @Input() code: any;
  @Input() bootstrap: string;

  @ViewChild('runner', { static: false }) runnerElement: ElementRef;

  changedFilesSubject = new BehaviorSubject<Record<string, string>>({});
  tests: any;
  private subscription: Subscription;

  constructor(
    private scriptLoaderService: ScriptLoaderService,
    private cd: ChangeDetectorRef
  ) {
    this.handleMessageBound = message => {
      this.tests = handleTestMessage(message, this.tests);

      if (message.data.type === 'testEnd') {
        if (this.tests.length && this.tests.every(test => test.pass)) {
          this.solved.emit();
        }
      }

      this.cd.markForCheck();
    };
    window.addEventListener('message', this.handleMessageBound, false);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.code) {
      this.changedFilesSubject.next(changes.code.currentValue);
    }
  }

  async ngAfterViewInit() {
    const sandbox = await createSystemJsSandbox(
      this.runnerElement.nativeElement,
      {
        id: 'testing',
        url: '/assets/runner'
      }
    );

    sandbox.setHtml(
      this.code['index.html'] ||
        '<app-root></app-root><my-app></my-app><div class="error"></div>'
    );

    sandbox.evalJs(this.scriptLoaderService.getScript('chai'));
    sandbox.evalJs(this.scriptLoaderService.getScript('mocha'));
    sandbox.evalJs(this.scriptLoaderService.getScript('test-bootstrap'));
    sandbox.evalJs(this.scriptLoaderService.getScript('shim'));
    sandbox.evalJs(this.scriptLoaderService.getScript('zone'));
    sandbox.evalJs(this.scriptLoaderService.getScript('system-config'));
    sandbox.evalJs(this.scriptLoaderService.getScript('ng-bundle'));

    this.subscription = this.changedFilesSubject.subscribe(files => {
      const hasErrors = Object.entries(files)
        .filter(([path]) => path.match(/\.js$/))
        .map(([path, code]) => {
          try {
            sandbox.evalJs(
              `System.registry.delete(System.normalizeSync('./${path.replace(
                '.js',
                ''
              )}'));`
            );
            addMetaInformation(sandbox, this.code);
            sandbox.evalJs(code);
          } catch (e) {
            console.groupCollapsed(e.message);
            console.log(e);
            console.groupEnd();
            return true;
          }
          return false;
        })
        .some(a => a);

      if (!hasErrors) {
        sandbox.evalJs(`System.import('${this.bootstrap}')`);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
