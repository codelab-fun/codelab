import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { Result, WebAssemblyService } from '../web-assembly.service';
import { extractFunction, wasmAddContent } from '../../utils';

declare const require;

interface TestResult {
  pass: boolean;
  result: Result<number>;
  isFirstFailed: boolean;

}

@Component({
  selector: 'slides-get-item-runner',
  templateUrl: './get-item-runner.component.html',
  styleUrls: ['./get-item-runner.component.css']
})
export class GetItemRunnerComponent implements OnChanges {
  jsCode: string;
  webAssemblyCode: string;
  readonly result$ = new Subject<Result<TestResult[]>>();
  @Output() wasmSelectionHighlight = new EventEmitter();

  tests = [
    {
      inputs: {
        x: 0,
        y: 0,
        rowSize: 10,
      },
      output: 0
    },
    {
      inputs: {
        x: 1,
        y: 0,
        rowSize: 10,
      },
      output: 4
    },
    {
      inputs: {
        x: 0,
        y: 1,
        rowSize: 10,
      },
      output: 40
    }
  ];

  constructor(private readonly webAssemblyService: WebAssemblyService) {
  }

  @Input('webAssemblyCode') set _webAssemblyCode(code: string) {
    const functionCode = extractFunction('getindex', code);
    this.webAssemblyCode = wasmAddContent(
      functionCode,
      require('!!raw-loader!../../samples/get-index/get-index.wat'));
    requestAnimationFrame(() => this.wasmSelectionHighlight.emit(functionCode));
  }

  @Input('jsCode') set _jsCode(code: string) {
    this.jsCode = require('!!raw-loader!../../samples/get-index/get-index.js');
  }

  runTests() {
    let hasFailures = false;
    const sources = this.tests.map(test => {
      return new Observable<TestResult>((subscriber) => {
        return this.webAssemblyService.run(this.webAssemblyCode, this.jsCode, test.inputs).subscribe(result => {
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

  ngOnChanges(changes) {
    this.runTests();
  }

}
