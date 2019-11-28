import { Injectable } from '@angular/core';
import { WebworkerRunner } from '@codelab/utils/src/lib/sandbox-runner/runners/webworker';
import { ScriptLoaderService } from '@codelab/code-demos/src/lib/shared/script-loader.service';
import { TestRunner } from '@codelab/utils/src/lib/sandbox-runner/test-runner';
import { Observable } from 'rxjs';
import { TestRunResult } from '@codelab/utils/src/lib/test-results/common';

@Injectable({
  providedIn: 'root'
})
export class TestRunnerService {
  readonly testRunner = new TestRunner(
    this.scriptLoaderService,
    new WebworkerRunner()
  );
  readonly result$: Observable<TestRunResult> = this.testRunner.result$;

  constructor(private scriptLoaderService: ScriptLoaderService) {}

  run(code: string, tests?: string) {
    this.testRunner.run(code, tests);
  }
}
