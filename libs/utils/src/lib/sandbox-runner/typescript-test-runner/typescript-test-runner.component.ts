import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {
  compileTsFilesWatch,
  Files
} from '@codelab/code-demos/src/lib/runner/compile-ts-files';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'slides-typescript-test-runner',
  templateUrl: './typescript-test-runner.component.html',
  styleUrls: ['./typescript-test-runner.component.css']
})
export class TypescriptTestRunnerComponent implements OnChanges, OnDestroy {
  @Input() code;
  @Input() tests;

  @Output() result = new EventEmitter();
  private readonly codeSubject = new Subject<Files>();

  readonly code$ = this.codeSubject.pipe(
    compileTsFilesWatch(),
    filter(a => Object.values(a.files).length > 0),
    map(a => {
      return {
        code: a.files['main.js'],
        tests: a.files['test.js']
      };
    })
  );

  ngOnChanges() {
    this.codeSubject.next({
      'main.ts': this.code,
      'test.ts': this.tests
    });
  }

  ngOnDestroy(): void {
    this.codeSubject.complete();
  }
}
