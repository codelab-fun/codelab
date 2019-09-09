import { Component, Input } from '@angular/core';
import { config, forkJoin, Observable, Subject } from 'rxjs';
import { Result, WebAssemblyService } from '../../web-assembly.service';

interface TestResult {
  pass: boolean;
  result: Result<number>;
  isFirstFailed: boolean;
}

@Component({
  selector: 'slides-wasm-test-runner',
  templateUrl: './wasm-test-runner.component.html',
  styleUrls: ['./wasm-test-runner.component.css']
})
export class WasmTestRunnerComponent {
  readonly result$ = new Subject<Result<TestResult[]>>();
  @Input() config: any;


  constructor(private readonly webAssemblyService: WebAssemblyService) {
  }


  runTests() {
    const {tests, code, name} = this.config as any;
    let hasFailures = false;
    const sources = (tests as any[]).map(test => {
      return new Observable<TestResult>((subscriber) => {
        return this.webAssemblyService.run(code.wat, code.js, {args: test.args, imports: test.imports, name}).subscribe(result => {
          const pass = result.type === 'result' && result.value === test.output;
          let isFirstFailed = false;

          if (!pass && !hasFailures) {

            hasFailures = true;
            isFirstFailed = true;
          }

          subscriber.next({
            isFirstFailed,
            pass: pass,
            result,
            ...test
          });
          subscriber.complete();
        });
      });
    });

    forkJoin(sources).subscribe(results => {
      const error = results.find(({result}) => result.type === 'error');
      if (error) {
        this.result$.next(error.result as any);
        return;
      }

      this.result$.next({type: 'result', value: results});
    });

  }

  ngOnChanges() {
    this.runTests();
  }


}
