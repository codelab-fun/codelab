import { Component, Input, OnChanges } from '@angular/core';
import { getTypeScript } from '@codelab/utils/src/lib/loaders/loaders';
import { Observable, Subject } from 'rxjs';
import { compileTsFilesWatch } from '@codelab/code-demos/src/lib/runner/compile-ts-files';
import { filter, map } from 'rxjs/operators';
import { TestRunResult } from '@codelab/utils/src/lib/test-results/common';

const ts = getTypeScript();

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'slides-typescript-checker-runner',
  templateUrl: './typescript-checker-runner.component.html',
  styleUrls: ['./typescript-checker-runner.component.css']
})
export class TypescriptCheckerRunnerComponent implements OnChanges {
  private readonly codeSubject = new Subject();
  readonly result$: Observable<TestRunResult> = this.codeSubject.pipe(
    compileTsFilesWatch({
      module: ts.ModuleKind.None,
      target: ts.ScriptTarget.ES2017,
      experimentalDecorators: true,
      emitDecoratorMetadata: true,
      noImplicitAny: true,
      declaration: true
    }),
    filter(a => Object.values(a.files).length > 0),
    map(a => {
      return {
        tests: a.diagnostics.map(d => ({
          pass: false,
          name: d.messageText.toString()
        }))
      };
    })
  );
  @Input() code;

  ngOnChanges() {
    this.codeSubject.next({ 'main.ts': this.code });
  }
}
