import { Component, Input } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { Result, WebAssemblyService } from '../../web-assembly.service';
import {
  extractFunctionWithDependencies,
  extractGlobals,
  extractTableCode,
  extractTypeCode,
  generateWatTestCode,
  hasMemoryCalls,
  hasTableCalls,
  hasTypeCalls
} from '../../../utils';

declare const require;

interface TestResult {
  pass: boolean;
  result: Result<number>;
  isFirstFailed: boolean;
}

interface TestConfig {
  name: string;
  tests: any[];
}

interface WebAssemblyTestConfig extends TestConfig {
  highlights: string[];
  mode: string;
  globals: string[];
  code: {
    wat: string;
    js: string;
  };
}

function verifyGlobalsInTests(tests, globals) {
  if (globals.length) {
    tests.forEach(test => {
      if (!test.imports) {
        throw new Error('No imports present in the test. Function being tested expect the following: ' + globals.join(','));
      }
      if (!test.imports.config) {
        throw new Error('config property is missing on imports');
      }
      for (let g of globals) {
        if (!(g in test.imports.config)) {
          throw new Error('input is not present: ' + g);
        }
      }
    });
  }
}

export function webAssemblyTestHandler(config: TestConfig, code: string): WebAssemblyTestConfig {
  const funcCode = extractFunctionWithDependencies(config.name, code, [config.name]);
  const globals = extractGlobals(funcCode);
  const hasMemory = hasMemoryCalls(funcCode);
  const table = hasTableCalls(funcCode) ? extractTableCode(code) : '';
  const types = hasTypeCalls(funcCode) ? extractTypeCode(code) : '';

  verifyGlobalsInTests(config.tests, globals);
  const wat = generateWatTestCode({globals, code: funcCode, name: config.name, hasMemory, table, types});

  return {
    code: {
      wat,
      js: require('!!raw-loader!./runner.js'),
    },
    globals,
    ...config,
    mode: 'test',
    highlights: funcCode
  };
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
        return this.webAssemblyService.run(code.wat, code.js, {
          args: test.args,
          imports: test.imports,
          memory: test.memory,
          name
        }).subscribe(result => {
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
