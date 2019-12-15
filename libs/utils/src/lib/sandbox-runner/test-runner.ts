import { ScriptLoaderService } from '@codelab/code-demos/src/lib/shared/script-loader.service';
import { Runner } from '@codelab/utils/src/lib/sandbox-runner/runners/runner';
import { scan } from 'rxjs/operators';
import { testReducer } from '@codelab/utils/src/lib/sandbox-runner/common';
import { Observable } from 'rxjs';
import { TestRunResult } from '@codelab/utils/src/lib/test-results/common';
import { wrapSystemJs } from '@codelab/code-demos/src/lib/shared/sandbox';

const mochaRun = `
function flattenTests(suite) {
  const result = [];

  function extractSuite(suite) {
    suite.suites.forEach(function(suite) {
      extractSuite(suite);
    });
    suite.tests.forEach(function(test) {
      result.push(test.title);
    });
  }

  extractSuite(suite);
  return result;
}

const result = mocha.run();

postMessage({type: 'reset', data: flattenTests(mocha.suite)});

result.on('end', () => { postMessage({type: 'complete'}); });
result.on('pass', (t, e) => { postMessage({type: 'result', data: {pass: true, name: t.title}}); });
result.on('fail', (t, e) => { postMessage({type: 'result', data: {pass: false, name: t.title, error: e.message}}); });
`;

export class TestRunner {
  private readonly code = {
    mocha: this.scriptLoaderService.getScript('mocha'),
    chai: this.scriptLoaderService.getScript('chai'),
    SystemJS: this.scriptLoaderService.getScript('SystemJS'),
    polyfill: `const window = globalThis;`,
    mochaSetup: `mocha.setup('bdd').reporter(function(a) {});`,
    mochaRun: mochaRun,
    systemMochaRun: `
    System.register("runner", ["test"], () => {
      return {
        execute: () => {
            ${mochaRun}
        }
    };
});

System.import("runner");

`,
    defaultTests: `
    describe('tests', () => {
        it('no tests have been setup', () => {
          chai.expect(true).to.be.ok;
        });
      });`
  };

  readonly result$: Observable<TestRunResult> = this.runner.result$.pipe(
    scan(testReducer, { tests: [] })
  );

  constructor(
    private readonly scriptLoaderService: ScriptLoaderService,
    private readonly runner: Runner
  ) {}

  run(code, tests = this.code.defaultTests, system = true) {
    this.runner.run(
      [
        this.code.polyfill,
        this.code.chai,
        this.code.mocha,
        this.code.mochaSetup,
        system ? wrapSystemJs(this.code.SystemJS) : '',
        code,
        tests,
        system ? this.code.systemMochaRun : this.code.mochaRun
      ].join('\n')
    );
  }
}
